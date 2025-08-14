import { supabase } from "../lib/supabaseClient";

export async function uploadImage(file: File, userId: string): Promise<string | null> {
  const fileName = `${userId}-${Date.now()}.${file.name.split(".").pop()}`;

  const { data, error } = await supabase.storage
    .from("avatars") // Storage bucket name
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Image upload error:", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
