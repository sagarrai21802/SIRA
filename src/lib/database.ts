import { getMongoDb } from './realm';

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ContentGeneration {
  id: string;
  user_id: string;
  prompt: string;
  generated_content?: string;
  content_type: 'text' | 'image' | 'seo';
  created_at: string;
}

// Users
export interface AppUserDoc {
  id: string;
  email: string | null;
  created_at: string;
}

export const upsertAppUser = async (userId: string, email: string | null) => {
  const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
  const db = await getMongoDb(dbName);
  await db.collection('users').updateOne(
    { id: userId },
    { $setOnInsert: { id: userId, email, created_at: new Date().toISOString() } },
    { upsert: true }
  );
};

// Profile functions
export const getProfile = async (userId: string): Promise<Profile | null> => {
  const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
  const db = await getMongoDb(dbName);
  const profile = await db.collection('profiles').findOne({ id: userId });
  return (profile as Profile) ?? null;
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
  const db = await getMongoDb(dbName);
  await db.collection('profiles').updateOne(
    { id: userId },
    { $set: { ...updates, updated_at: new Date().toISOString() } },
    { upsert: true }
  );
  const updated = await db.collection('profiles').findOne({ id: userId });
  return updated as Profile;
};

// Content generation functions
export const saveContentGeneration = async (
  userId: string,
  prompt: string,
  generatedContent: string,
  contentType: 'text' | 'image' | 'seo',
   tone?: string // ✅ optional tone argument
): Promise<ContentGeneration> => {
  const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
  const db = await getMongoDb(dbName);
  const doc: any = {
    id: crypto.randomUUID(),
    user_id: userId,
    prompt,
    generated_content: generatedContent,
    content_type: contentType,
    created_at: new Date().toISOString(),
  };
  if (tone) doc.tone = tone;
  await db.collection('content_generations').insertOne(doc);
  return doc as ContentGeneration;
};

export const getUserContentGenerations = async (
  userId: string,
  contentType?: 'text' | 'image' | 'seo'
): Promise<ContentGeneration[]> => {
  const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
  const db = await getMongoDb(dbName);
  const filter: any = { user_id: userId };
  if (contentType) filter.content_type = contentType;
  const items = await db
    .collection('content_generations')
    .find(filter, { sort: { created_at: -1 } });
  return items as ContentGeneration[];
};

export const deleteContentGeneration = async (id: string): Promise<void> => {
  const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
  const db = await getMongoDb(dbName);
  await db.collection('content_generations').deleteOne({ id });
};
