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
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      
      // Return default settings if no data exists
      if (!data) {
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
      
      return data as SiteSettings;
    }
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      console.log('Starting update with settings:', settings);
      
      try {
        // Use upsert to handle both insert and update in one operation
        // Remove the id field if it exists to let the database handle it
        const { id, ...settingsToUpsert } = settings;
        
        console.log('Attempting upsert with data:', settingsToUpsert);
        
        const { data, error } = await supabase
          .from('site_settings')
          .upsert(settingsToUpsert, {
            onConflict: 'id',
            ignoreDuplicates: false
          })
          .select()
          .single();
        
        console.log('Upsert result:', { data, error });
        
        if (error) {
          console.error('Error in upsert:', error);
          throw error;
        }
        
        return data;
      } catch (err) {
        console.error('Complete error details:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
    }
  });
}
