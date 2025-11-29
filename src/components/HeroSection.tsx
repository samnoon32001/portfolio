import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import floatingShape1 from "@/assets/floating-shape-1.png";
import floatingShape2 from "@/assets/floating-shape-2.png";
import floatingShape3 from "@/assets/floating-shape-3.png";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Floating decorative elements */}
      <img
        src={floatingShape1}
        alt=""
        className="absolute left-[5%] top-[30%] w-32 md:w-48 opacity-70 floating mix-blend-lighten"
      />
      <img
        src={floatingShape3}
        alt=""
        className="absolute right-[5%] top-[15%] w-32 md:w-44 opacity-60 floating-delayed mix-blend-lighten"
      />
      <img
        src={floatingShape2}
        alt=""
        className="absolute left-[10%] bottom-[25%] w-24 md:w-32 opacity-50 floating-slow mix-blend-lighten"
      />
      <img
        src={floatingShape1}
        alt=""
        className="absolute right-[15%] bottom-[20%] w-24 md:w-32 opacity-50 floating-slow rotate-45 mix-blend-lighten"
      />

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
            Hi, I'm <span className="gradient-text">[Your Name]</span>
            <br />
            Web Developer & Designer
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            I craft beautiful, responsive, and user-friendly web experiences
            using modern technologies. Let's build something amazing together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
            <Button variant="hero" size="xl">
              View My Work
              <ArrowRight className="ml-2" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Download className="mr-2" />
              Download CV
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up stagger-4">
            <StatItem value="5+" label="Years Experience" />
            <StatItem value="50+" label="Projects Completed" />
            <StatItem value="30+" label="Happy Clients" />
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
