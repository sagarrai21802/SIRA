-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
-- CREATE TABLE IF NOT EXISTS profiles (
--   id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
--   email TEXT UNIQUE NOT NULL,
--   full_name TEXT,
--   avatar_url TEXT,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- New profiles table with website_url and optional_details
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  website_url TEXT,
  optional_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- Create RLS policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create content_generations table
CREATE TABLE IF NOT EXISTS content_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  generated_content TEXT,
  content_type TEXT NOT NULL, -- 'text', 'image', 'seo'
  tone Text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for content_generations
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own content generations" ON content_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content generations" ON content_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content generations" ON content_generations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content generations" ON content_generations
  FOR DELETE USING (auth.uid() = user_id);

-- Create scheduled_posts table
CREATE TABLE IF NOT EXISTS scheduled_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  caption TEXT,
  image_url TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- e.g., 'draft', 'scheduled', 'published', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for scheduled_posts
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scheduled posts" ON scheduled_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scheduled posts" ON scheduled_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scheduled posts" ON scheduled_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scheduled posts" ON scheduled_posts
  FOR DELETE USING (auth.uid() = user_id);


-- Function to handle new user signup
-- CREATE OR REPLACE FUNCTION handle_new_user()
-- RETURNS TRIGGER AS $
-- BEGIN
--   INSERT INTO profiles (id, email, full_name)
--   VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
--   RETURN NEW;
-- END;
-- $ LANGUAGE plpgsql SECURITY DEFINER;

-- New handle_new_user function with website_url and optional_details
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $
BEGIN
  INSERT INTO profiles (id, email, full_name, phone_number, website_url, optional_details)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'phone_number', NEW.raw_user_meta_data->>'website_url', NEW.raw_user_meta_data->>'optional_details');
  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;


-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();