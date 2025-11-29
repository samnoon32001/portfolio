# Personal Portfolio Website

A stunning, modern portfolio website inspired by the NextMind theme design. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **NextMind-Inspired Design**: Dark theme with orange/coral gradient accents
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Floating elements, fade-ins, and hover effects
- **Sections Included**:
  - Hero with stats counters
  - About Me with contact info
  - Skills & Services grid
  - Projects gallery with filtering
  - Contact form with social links
  - Footer with navigation

## 🎨 Customization Guide

### 1. Personal Information

Update your name and details in these files:

**`src/components/HeroSection.tsx`**
```tsx
// Change [Your Name] to your actual name
<h1>Hi, I'm <span className="gradient-text">[Your Name]</span></h1>
```

**`src/components/AboutSection.tsx`**
- Update bio text
- Change location, email, languages
- Replace "YN" initials with your own

**`src/components/ContactSection.tsx`**
- Update email, phone, location
- Add your social media links

### 2. Projects

Edit `src/components/ProjectsSection.tsx`:
```tsx
const projects = [
  {
    title: "Your Project Name",
    description: "Project description...",
    image: "your-image-url.jpg",
    tags: ["React", "TypeScript"],
    category: "Web App",
    liveUrl: "https://...",
    githubUrl: "https://...",
  },
  // Add more projects...
];
```

### 3. Skills & Services

Edit `src/components/SkillsSection.tsx` to update:
- Skills array with your expertise
- Tech stack icons in the marquee

### 4. Profile Photo

Replace the placeholder in `AboutSection.tsx` with your actual image:
```tsx
<img src={yourPhoto} alt="Your Name" className="..." />
```

### 5. Logo

Update the logo in `Navbar.tsx` and `Footer.tsx`:
- Change the "P" initial
- Or replace with your own logo image

### 6. Colors (Optional)

Modify `src/index.css` to change the color scheme:
```css
:root {
  --primary: 24 95% 53%; /* Orange - change HSL values */
  --background: 222 47% 5%; /* Dark navy */
}
```

### 7. SEO

Update `index.html` with your actual:
- Title
- Meta description
- Open Graph tags
- Twitter card info

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── assets/          # Images & floating shapes
├── components/
│   ├── ui/          # Shadcn UI components
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── pages/
│   └── Index.tsx    # Main page composition
├── index.css        # Design system & animations
└── App.tsx          # Router setup
```

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library
- **Lucide React** - Icon system
- **Vite** - Build tool

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

Made with ❤️ using [Lovable](https://lovable.dev)
