import { supabase } from './supabase';

const BUCKET_NAME = 'images';

export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const timestamp = Date.now();
    const path = `${timestamp}-${file.name}`;
    const url = await uploadImage(file, path);
    urls.push(url);
  }

  return urls;
}

export function getImageUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
}
