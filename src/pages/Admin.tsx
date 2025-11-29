import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSiteSettings, useUpdateSiteSettings } from '@/hooks/useSiteSettings';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject, Project } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2, LogOut, Save, Plus, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const { data: settings, isLoading: settingsLoading } = useSiteSettings();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const updateSettings = useUpdateSiteSettings();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [settingsForm, setSettingsForm] = useState({
    name: '',
    tagline: '',
    bio: '',
    photo_url: '',
    location: '',
    email: '',
    degree: '',
    education: '',
    years_experience: 0,
    projects_completed: 0,
    satisfied_clients: 0
  });

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'Web App',
    live_url: '',
    github_url: '',
    display_order: 0,
    is_visible: true
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (settings) {
      setSettingsForm({
        name: settings.name || '',
        tagline: settings.tagline || '',
        bio: settings.bio || '',
        photo_url: settings.photo_url || '',
        location: settings.location || '',
        email: settings.email || '',
        degree: settings.degree || '',
        education: settings.education || '',
        years_experience: settings.years_experience || 0,
        projects_completed: settings.projects_completed || 0,
        satisfied_clients: settings.satisfied_clients || 0
      });
    }
  }, [settings]);

  const handleSaveSettings = async () => {
    try {
      await updateSettings.mutateAsync(settingsForm);
      toast({ title: 'Settings saved!', description: 'Your portfolio has been updated.' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title) {
      toast({ title: 'Error', description: 'Project title is required', variant: 'destructive' });
      return;
    }
    try {
      await createProject.mutateAsync(newProject);
      setNewProject({
        title: '',
        description: '',
        image_url: '',
        category: 'Web App',
        live_url: '',
        github_url: '',
        display_order: (projects?.length || 0) + 1,
        is_visible: true
      });
      toast({ title: 'Project added!' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleUpdateProject = async (project: Project) => {
    try {
      await updateProject.mutateAsync(project);
      toast({ title: 'Project updated!' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject.mutateAsync(id);
      toast({ title: 'Project deleted!' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading || settingsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Site Settings */}
        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">Site Settings</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={settingsForm.name}
                onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                placeholder="Your Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input
                value={settingsForm.tagline}
                onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                placeholder="Web Developer & Designer"
              />
            </div>

            <div className="space-y-2">
              <Label>Photo URL</Label>
              <Input
                value={settingsForm.photo_url}
                onChange={(e) => setSettingsForm({ ...settingsForm, photo_url: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={settingsForm.location}
                onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                placeholder="Your City"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={settingsForm.email}
                onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Education</Label>
              <Input
                value={settingsForm.education}
                onChange={(e) => setSettingsForm({ ...settingsForm, education: e.target.value })}
                placeholder="Education"
              />
            </div>

            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={settingsForm.degree}
                onChange={(e) => setSettingsForm({ ...settingsForm, degree: e.target.value })}
                placeholder="CS Degree"
              />
            </div>

            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input
                type="number"
                value={settingsForm.years_experience}
                onChange={(e) => setSettingsForm({ ...settingsForm, years_experience: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label>Projects Completed</Label>
              <Input
                type="number"
                value={settingsForm.projects_completed}
                onChange={(e) => setSettingsForm({ ...settingsForm, projects_completed: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label>Satisfied Clients</Label>
              <Input
                type="number"
                value={settingsForm.satisfied_clients}
                onChange={(e) => setSettingsForm({ ...settingsForm, satisfied_clients: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Bio</Label>
              <Textarea
                value={settingsForm.bio}
                onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                placeholder="Tell visitors about yourself..."
                rows={4}
              />
            </div>
          </div>

          <Button 
            onClick={handleSaveSettings} 
            className="mt-6"
            disabled={updateSettings.isPending}
          >
            {updateSettings.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Settings
          </Button>
        </section>

        {/* Projects */}
        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">Projects</h2>

          {/* Add New Project */}
          <div className="border border-border/50 rounded-xl p-4 mb-6">
            <h3 className="font-medium mb-4">Add New Project</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="Project Title"
              />
              <Input
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                placeholder="Category (e.g., Web App)"
              />
              <Input
                value={newProject.image_url}
                onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                placeholder="Image URL"
              />
              <Input
                value={newProject.live_url}
                onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                placeholder="Live URL"
              />
              <Input
                value={newProject.github_url}
                onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                placeholder="GitHub URL"
              />
              <Input
                type="number"
                value={newProject.display_order}
                onChange={(e) => setNewProject({ ...newProject, display_order: parseInt(e.target.value) || 0 })}
                placeholder="Display Order"
              />
              <Textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Description"
                className="md:col-span-2"
              />
            </div>
            <Button 
              onClick={handleAddProject} 
              className="mt-4"
              disabled={createProject.isPending}
            >
              {createProject.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Add Project
            </Button>
          </div>

          {/* Existing Projects */}
          <div className="space-y-4">
            {projectsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : projects?.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No projects yet. Add one above!</p>
            ) : (
              projects?.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onUpdate={handleUpdateProject}
                  onDelete={handleDeleteProject}
                  isUpdating={updateProject.isPending}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function ProjectCard({ 
  project, 
  onUpdate, 
  onDelete,
  isUpdating 
}: { 
  project: Project; 
  onUpdate: (project: Project) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
}) {
  const [form, setForm] = useState(project);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setForm(project);
  }, [project]);

  const handleChange = (field: keyof Project, value: any) => {
    setForm({ ...form, [field]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(form);
    setHasChanges(false);
  };

  return (
    <div className="border border-border/50 rounded-xl p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Title"
        />
        <Input
          value={form.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          placeholder="Category"
        />
        <Input
          value={form.image_url || ''}
          onChange={(e) => handleChange('image_url', e.target.value)}
          placeholder="Image URL"
        />
        <Input
          value={form.live_url || ''}
          onChange={(e) => handleChange('live_url', e.target.value)}
          placeholder="Live URL"
        />
        <Input
          value={form.github_url || ''}
          onChange={(e) => handleChange('github_url', e.target.value)}
          placeholder="GitHub URL"
        />
        <Input
          type="number"
          value={form.display_order || 0}
          onChange={(e) => handleChange('display_order', parseInt(e.target.value) || 0)}
          placeholder="Display Order"
        />
        <Textarea
          value={form.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description"
          className="md:col-span-2"
        />
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Switch
            checked={form.is_visible ?? true}
            onCheckedChange={(checked) => handleChange('is_visible', checked)}
          />
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            {form.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {form.is_visible ? 'Visible' : 'Hidden'}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          {hasChanges && (
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
