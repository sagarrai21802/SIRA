-- Enhanced profiles table with personalization fields
-- Run this to add new columns to your existing profiles table

-- Add new columns to the existing profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS business_type TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS company_size TEXT,
ADD COLUMN IF NOT EXISTS target_audience TEXT,
ADD COLUMN IF NOT EXISTS brand_voice TEXT DEFAULT 'professional',
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS goals TEXT,
ADD COLUMN IF NOT EXISTS is_profile_complete BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS profile_completed_at TIMESTAMP WITH TIME ZONE;

-- Create an index for performance
CREATE INDEX IF NOT EXISTS idx_profiles_complete ON public.profiles(is_profile_complete);

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (
    id, 
    email, 
    full_name, 
    phone_number, 
    website_url, 
    optional_details,
    is_profile_complete
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'phone_number', 
    NEW.raw_user_meta_data->>'website_url', 
    NEW.raw_user_meta_data->>'optional_details',
    FALSE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to mark profile as complete
CREATE OR REPLACE FUNCTION complete_profile(
  user_id UUID,
  p_industry TEXT DEFAULT NULL,
  p_business_type TEXT DEFAULT NULL,
  p_location TEXT DEFAULT NULL,
  p_company_size TEXT DEFAULT NULL,
  p_target_audience TEXT DEFAULT NULL,
  p_brand_voice TEXT DEFAULT 'professional',
  p_company_name TEXT DEFAULT NULL,
  p_goals TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET 
    industry = COALESCE(p_industry, industry),
    business_type = COALESCE(p_business_type, business_type),
    location = COALESCE(p_location, location),
    company_size = COALESCE(p_company_size, company_size),
    target_audience = COALESCE(p_target_audience, target_audience),
    brand_voice = COALESCE(p_brand_voice, brand_voice),
    company_name = COALESCE(p_company_name, company_name),
    goals = COALESCE(p_goals, goals),
    is_profile_complete = TRUE,
    profile_completed_at = NOW(),
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION complete_profile TO authenticated;