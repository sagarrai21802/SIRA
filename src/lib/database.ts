import { supabase } from './supabase';

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

// Profile functions
export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  return data;
};

// Content generation functions
export const saveContentGeneration = async (
  userId: string,
  prompt: string,
  generatedContent: string,
  contentType: 'text' | 'image' | 'seo',
   tone?: string // ✅ optional tone argument
): Promise<ContentGeneration> => {
  const { data, error } = await supabase
    .from('content_generations')
    .insert({
      user_id: userId,
      prompt,
      generated_content: generatedContent,

      content_type: contentType,
      ...(tone ? { tone } : {}) 
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving content generation:', error);
    throw error;
  }

  return data;
};

export const getUserContentGenerations = async (
  userId: string,
  contentType?: 'text' | 'image' | 'seo'
): Promise<ContentGeneration[]> => {
  let query = supabase
    .from('content_generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (contentType) {
    query = query.eq('content_type', contentType);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching content generations:', error);
    return [];
  }

  return data || [];
};

export const deleteContentGeneration = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('content_generations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting content generation:', error);
    throw error;
  }
};
