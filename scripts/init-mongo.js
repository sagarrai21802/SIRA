// Creates required MongoDB collections and indexes for the SIRA app
// Optionally backfills a users collection from Realm Admin API if credentials are provided

/* eslint-disable no-console */

import { MongoClient, ServerApiVersion } from 'mongodb';

const mongoUri = process.env.VITE_MONGODB_URI || process.env.MONGODB_URI;
const dbName = process.env.VITE_MONGODB_DB_NAME || process.env.MONGODB_DB_NAME || 'sira';

if (!mongoUri) {
  console.error('Missing VITE_MONGODB_URI or MONGODB_URI');
  process.exit(1);
}

const REQUIRED_COLLECTIONS = [
  'profiles',
  'content_generations',
  'image_generations',
  'templates',
  'template_generations',
  'projects',
  'scheduled_posts',
  'feedback',
  'users'
];

/**
 * Define indexes per collection
 */
const INDEXES = {
  profiles: [
    { key: { id: 1 }, unique: true },
    { key: { email: 1 }, unique: false },
    { key: { is_profile_complete: 1 }, unique: false }
  ],
  content_generations: [
    { key: { user_id: 1, created_at: -1 }, unique: false },
    { key: { content_type: 1 }, unique: false }
  ],
  image_generations: [
    { key: { user_id: 1, created_at: -1 }, unique: false }
  ],
  templates: [
    { key: { user_id: 1 }, unique: false }
  ],
  template_generations: [
    { key: { user_id: 1, created_at: -1 }, unique: false }
  ],
  projects: [
    { key: { user_id: 1 }, unique: false }
  ],
  scheduled_posts: [
    { key: { user_id: 1, scheduled_at: -1 }, unique: false },
    { key: { id: 1 }, unique: true }
  ],
  feedback: [
    { key: { created_at: -1 }, unique: false }
  ],
  users: [
    { key: { id: 1 }, unique: true },
    { key: { email: 1 }, unique: false }
  ]
};

async function ensureCollections(db) {
  const existing = new Set((await db.listCollections().toArray()).map(c => c.name));
  for (const name of REQUIRED_COLLECTIONS) {
    if (!existing.has(name)) {
      await db.createCollection(name);
      console.log(`Created collection ${name}`);
    } else {
      console.log(`Collection ${name} exists`);
    }
    const indexes = INDEXES[name] || [];
    for (const spec of indexes) {
      try {
        await db.collection(name).createIndex(spec.key, { unique: spec.unique });
      } catch (e) {
        // ignore index exists errors
        if (!String(e?.message || '').includes('already exists')) {
          throw e;
        }
      }
    }
  }
}

async function backfillUsers(db) {
  const appId = process.env.VITE_REALM_APP_ID || process.env.REALM_APP_ID;
  const publicKey = process.env.REALM_PUBLIC_KEY;
  const privateKey = process.env.REALM_PRIVATE_KEY;
  const groupId = process.env.REALM_GROUP_ID; // Project/Group ID in Atlas App Services (optional)

  if (!appId || !publicKey || !privateKey) {
    console.log('Realm Admin credentials not provided; skipping users backfill.');
    return;
  }

  // 1) Get Admin API access token
  const loginResp = await fetch('https://services.cloud.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: publicKey, apiKey: privateKey })
  });
  if (!loginResp.ok) {
    const text = await loginResp.text();
    throw new Error(`Admin API login failed: ${loginResp.status} ${text}`);
  }
  const { access_token } = await loginResp.json();

  // Helper: find correct group id if provided one is wrong by discovering groups/apps
  async function resolveGroupIdForApp() {
    // If a groupId is provided, check if the app exists there; otherwise search all groups
    const tryGroups = [];
    if (groupId) tryGroups.push(groupId);

    // Fetch all groups accessible by this API key
    const groupsResp = await fetch('https://services.cloud.mongodb.com/api/admin/v3.0/groups', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    if (groupsResp.ok) {
      const groups = await groupsResp.json();
      for (const g of groups) {
        if (!tryGroups.includes(g.id)) tryGroups.push(g.id);
      }
    }

    for (const gid of tryGroups) {
      const appsResp = await fetch(`https://services.cloud.mongodb.com/api/admin/v3.0/groups/${gid}/apps`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      if (!appsResp.ok) continue;
      const apps = await appsResp.json();
      const match = apps.find(a => a.client_app_id === appId || a._id === appId || a.name === appId);
      if (match) return gid;
    }
    return null;
  }

  let effectiveGroupId = groupId;
  // Validate that app exists in provided group; otherwise discover
  async function listUsersFor(group) {
    return await fetch(`https://services.cloud.mongodb.com/api/admin/v3.0/groups/${group}/apps/${appId}/users`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
  }

  let usersResp = effectiveGroupId ? await listUsersFor(effectiveGroupId) : null;
  if (!usersResp || usersResp.status === 404) {
    console.log('Provided REALM_GROUP_ID did not locate the app; attempting discovery...');
    const discovered = await resolveGroupIdForApp();
    if (!discovered) {
      throw new Error('Could not find app in any accessible Atlas project. Check App ID and API key permissions.');
    }
    effectiveGroupId = discovered;
    usersResp = await listUsersFor(effectiveGroupId);
  }

  if (!usersResp.ok) {
    const text = await usersResp.text();
    throw new Error(`List users failed: ${usersResp.status} ${text}`);
  }
  const users = await usersResp.json();

  const usersCol = db.collection('users');
  let inserted = 0;
  for (const u of users) {
    // Realm returns user._id as string; identities may include email
    const id = u._id;
    const email = u.data?.email || u.identities?.find(i => i.provider_type === 'email/password')?.id || null;
    const createdAt = u.created_at ? new Date(u.created_at).toISOString() : new Date().toISOString();
    await usersCol.updateOne(
      { id },
      { $setOnInsert: { id, email, type: u.type || 'user', created_at: createdAt } },
      { upsert: true }
    );
    inserted += 1;
  }
  console.log(`Backfilled ${inserted} users into users collection`);
}

async function main() {
  const client = new MongoClient(mongoUri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
  });
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log(`Connected to ${dbName}`);
    await ensureCollections(db);
    await backfillUsers(db);
    console.log('Initialization complete.');
  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


