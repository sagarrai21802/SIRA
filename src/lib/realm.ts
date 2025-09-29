import * as Realm from 'realm-web';

let cachedApp: Realm.App | null = null;

export function getRealmApp() {
  if (cachedApp) return cachedApp;
  const appId = import.meta.env.VITE_REALM_APP_ID as string;
  if (!appId) {
    throw new Error('Missing VITE_REALM_APP_ID');
  }
  cachedApp = new Realm.App({ id: appId });
  return cachedApp;
}

export async function getMongoDb(databaseName: string) {
  const app = getRealmApp();
  const user = app.currentUser ?? (await app.logIn(Realm.Credentials.anonymous()));
  const mongodb = user.mongoClient('mongodb-atlas');
  return mongodb.db(databaseName);
}


