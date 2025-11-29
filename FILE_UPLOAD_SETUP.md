# Profile Picture File Upload Setup

This guide explains how to set up and use the new profile picture file upload feature in your admin dashboard.

## 🚀 Features Added

### 1. **Drag & Drop File Upload**
- Drag and drop images directly onto the upload area
- Click to browse files
- Visual feedback during upload
- File size validation (5MB max)
- File type validation (images only)

### 2. **Supabase Storage Integration**
- Automatic upload to Supabase Storage
- Public URL generation
- Automatic cleanup of old images
- Proper storage policies for security

### 3. **Fallback URL Input**
- Still supports direct URL input
- Mix and match upload and URL methods

## 📋 Setup Instructions

### Step 1: Run SQL Setup

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `gpbfseyettkkjuntmzrq`
3. Go to **SQL Editor**
4. Copy and paste the contents of `supabase-storage-setup.sql`
5. Click **Run**

**OR** create bucket manually:
1. Go to **Storage** section
2. Click **New bucket**
3. Name: `profile-images`
4. Public bucket: ✅ Yes
5. File size limit: `5242880` (5MB)
6. Allowed MIME types: `image/jpeg, image/png, image/gif, image/webp`

### Step 2: Verify Setup

After running the SQL, verify with these queries:

```sql
-- Check bucket exists
SELECT * FROM storage.buckets WHERE id = 'profile-images';

-- Check policies exist
SELECT * FROM storage.policies WHERE bucket_id = 'profile-images';
```

## 🎯 How to Use

### In Admin Dashboard:

1. **Go to Admin Panel**: `your-site.com/admin`
2. **Find Profile Picture Section**
3. **Upload Methods**:
   - **Drag & Drop**: Drag image file onto the upload area
   - **Click Browse**: Click "Browse Files" button
   - **URL Input**: Enter direct image URL in the text field

### Supported Features:
- ✅ **File Types**: PNG, JPG, GIF, WebP
- ✅ **Max Size**: 5MB
- ✅ **Preview**: Shows uploaded image
- ✅ **Delete**: Remove uploaded images
- ✅ **Fallback**: URL input still works

## 🔧 Technical Details

### File Upload Component Location:
```
src/components/ui/SupabaseFileUpload.tsx
```

### Storage Configuration:
- **Bucket**: `profile-images`
- **Folder**: `avatars`
- **Public Access**: Yes
- **Max File Size**: 5MB
- **Auto Cleanup**: Yes (removes old images)

### Security Policies:
- ✅ Authenticated users can upload
- ✅ Public read access
- ✅ Users can delete their own images
- ✅ Folder restrictions enforced

## 🛠️ Customization Options

### Change File Size Limit:
```tsx
// In Admin.tsx
<SupabaseFileUpload
  maxSize={10} // Change to 10MB
  // ... other props
/>
```

### Change Bucket/Folder:
```tsx
// In Admin.tsx
<SupabaseFileUpload
  bucket="custom-bucket"
  folder="custom-folder"
  // ... other props
/>
```

### Change Accepted File Types:
```tsx
// In Admin.tsx
<SupabaseFileUpload
  accept="image/png,image/jpeg"
  // ... other props
/>
```

## 🔍 Troubleshooting

### Upload Fails:
1. Check Supabase Storage policies are applied
2. Verify bucket exists and is public
3. Check file size (max 5MB)
4. Ensure file is an image type

### Permission Errors:
1. Run the SQL setup script
2. Check storage policies in Supabase Dashboard
3. Ensure user is authenticated

### Images Not Showing:
1. Check bucket is public
2. Verify CORS settings (if needed)
3. Check image URLs in browser console

### Cleanup Issues:
1. Verify trigger functions exist
2. Check RLS policies
3. Manual cleanup: Run `cleanup_old_profile_images()` function

## 📝 SQL Commands for Maintenance

### Manual Cleanup:
```sql
-- Clean up old profile images
SELECT cleanup_old_profile_images();
```

### Check Storage Usage:
```sql
-- Check bucket size and file count
SELECT 
  bucket_id,
  COUNT(*) as file_count,
  SUM(size) as total_size
FROM storage.objects 
WHERE bucket_id = 'profile-images'
GROUP BY bucket_id;
```

### View All Files:
```sql
-- List all profile images
SELECT 
  name,
  size,
  created_at,
  updated_at
FROM storage.objects 
WHERE bucket_id = 'profile-images'
ORDER BY created_at DESC;
```

## 🔄 Migration from URL-only

If you have existing profile URLs, they'll continue to work. The new upload feature is additive - you can:
1. Keep using URLs
2. Switch to file upload
3. Mix both approaches

## 🎨 UI Features

### Upload States:
- **Empty**: Shows drag & drop area
- **Uploading**: Shows spinner and progress
- **Success**: Shows image preview
- **Error**: Shows error message

### Interactive Elements:
- **Hover Effects**: Preview shows delete button on hover
- **Drag Feedback**: Border highlight during drag
- **Loading States**: Spinner during upload
- **Toast Notifications**: Success/error messages

## 📱 Responsive Design

The upload component is fully responsive:
- **Desktop**: Full drag & drop area
- **Mobile**: Optimized touch interface
- **Tablet**: Adaptive layout

## 🔒 Security Considerations

1. **RLS Policies**: Only authenticated users can upload
2. **File Validation**: Type and size checking
3. **Path Restrictions**: Files stored in specific folders
4. **Auto Cleanup**: Removes orphaned files
5. **Public Access**: Read-only for public viewing

## 🚀 Production Deployment

Before deploying to production:

1. ✅ Run SQL setup in production Supabase
2. ✅ Test upload functionality
3. ✅ Verify storage policies
4. ✅ Check file size limits
5. ✅ Test cleanup functions

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify Supabase Storage setup
3. Test with different image files
4. Check network connectivity
5. Review storage policies in Supabase Dashboard
