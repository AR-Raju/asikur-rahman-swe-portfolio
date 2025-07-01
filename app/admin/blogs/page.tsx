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
import { Calendar, Star } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  tags: string[];
  category: string;
  readTime: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

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
    featuredImage: "",
    author: "",
    tags: "",
    category: "",
    readTime: 5,
    featured: false,
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
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
      featuredImage: "",
      author: "Asikur Rahman",
      tags: "",
      category: "",
      readTime: 5,
      featured: false,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Blog) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      featuredImage: item.featuredImage,
      author: item.author,
      tags: item.tags.join(", "),
      category: item.category,
      readTime: item.readTime,
      featured: item.featured,
      published: item.published,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Blog) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/admin/blogs/${item._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs(blogs.filter(b => b._id !== item._id));
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        });
      }
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
      featuredImage: formData.featuredImage,
      author: formData.author,
      tags: formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),
      category: formData.category,
      readTime: formData.readTime,
      featured: formData.featured,
      published: formData.published,
    };

    try {
      const url = editingItem ? `/api/admin/blogs/${editingItem._id}` : "/api/admin/blogs";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingItem) {
          setBlogs(blogs.map(b => (b._id === editingItem._id ? data : b)));
        } else {
          setBlogs([...blogs, data]);
        }
        setIsModalOpen(false);
        toast({
          title: "Success",
          description: `Blog post ${editingItem ? "updated" : "created"} successfully`,
        });
      }
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
      render: (category: string) => <Badge variant="outline">{category}</Badge>,
    },
    {
      key: "readTime",
      label: "Read Time",
      render: (readTime: number) => `${readTime} min`,
    },
    {
      key: "featured",
      label: "Status",
      render: (featured: boolean, item: Blog) => (
        <div className="flex gap-1">
          {featured && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge variant={item.published ? "default" : "secondary"}>{item.published ? "Published" : "Draft"}</Badge>
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
        <div>
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
        title="Blog Posts"
        description="Manage your blog posts and articles"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
            <DialogDescription>{editingItem ? "Update the blog post details" : "Create a new blog post"}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={value => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time (minutes)</Label>
                <Input
                  id="readTime"
                  type="number"
                  min="1"
                  max="60"
                  value={formData.readTime}
                  onChange={e => setFormData({ ...formData, readTime: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                value={formData.featuredImage}
                onChange={e => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                placeholder="Brief description of the blog post..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                placeholder="Write your blog post content here..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g., React, JavaScript, Web Development"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={checked => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={checked => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
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
