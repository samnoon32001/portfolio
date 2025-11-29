import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: <Mail size={24} />,
    label: "Email",
    value: "your@email.com",
    href: "mailto:your@email.com",
  },
  {
    icon: <Phone size={24} />,
    label: "Phone",
    value: "+1 234 567 890",
    href: "tel:+1234567890",
  },
  {
    icon: <MapPin size={24} />,
    label: "Location",
    value: "Your City, Country",
    href: "#",
  },
];

const socialLinks = [
  { icon: <Github size={20} />, href: "#", label: "GitHub" },
  { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
  { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
];

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title mb-4">
            Let's work <span className="gradient-text">together</span>
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-heading font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-600/20 border border-primary/30">
              <h4 className="font-heading font-semibold mb-2">
                Free Consultation
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Let's discuss your project and see how I can help bring your ideas to life.
              </p>
              <Button variant="hero" size="default" className="w-full">
                Schedule a Call
              </Button>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <h3 className="text-xl font-heading font-semibold mb-6">
                Send a Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="bg-secondary border-border focus:border-primary resize-none"
                />
              </div>

              <Button variant="hero" size="lg" type="submit" className="w-full">
                <Send className="mr-2" size={18} />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
