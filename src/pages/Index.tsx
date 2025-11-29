import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero Section - Full viewport intro with floating elements */}
        <HeroSection />

        {/* About Section - Personal info with stats */}
        <AboutSection />

        {/* Skills Section - Services and tech stack */}
        <SkillsSection />

        {/* Projects Section - Portfolio gallery with filters */}
        <ProjectsSection />

        {/* Contact Section - Form and contact info */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
