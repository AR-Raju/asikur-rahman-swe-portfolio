"use client";

import DataTable from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Github, Star } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Project) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      technologies: item.technologies.join(", "),
      liveUrl: item.liveUrl || "",
      githubUrl: item.githubUrl || "",
      featured: item.featured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Project) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/admin/projects/${item._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter(p => p._id !== item._id));
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      technologies: formData.technologies
        .split(",")
        .map(tech => tech.trim())
        .filter(Boolean),
      liveUrl: formData.liveUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      featured: formData.featured,
    };

    try {
      const url = editingItem ? `/api/admin/projects/${editingItem._id}` : "/api/admin/projects";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingItem) {
          setProjects(projects.map(p => (p._id === editingItem._id ? data : p)));
        } else {
          setProjects([...projects, data]);
        }
        setIsModalOpen(false);
        toast({
          title: "Success",
          description: `Project ${editingItem ? "updated" : "created"} successfully`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "create"} project`,
        variant: "destructive",
      });
    }
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (image: string, item: Project) => (
        <div className="w-12 h-12 relative rounded-md overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
        </div>
      ),
    },
    { key: "title", label: "Title" },
    {
      key: "technologies",
      label: "Technologies",
      render: (technologies: string[]) => (
        <div className="flex flex-wrap gap-1">
          {technologies.slice(0, 2).map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {technologies.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{technologies.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (featured: boolean) =>
        featured ? (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        ) : (
          <Badge variant="outline">Regular</Badge>
        ),
    },
    {
      key: "links",
      label: "Links",
      render: (_: any, item: Project) => (
        <div className="flex gap-1">
          {item.liveUrl && (
            <Button variant="outline" size="sm" asChild className="h-6 w-6 p-0 bg-transparent">
              <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
          {item.githubUrl && (
            <Button variant="outline" size="sm" asChild className="h-6 w-6 p-0 bg-transparent">
              <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <DataTable
        data={projects}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKey="title"
        title="Projects"
        description="Manage your portfolio projects and showcase your work"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogDescription>{editingItem ? "Update the project details" : "Add a new project to your portfolio"}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL (Optional)</Label>
                <Input
                  id="liveUrl"
                  value={formData.liveUrl}
                  onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://project-demo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="e.g., React, TypeScript, Node.js"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={checked => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingItem ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
