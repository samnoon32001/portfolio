import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  id: string;
  name: string;
  tagline: string | null;
  bio: string | null;
  photo_url: string | null;
  location: string | null;
  email: string | null;
  degree: string | null;
  education: string | null;
  years_experience: number | null;
  projects_completed: number | null;
  satisfied_clients: number | null;
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      console.log('=== STARTING SITE_SETTINGS FETCH DEBUG ===');
      
      // Check authentication state
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      console.log('Fetch - Session:', session);
      console.log('Fetch - Auth Error:', authError);
      
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      console.log('Fetch result:', { data, error });
      
      if (error) {
        console.error('❌ Fetch error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      // Return default settings if no data exists
      if (!data) {
        console.log('⚠️ No existing data found, returning defaults');
        return {
          id: '',
          name: 'Your Name',
          tagline: 'Web Developer & Designer',
          bio: 'I\'m a passionate web developer with expertise in creating modern, responsive websites and applications.',
          photo_url: '',
          location: 'Your Location',
          email: 'hello@example.com',
          degree: 'CS Degree',
          education: 'Education',
          years_experience: 5,
          projects_completed: 50,
          satisfied_clients: 30
        } as SiteSettings;
      }
      
      console.log('✅ Fetch completed successfully');
      console.log('=== END FETCH DEBUG ===');
      return data as SiteSettings;
    }
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      console.log('=== STARTING SITE_SETTINGS UPDATE DEBUG ===');
      console.log('1. Settings to update:', settings);
      
      // Step 1: Check authentication state
      console.log('2. Checking authentication state...');
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      console.log('Session:', session);
      console.log('User ID:', session?.user?.id);
      console.log('Auth Error:', authError);
      
      if (authError || !session?.user) {
        console.error('❌ Authentication issue detected');
        throw new Error('User not authenticated');
      }
      
      // Step 2: Check admin role
      console.log('3. Checking admin role...');
      const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });
      console.log('Is Admin:', isAdmin);
      console.log('Role Error:', roleError);
      
      if (roleError || !isAdmin) {
        console.error('❌ Admin role issue detected');
        throw new Error('User does not have admin role');
      }
      
      // Step 3: Test basic read access first
      console.log('4. Testing basic read access...');
      const { data: testData, error: testError } = await supabase
        .from('site_settings')
        .select('id, name')
        .limit(1);
      console.log('Read test result:', { testData, testError });
      
      if (testError) {
        console.error('❌ Read access issue detected');
        throw new Error(`Read access failed: ${testError.message}`);
      }
      
      // Step 4: Check existing record
      console.log('5. Checking for existing record...');
      const { data: existing, error: fetchError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      console.log('Existing record check:', { existing, fetchError });
      
      if (fetchError) {
        console.error('❌ Fetch existing record failed:', fetchError);
        throw fetchError;
      }
      
      let result;
      if (existing) {
        // Step 5a: Update existing record with detailed logging
        console.log('6a. Attempting to update existing record with ID:', existing.id);
        console.log('6a. Update payload:', settings);
        
        const updateQuery = supabase
          .from('site_settings')
          .update(settings)
          .eq('id', existing.id)
          .select();
        
        console.log('6a. Update query details:', updateQuery);
        
        const { data, error } = await updateQuery;
        
        console.log('6a. Update result:', { data, error });
        
        if (error) {
          console.error('❌ Update failed with error:', error);
          console.error('❌ Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        result = data;
      } else {
        // Step 5b: Insert new record with detailed logging
        console.log('6b. Attempting to insert new record...');
        const { id, ...settingsToInsert } = settings;
        console.log('6b. Insert payload:', settingsToInsert);
        
        const insertQuery = supabase
          .from('site_settings')
          .insert(settingsToInsert)
          .select();
        
        console.log('6b. Insert query details:', insertQuery);
        
        const { data, error } = await insertQuery;
        
        console.log('6b. Insert result:', { data, error });
        
        if (error) {
          console.error('❌ Insert failed with error:', error);
          console.error('❌ Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        result = data;
      }
      
      console.log('✅ Operation completed successfully');
      console.log('Final result:', result);
      console.log('=== END DEBUG ===');
      
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
    }
  });
}
