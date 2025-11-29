import { MapPin, Mail, Languages, GraduationCap } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function AboutSection() {
  const { data: settings } = useSiteSettings();

  return (
    <section id="about" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative animate-slide-in-left">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-card border border-border">
              {settings?.photo_url ? (
                <img 
                  src={settings.photo_url} 
                  alt={settings.name || 'Profile'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-4">
                      <span className="text-5xl font-bold text-primary-foreground">
                        {settings?.name?.charAt(0) || 'Y'}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">Your photo here</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Decorative card */}
            <div className="hidden sm:block absolute -bottom-4 right-4 lg:right-auto lg:-left-4 glass-card rounded-xl p-3 animate-fade-in-delayed z-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="text-primary" size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{settings?.education || 'Education'}</div>
                  <div className="text-xs text-muted-foreground">{settings?.degree || 'CS Degree'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="animate-slide-in-right">
            <span className="section-subtitle">About Me</span>
            <h2 className="section-title mb-6">
              Passionate about creating{" "}
              <span className="gradient-text">digital experiences</span>
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {settings?.bio || "I'm a full-stack developer with experience building web applications. I specialize in creating modern, responsive, and user-friendly interfaces using the latest technologies. My passion lies in transforming complex problems into simple, elegant solutions."}
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing my knowledge 
              through technical writing and mentoring.
            </p>

            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon={<MapPin size={20} />} label="Location" value={settings?.location || 'Your City, Country'} />
              <InfoCard icon={<Mail size={20} />} label="Email" value={settings?.email || 'your@email.com'} />
              <InfoCard icon={<Languages size={20} />} label="Languages" value="Arabic & English" />
              <InfoCard icon={<GraduationCap size={20} />} label="Degree" value={settings?.degree || 'Computer Science'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium text-sm">{value}</div>
      </div>
    </div>
  );
}
