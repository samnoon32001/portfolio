import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function HeroSection() {
  const { data: settings } = useSiteSettings();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ perspective: '1000px' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Floating decorative elements - 3D illusion cubes and spheres */}
      <div className="absolute left-[8%] top-[25%] w-20 md:w-24 h-20 md:h-24 opacity-40 floating-3d">
        <div className="w-full h-full cube-gradient-primary rounded-lg shadow-cube-3d border border-primary/30"></div>
      </div>

      <div className="absolute right-[12%] top-[20%] w-16 md:w-20 h-16 md:h-20 opacity-35 floating-delayed-3d">
        <div className="w-full h-full sphere-gradient-purple rounded-full shadow-sphere-3d border border-purple-500/30"></div>
      </div>

      <div className="absolute left-[15%] bottom-[30%] w-12 md:w-16 h-12 md:h-16 opacity-30 floating-slow-3d">
        <div className="w-full h-full cube-gradient-blue rounded-md shadow-cube-3d-sm border border-blue-500/30"></div>
      </div>

      <div className="absolute right-[20%] bottom-[25%] w-14 md:w-18 h-14 md:h-18 opacity-35 floating-slow-3d">
        <div className="w-full h-full cube-gradient-orange rounded-lg shadow-cube-3d transform rotate-45 border border-orange-500/30"></div>
      </div>

      <div className="absolute left-[45%] top-[15%] w-8 md:w-10 h-8 md:h-10 opacity-25 floating-3d">
        <div className="w-full h-full sphere-gradient-cyan rounded-full shadow-sphere-3d-sm border border-cyan-500/30"></div>
      </div>

      <div className="absolute right-[35%] bottom-[20%] w-6 md:w-8 h-6 md:h-8 opacity-30 floating-delayed-3d">
        <div className="w-full h-full cube-gradient-green rounded-md shadow-cube-3d-xs border border-green-500/30"></div>
      </div>

      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Welcome to my portfolio
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 animate-fade-in-up stagger-1">
            Hi, I'm <span className="gradient-text">{settings?.name || 'Your Name'}</span>
            <br />
            {settings?.tagline || 'Web Developer & Designer'}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            {settings?.hero_subtitle || 'I craft beautiful, responsive, and user-friendly web experiences using modern technologies. Let\'s build something amazing together.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
            <Button variant="hero" size="xl" asChild>
              <a href={settings?.hero_cta_primary_url || '#projects'}>
                {settings?.hero_cta_primary_text || 'View My Work'}
                <ArrowRight className="ml-2" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href={settings?.hero_cta_secondary_url || '#'}>
                <Download className="mr-2" />
                {settings?.hero_cta_secondary_text || 'Download CV'}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up stagger-4">
            <StatItem value={`${settings?.years_experience || 5}+`} label="Years Experience" />
            <StatItem value={`${settings?.projects_completed || 50}+`} label="Projects Completed" />
            <StatItem value={`${settings?.satisfied_clients || 30}+`} label="Happy Clients" />
            <StatItem value="99%" label="Client Satisfaction" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="stat-number">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
