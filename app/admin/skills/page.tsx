"use client";

import DataTable from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type React from "react";
import { useEffect, useState } from "react";

interface Skill {
  _id: string;
  name: string;
  level: number;
  category: string;
}

const skillCategories = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Design", "Other"];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    category: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/admin/skills");
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch skills data",
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
      level: 50,
      category: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Skill) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      level: item.level,
      category: item.category,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Skill) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`/api/admin/skills/${item._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSkills(skills.filter(s => s._id !== item._id));
        toast({
          title: "Success",
          description: "Skill deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem ? `/api/admin/skills/${editingItem._id}` : "/api/admin/skills";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingItem) {
          setSkills(skills.map(s => (s._id === editingItem._id ? data : s)));
        } else {
          setSkills([...skills, data]);
        }
        setIsModalOpen(false);
        toast({
          title: "Success",
          description: `Skill ${editingItem ? "updated" : "created"} successfully`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "create"} skill`,
        variant: "destructive",
      });
    }
  };

  const columns = [
    { key: "name", label: "Skill Name" },
    {
      key: "category",
      label: "Category",
      render: (category: string) => <Badge variant="outline">{category}</Badge>,
    },
    {
      key: "level",
      label: "Proficiency",
      render: (level: number) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <Progress value={level} className="flex-1" />
          <span className="text-sm text-gray-600 min-w-[30px]">{level}%</span>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skills Management</h1>
          <p className="text-gray-600">Manage your technical skills and proficiency levels</p>
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
        data={skills}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKey="name"
        title="Skills"
        description="Manage your technical skills and proficiency levels"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Skill" : "Add Skill"}</DialogTitle>
            <DialogDescription>{editingItem ? "Update the skill details" : "Add a new skill to your portfolio"}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., React, Node.js, Python"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={value => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Proficiency Level: {formData.level}%</Label>
              <div className="space-y-2">
                <Input
                  id="level"
                  type="range"
                  min="1"
                  max="100"
                  value={formData.level}
                  onChange={e => setFormData({ ...formData, level: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
                <Progress value={formData.level} className="w-full" />
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
