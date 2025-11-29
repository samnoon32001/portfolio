-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table (single row for site config)
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Your Name',
    tagline TEXT DEFAULT 'Web Developer & Designer',
    bio TEXT,
    photo_url TEXT,
    location TEXT DEFAULT 'Your Location',
    email TEXT DEFAULT 'your@email.com',
    degree TEXT DEFAULT 'CS Degree',
    education TEXT DEFAULT 'Education',
    years_experience INTEGER DEFAULT 5,
    projects_completed INTEGER DEFAULT 50,
    satisfied_clients INTEGER DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read site settings
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can update site settings
CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site settings"
ON public.site_settings
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT DEFAULT 'Web App',
    live_url TEXT,
    github_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Everyone can read visible projects
CREATE POLICY "Anyone can view visible projects"
ON public.projects
FOR SELECT
USING (is_visible = true);

-- Admins can manage all projects
CREATE POLICY "Admins can manage projects"
ON public.projects
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (name, tagline, bio, location, email, degree, education, years_experience, projects_completed, satisfied_clients)
VALUES (
    'Your Name',
    'Web Developer & Designer',
    'I''m a passionate web developer with expertise in creating modern, responsive websites and applications. With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean code and intuitive design.',
    'Your Location',
    'hello@example.com',
    'CS Degree',
    'Education',
    5,
    50,
    30
);

-- Insert default projects
INSERT INTO public.projects (title, description, image_url, category, display_order) VALUES
('E-Commerce Platform', 'A full-featured online store with cart, checkout, and payment integration.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600', 'Web App', 1),
('Portfolio Website', 'Modern portfolio website with smooth animations and responsive design.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', 'Website', 2),
('Task Management App', 'Collaborative task management tool with real-time updates.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', 'Web App', 3),
('Mobile Banking UI', 'Clean and intuitive mobile banking interface design.', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600', 'UI/UX', 4),
('Social Media Dashboard', 'Analytics dashboard for social media management.', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600', 'Dashboard', 5);