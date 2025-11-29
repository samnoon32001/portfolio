-- =====================================================
-- Supabase Storage Setup for Profile Images
-- =====================================================
-- Run this SQL in your Supabase SQL Editor

-- IMPORTANT: If you get errors, use the Manual Setup method below

-- Step 1: Create bucket via Supabase Dashboard (RECOMMENDED)
-- =====================================================
-- 1. Go to Storage section in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name: "profile-images"
-- 4. Public bucket: Yes
-- 5. File size limit: 5242880 (5MB)
-- 6. Allowed MIME types: image/jpeg, image/png, image/gif, image/webp

-- Step 2: After creating bucket, run these policies in SQL Editor
-- =====================================================

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
-- Additional Functions (Optional - Run after policies work)
-- =====================================================

-- Create a helper function to get public URL
CREATE OR REPLACE FUNCTION get_profile_image_url(file_path TEXT)
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 'https://gpbfseyettkkjuntmzrq.supabase.co/storage/v1/object/public/profile-images/' || file_path;
$$;

-- Grant necessary permissions
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;

-- =====================================================
-- Verification Commands (Run separately to check setup)
-- =====================================================

-- Check bucket exists (run this separately after creating bucket)
-- SELECT * FROM storage.buckets WHERE id = 'profile-images';

-- Check policies exist (run this separately)
-- SELECT * FROM storage.policies WHERE bucket_id = 'profile-images';

-- =====================================================
-- TROUBLESHOOTING
-- =====================================================

-- If you get "relation storage.buckets does not exist":
-- 1. First create the bucket via Supabase Dashboard (Storage > New bucket)
-- 2. Then run only the CREATE POLICY statements above

-- If you get "extension storage is not available":
-- 1. Supabase Storage is a separate service, not a PostgreSQL extension
-- 2. Use the Dashboard method to create the bucket first
-- 3. Then run the policies

-- =====================================================
-- QUICK SETUP SUMMARY
-- =====================================================

-- 1. Go to Supabase Dashboard > Storage > New bucket
-- 2. Create bucket named "profile-images" (public, 5MB)
-- 3. Run the 4 CREATE POLICY statements above in SQL Editor
-- 4. Test the upload feature in your admin dashboard
