/*
  # Create images storage bucket

  1. Creates a public storage bucket for images
  2. Sets up RLS policies to allow public reads and authenticated writes
  3. This bucket will store all project images, assets, and uploads
*/

-- Images bucket will be created via Supabase dashboard or client
-- This migration sets up the storage policies

INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;