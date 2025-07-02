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
import { apiClient } from "@/lib/auth";
import { ExternalLink, Github, Star } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  techStack: string[];
  images: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  featured: boolean;
  status: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    detailedDescription: "",
    techStack: "",
    images: "",
    liveUrl: "",
    githubUrl: "",
    demoUrl: "",
    featured: false,
    status: "completed",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await apiClient.getProjects();
      setProjects(response.data);
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
      name: "",
      shortDescription: "",
      detailedDescription: "",
      techStack: "",
      images: "",
      liveUrl: "",
      githubUrl: "",
      demoUrl: "",
      featured: false,
      status: "completed",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Project) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      shortDescription: item.shortDescription,
      detailedDescription: item.detailedDescription,
      techStack: item.techStack.join(", "),
      images: item.images.join(", "),
      liveUrl: item.links.live || "",
      githubUrl: item.links.github || "",
      demoUrl: item.links.demo || "",
      featured: item.featured,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Project) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await apiClient.deleteProject(item._id);
      setProjects(projects.filter(p => p._id !== item._id));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
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
      name: formData.name,
      shortDescription: formData.shortDescription,
      detailedDescription: formData.detailedDescription,
      techStack: formData.techStack
        .split(",")
        .map(tech => tech.trim())
        .filter(Boolean),
      images: formData.images
        .split(",")
        .map(img => img.trim())
        .filter(Boolean),
      links: {
        live: formData.liveUrl || undefined,
        github: formData.githubUrl || undefined,
        demo: formData.demoUrl || undefined,
      },
      featured: formData.featured,
      status: formData.status,
    };

    try {
      if (editingItem) {
        const response = await apiClient.updateProject(editingItem._id, submitData);
        setProjects(projects.map(p => (p._id === editingItem._id ? response.data : p)));
      } else {
        const response = await apiClient.createProject(submitData);
        setProjects([...projects, response.data]);
      }
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: `Project ${editingItem ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "create"} project`,
        variant: "destructive",
      });
    }
  };

  const columns = [
    { key: "name", label: "Project Name" },
    {
      key: "techStack",
      label: "Technologies",
      render: (techStack: string[]) => (
        <div className="flex flex-wrap gap-1">
          {techStack.slice(0, 2).map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {tech}
            </Badge>
          ))}
          {techStack.length > 2 && (
            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
              +{techStack.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (status: string) => {
        const colorMap = {
          completed: "bg-green-50 text-green-700 border-green-200",
          "in-progress": "bg-yellow-50 text-yellow-700 border-yellow-200",
          planned: "bg-gray-50 text-gray-700 border-gray-200",
        };
        return (
          <Badge variant="outline" className={colorMap[status as keyof typeof colorMap] || "bg-gray-50 text-gray-700 border-gray-200"}>
            {status}
          </Badge>
        );
      },
    },
    {
      key: "featured",
      label: "Featured",
      render: (featured: boolean) =>
        featured ? (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Regular
          </Badge>
        ),
    },
    {
      key: "links",
      label: "Links",
      render: (_: any, item: Project) => (
        <div className="flex gap-1">
          {item.links.live && (
            <Button variant="outline" size="sm" asChild className="h-6 w-6 p-0 bg-white border-gray-300">
              <a href={item.links.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
          {item.links.github && (
            <Button variant="outline" size="sm" asChild className="h-6 w-6 p-0 bg-white border-gray-300">
              <a href={item.links.github} target="_blank" rel="noopener noreferrer">
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
        <div className="bg-white p-6 rounded-lg border border-gray-200">
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
        searchKey="name"
        title="Projects"
        description="Manage your portfolio projects and showcase your work"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900">{editingItem ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {editingItem ? "Update the project details" : "Add a new project to your portfolio"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Project Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-700">
                  Status
                </Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription" className="text-gray-700">
                Short Description
              </Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={2}
                required
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailedDescription" className="text-gray-700">
                Detailed Description
              </Label>
              <Textarea
                id="detailedDescription"
                value={formData.detailedDescription}
                onChange={e => setFormData({ ...formData, detailedDescription: e.target.value })}
                rows={4}
                required
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="techStack" className="text-gray-700">
                Technologies (comma-separated)
              </Label>
              <Input
                id="techStack"
                value={formData.techStack}
                onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="e.g., React, TypeScript, Node.js"
                required
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images" className="text-gray-700">
                Image URLs (comma-separated)
              </Label>
              <Input
                id="images"
                value={formData.images}
                onChange={e => setFormData({ ...formData, images: e.target.value })}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="liveUrl" className="text-gray-700">
                  Live URL
                </Label>
                <Input
                  id="liveUrl"
                  value={formData.liveUrl}
                  onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://project-demo.com"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl" className="text-gray-700">
                  GitHub URL
                </Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demoUrl" className="text-gray-700">
                  Demo URL
                </Label>
                <Input
                  id="demoUrl"
                  value={formData.demoUrl}
                  onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=demo"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={checked => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured" className="text-gray-700">
                Featured Project
              </Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="bg-white border-gray-300 text-gray-700"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                {editingItem ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
