-- =====================================================
-- Supabase Storage Setup for Profile Images
-- =====================================================
-- Run this SQL in your Supabase SQL Editor

-- 1. Create a storage bucket for profile images
-- Note: You can also create this bucket via the Supabase Dashboard UI
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images', 
  'profile-images', 
  true, 
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 2. Create storage policies for the profile-images bucket

-- Policy: Allow authenticated users to upload their own profile images
CREATE POLICY "Users can upload their own profile images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'profile-images' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'avatars'
);

-- Policy: Allow authenticated users to update their own profile images
CREATE POLICY "Users can update their own profile images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'profile-images' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'avatars'
);

-- Policy: Allow public access to view profile images
CREATE POLICY "Profile images are publicly accessible" ON storage.objects
FOR SELECT USING (
  bucket_id = 'profile-images'
);

-- Policy: Allow users to delete their own profile images
CREATE POLICY "Users can delete their own profile images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'profile-images' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'avatars'
);

-- =====================================================
-- Alternative: Create bucket via Dashboard and run only policies
-- =====================================================
-- If you prefer to create the bucket via Supabase Dashboard:
-- 1. Go to Storage section in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name: "profile-images"
-- 4. Public bucket: Yes
-- 5. File size limit: 5242880 (5MB)
-- 6. Allowed MIME types: image/jpeg, image/png, image/gif, image/webp
-- 7. Then run only the policies below

-- =====================================================
-- Additional: Create a function to clean up old profile images
-- =====================================================
CREATE OR REPLACE FUNCTION cleanup_old_profile_images()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  old_files RECORD;
BEGIN
  -- Delete files older than 30 days that aren't referenced in site_settings
  FOR old_files IN 
    SELECT * FROM storage.objects 
    WHERE bucket_id = 'profile-images' 
    AND created_at < NOW() - INTERVAL '30 days'
    AND name NOT IN (
      SELECT REPLACE(photo_url, 'https://gpbfseyettkkjuntmzrq.supabase.co/storage/v1/object/public/profile-images/', '')
      FROM site_settings 
      WHERE photo_url IS NOT NULL 
      AND photo_url LIKE '%profile-images%'
    )
  LOOP
    PERFORM storage.remove_object(old_files.bucket_id, old_files.name);
  END LOOP;
END;
$$;

-- =====================================================
-- Create a trigger to automatically clean up old images
-- =====================================================
-- This trigger runs when site_settings.photo_url is updated
CREATE OR REPLACE FUNCTION cleanup_profile_image_on_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  old_url TEXT;
BEGIN
  -- Get the old photo URL
  old_url := OLD.photo_url;
  
  -- If there's an old URL and it's different from the new one
  IF old_url IS NOT NULL AND old_url != NEW.photo_url THEN
    -- Extract the file path from the URL
    IF old_url LIKE '%profile-images%' THEN
      DECLARE
        file_path TEXT;
      BEGIN
        file_path := REPLACE(old_url, 'https://gpbfseyettkkjuntmzrq.supabase.co/storage/v1/object/public/profile-images/', '');
        PERFORM storage.remove_object('profile-images', file_path);
      EXCEPTION WHEN OTHERS THEN
        -- Ignore errors if file doesn't exist
        NULL;
      END;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS cleanup_profile_image_trigger ON site_settings;
CREATE TRIGGER cleanup_profile_image_trigger
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_profile_image_on_update();

-- =====================================================
-- Create a helper function to get public URL
-- =====================================================
CREATE OR REPLACE FUNCTION get_profile_image_url(file_path TEXT)
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 'https://gpbfseyettkkjuntmzrq.supabase.co/storage/v1/object/public/profile-images/' || file_path;
$$;

-- =====================================================
-- Grant necessary permissions
-- =====================================================
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;

-- =====================================================
-- Verify setup
-- =====================================================
-- You can verify the setup by running:
SELECT * FROM storage.buckets WHERE id = 'profile-images';
SELECT * FROM storage.policies WHERE bucket_id = 'profile-images';
