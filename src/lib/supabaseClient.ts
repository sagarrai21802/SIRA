// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Environment variables must start with VITE_ to be exposed in Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "❌ Supabase credentials are missing! Please set VITE_APP_SUPABASE_URL and VITE_APP_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
