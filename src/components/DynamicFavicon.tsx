import { useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export function DynamicFavicon() {
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    const updateFavicon = () => {
      // Remove existing favicons
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(favicon => favicon.remove());

      // Create new favicon
      let faviconUrl = '/favicon.ico'; // Default fallback
      
      if (settings?.photo_url) {
        // Use profile picture as favicon
        faviconUrl = settings.photo_url;
      }

      // Create favicon link elements
      const sizes = ['32x32', '16x16', '192x192', '512x512'];
      const rels = ['icon', 'icon', 'icon', 'apple-touch-icon'];

      sizes.forEach((size, index) => {
        const link = document.createElement('link');
        link.rel = rels[index];
        link.sizes = size;
        link.href = faviconUrl;
        document.head.appendChild(link);
      });

      // Also update Open Graph and Twitter images if profile picture exists
      if (settings?.photo_url) {
        // Update Open Graph image
        let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
        if (ogImage) {
          ogImage.setAttribute('property', 'og:image');
          ogImage.content = settings.photo_url;
        } else {
          ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          ogImage.content = settings.photo_url;
          document.head.appendChild(ogImage);
        }

        // Update Twitter image
        let twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
        if (twitterImage) {
          twitterImage.setAttribute('name', 'twitter:image');
          twitterImage.content = settings.photo_url;
        } else {
          twitterImage = document.createElement('meta');
          twitterImage.setAttribute('name', 'twitter:image');
          twitterImage.content = settings.photo_url;
          document.head.appendChild(twitterImage);
        }
      }
    };

    updateFavicon();
  }, [settings?.photo_url]);

  return null; // This component doesn't render anything
}
