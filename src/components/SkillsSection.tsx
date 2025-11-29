import { 
  Code2, 
  Palette, 
  Server, 
  Smartphone, 
  Database, 
  Globe,
  Figma,
  GitBranch
} from "lucide-react";

const skills = [
  {
    icon: <Code2 size={28} />,
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    icon: <Server size={28} />,
    title: "Backend Development",
    description: "Creating robust server-side applications and APIs using Node.js, Python, and cloud services.",
    technologies: ["Node.js", "Python", "Express", "PostgreSQL"],
  },
  {
    icon: <Smartphone size={28} />,
    title: "Responsive Design",
    description: "Ensuring seamless experiences across all devices with mobile-first approach and adaptive layouts.",
    technologies: ["Mobile-First", "CSS Grid", "Flexbox", "Media Queries"],
  },
  {
    icon: <Palette size={28} />,
    title: "UI/UX Design",
    description: "Designing intuitive and visually appealing interfaces that enhance user experience.",
    technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
  },
  {
    icon: <Database size={28} />,
    title: "Database Management",
    description: "Designing and optimizing database structures for efficient data storage and retrieval.",
    technologies: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    icon: <Globe size={28} />,
    title: "Full-Stack Solutions",
    description: "Delivering end-to-end web applications from concept to deployment with modern tech stacks.",
    technologies: ["REST APIs", "GraphQL", "Docker", "AWS"],
  },
];

const techStack = [
  { name: "React", icon: <Code2 size={20} /> },
  { name: "TypeScript", icon: <Code2 size={20} /> },
  { name: "Node.js", icon: <Server size={20} /> },
  { name: "Tailwind", icon: <Palette size={20} /> },
  { name: "Figma", icon: <Figma size={20} /> },
  { name: "Git", icon: <GitBranch size={20} /> },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-subtitle">My Skills</span>
          <h2 className="section-title mb-4">
            Services & expertise for{" "}
            <span className="gradient-text">modern solutions</span>
          </h2>
          <p className="text-muted-foreground">
            A comprehensive skill set covering the full spectrum of web development,
            from design to deployment.
          </p>
        </div>

        {/* Tech stack marquee */}
        <div className="mb-16 overflow-hidden">
          <div className="flex gap-4 animate-marquee">
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary border border-border whitespace-nowrap"
              >
                <span className="text-primary">{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  index,
}: {
  skill: typeof skills[0];
  index: number;
}) {
  return (
    <div
      className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
        {skill.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-heading font-semibold mb-3">{skill.title}</h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {skill.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {skill.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
