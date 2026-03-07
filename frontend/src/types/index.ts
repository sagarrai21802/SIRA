export interface User {
  id: string;
  email: string;
  full_name?: string;
  plan: 'free' | 'standard' | 'premium';
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ContentGeneration {
  id: string;
  user_id: string;
  project_id?: string;
  content_type: string;
  prompt: string;
  generated_content: string;
  tone: string;
  created_at: string;
}

export interface ImageGeneration {
  id: string;
  user_id: string;
  project_id?: string;
  prompt: string;
  image_url: string;
  created_at: string;
}

export interface BrandSettings {
  id: string;
  user_id: string;
  brand_name?: string;
  brand_tone: string;
  primary_color?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}