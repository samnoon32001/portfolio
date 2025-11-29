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
  // New contact and social fields
  phone: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  // Hero section customization
  hero_subtitle: string | null;
  hero_cta_primary_text: string | null;
  hero_cta_primary_url: string | null;
  hero_cta_secondary_text: string | null;
  hero_cta_secondary_url: string | null;
  // Footer customization
  footer_tagline: string | null;
  copyright_name: string | null;
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
          satisfied_clients: 30,
          // New contact and social fields
          phone: '+1 234 567 890',
          github_url: '#',
          linkedin_url: '#',
          twitter_url: '#',
          // Hero section customization
          hero_subtitle: 'I craft beautiful, responsive, and user-friendly web experiences using modern technologies. Let\'s build something amazing together.',
          hero_cta_primary_text: 'View My Work',
          hero_cta_primary_url: '#projects',
          hero_cta_secondary_text: 'Download CV',
          hero_cta_secondary_url: '#',
          // Footer customization
          footer_tagline: 'Building digital experiences that matter.',
          copyright_name: 'Your Name'
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
      console.log('🔄 Updating site settings...');
      
      // Check existing record
      const { data: existing, error: fetchError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      if (fetchError) {
        console.error('❌ Error checking existing record:', fetchError);
        throw fetchError;
      }
      
      let result;
      if (existing) {
        console.log('📝 Updating existing record');
        const { data, error } = await supabase
          .from('site_settings')
          .update(settings)
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) {
          console.error('❌ Update failed:', error);
          throw error;
        }
        result = data;
      } else {
        console.log('➕ Creating new record');
        const { id, ...settingsToInsert } = settings;
        const { data, error } = await supabase
          .from('site_settings')
          .insert(settingsToInsert)
          .select()
          .single();
        
        if (error) {
          console.error('❌ Insert failed:', error);
          throw error;
        }
        result = data;
      }
      
      console.log('✅ Settings updated successfully');
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
    }
  });
}
