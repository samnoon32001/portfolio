import { MapPin, Mail, Languages, GraduationCap } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative animate-slide-in-left">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-card border border-border">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-primary-foreground">YN</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Your photo here</p>
                </div>
              </div>
            </div>
            
            {/* Decorative card */}
            <div className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 glass-card rounded-xl p-4 animate-fade-in-delayed">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Education</div>
                  <div className="text-sm text-muted-foreground">CS Degree</div>
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
              I'm a full-stack developer with over 5 years of experience building 
              web applications. I specialize in creating modern, responsive, and 
              user-friendly interfaces using the latest technologies. My passion 
              lies in transforming complex problems into simple, elegant solutions.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing my knowledge 
              through technical writing and mentoring.
            </p>

            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon={<MapPin size={20} />} label="Location" value="Your City, Country" />
              <InfoCard icon={<Mail size={20} />} label="Email" value="your@email.com" />
              <InfoCard icon={<Languages size={20} />} label="Languages" value="Arabic & English" />
              <InfoCard icon={<GraduationCap size={20} />} label="Degree" value="Computer Science" />
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
