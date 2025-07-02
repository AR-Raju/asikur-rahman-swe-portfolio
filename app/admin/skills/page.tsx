"use client";

import DataTable from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skill } from "@/interfaces";
import { apiClient } from "@/lib/auth";
import type React from "react";
import { useEffect, useState } from "react";

const skillCategories = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Design", "Other"];
const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    category: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await apiClient.getSkills();
      setSkills(response.data);
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
      level: "",
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
      await apiClient.deleteSkill(item._id);
      setSkills(skills.filter(s => s._id !== item._id));
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
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
      if (editingItem) {
        const response = await apiClient.updateSkill(editingItem._id, formData);
        setSkills(skills.map(s => (s._id === editingItem._id ? response.data : s)));
      } else {
        const response = await apiClient.createSkill(formData);
        setSkills([...skills, response.data]);
      }
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: `Skill ${editingItem ? "updated" : "created"} successfully`,
      });
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
      render: (category: string) => (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {category}
        </Badge>
      ),
    },
    {
      key: "level",
      label: "Level",
      render: (level: string) => {
        const colorMap = {
          Beginner: "bg-red-50 text-red-700 border-red-200",
          Intermediate: "bg-yellow-50 text-yellow-700 border-yellow-200",
          Advanced: "bg-blue-50 text-blue-700 border-blue-200",
          Expert: "bg-green-50 text-green-700 border-green-200",
        };
        return (
          <Badge variant="outline" className={colorMap[level as keyof typeof colorMap] || "bg-gray-50 text-gray-700 border-gray-200"}>
            {level}
          </Badge>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
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
        <DialogContent className="bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900">{editingItem ? "Edit Skill" : "Add Skill"}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {editingItem ? "Update the skill details" : "Add a new skill to your portfolio"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Skill Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., React, Node.js, Python"
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
                  {skillCategories.map(category => (
                    <SelectItem key={category} value={category} className="text-gray-900">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-gray-700">
                Proficiency Level
              </Label>
              <Select value={formData.level} onValueChange={value => setFormData({ ...formData, level: value })}>
                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {skillLevels.map(level => (
                    <SelectItem key={level} value={level} className="text-gray-900">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
