export async function uploadImage(file: File, _userId: string): Promise<string | null> {
  // Temporary: convert to data URL for preview/storage placeholder.
  // Replace with your own upload API (e.g., S3/Cloudinary) later.
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}
