export async function uploadImage(file: File, userId: string): Promise<string | null> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }

    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Remove the data:image/jpeg;base64, prefix
    const base64Data = base64.split(',')[1];

    if (!base64Data) {
      throw new Error('Failed to convert file to base64');
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/upload-profile-picture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Data,
        filename: file.name,
        mimetype: file.type
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.image_url) {
      throw new Error('No image URL returned from server');
    }

    return data.image_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw to allow proper error handling in the calling component
  }
}
