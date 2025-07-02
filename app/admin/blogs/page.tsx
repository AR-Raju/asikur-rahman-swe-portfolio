"use client";

import DataTable from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Blog } from "@/interfaces";
import { apiClient } from "@/lib/auth";
import { Calendar, Star } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const blogCategories = ["Technology", "Web Development", "Mobile Development", "Design", "Tutorial", "Opinion", "News", "Other"];

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: "",
    status: "published",
    featured: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.getBlogs();
      setBlogs(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blogs data",
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
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      featuredImage: "",
      status: "published",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Blog) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      tags: item.tags.join(", "),
      featuredImage: item.featuredImage,
      status: item.status,
      featured: item.featured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Blog) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await apiClient.deleteBlog(item.slug);
      setBlogs(blogs.filter(b => b._id !== item._id));
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      tags: formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),
      featuredImage: formData.featuredImage,
      status: formData.status,
      featured: formData.featured,
    };

    try {
      if (editingItem) {
        const response = await apiClient.updateBlog(editingItem.slug, submitData);
        setBlogs(blogs.map(b => (b._id === editingItem._id ? response.data : b)));
      } else {
        const response = await apiClient.createBlog(submitData);
        setBlogs([...blogs, response.data]);
      }
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: `Blog post ${editingItem ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "create"} blog post`,
        variant: "destructive",
      });
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "category",
      label: "Category",
      render: (category: string) => (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {category}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (status: string, item: Blog) => (
        <div className="flex gap-1">
          <Badge
            variant={status === "published" ? "default" : "secondary"}
            className={status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
          >
            {status}
          </Badge>
          {item.featured && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (createdAt: string) => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Calendar className="h-3 w-3" />
          {new Date(createdAt).toLocaleDateString()}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Manage your blog posts and articles</p>
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
        data={blogs}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKey="title"
        title="Blogs"
        description="Manage your blog posts and articles"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900">{editingItem ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {editingItem ? "Update the blog post details" : "Create a new blog post"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700">
                  Category
                </Label>
                <Select value={formData.category} onValueChange={value => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    {blogCategories.map(category => (
                      <SelectItem key={category} value={category} className="text-gray-900">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage" className="text-gray-700">
                Featured Image URL
              </Label>
              <Input
                id="featuredImage"
                value={formData.featuredImage}
                onChange={e => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-gray-700">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                placeholder="Brief description of the blog post..."
                required
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-700">
                Content (Markdown supported)
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                placeholder="Write your blog post content here..."
                required
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-gray-700">
                Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g., React, JavaScript, Web Development"
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={checked => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured" className="text-gray-700">
                  Featured Post
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="status" className="text-gray-700">
                  Status:
                </Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-900"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
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
