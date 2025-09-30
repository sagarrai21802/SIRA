// import { getMongoDb } from './realm';

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
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
  const apiBase = 'http://localhost:4000';
  await fetch(`${apiBase}/api/users/upsert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: userId, email })
  });
};

// Profile functions
export const getProfile = async (userId: string): Promise<Profile | null> => {
  const apiBase =  'http://localhost:4000';
  const res = await fetch(`${apiBase}/api/profiles/${encodeURIComponent(userId)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.profile as Profile;
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const apiBase =  'http://localhost:4000';
  const res = await fetch(`${apiBase}/api/profiles/upsert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: userId, ...updates })
  });
  if (!res.ok) throw new Error(await res.text());
  return await getProfile(userId);
};

// Content generation functions
export const saveContentGeneration = async (
  userId: string,
  prompt: string,
  generatedContent: string,
  contentType: 'text' | 'image' | 'seo',
   tone?: string // ✅ optional tone argument
): Promise<ContentGeneration> => {
  const apiBase = 'http://localhost:4000';
  const doc: any = {
    id: crypto.randomUUID(),
    user_id: userId,
    prompt,
    generated_content: generatedContent,
    content_type: contentType,
    created_at: new Date().toISOString(),
  };
  if (tone) doc.tone = tone;
  await fetch(`${apiBase}/api/content-generations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc)
  });
  return doc as ContentGeneration;
};

export const getUserContentGenerations = async (
  userId: string,
  contentType?: 'text' | 'image' | 'seo'
): Promise<ContentGeneration[]> => {
  const apiBase = 'http://localhost:4000';
  const params = new URLSearchParams({ user_id: userId });
  if (contentType) params.set('content_type', contentType);
  const res = await fetch(`${apiBase}/api/content-generations?${params.toString()}`);
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.items as ContentGeneration[];
};

export const deleteContentGeneration = async (id: string): Promise<void> => {
  const apiBase = 'http://localhost:4000';
  await fetch(`${apiBase}/api/content-generations/${encodeURIComponent(id)}`, { method: 'DELETE' });
};
