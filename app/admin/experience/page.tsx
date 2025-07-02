"use client";

import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Experience } from "@/interfaces";
import { apiClient } from "@/lib/auth";
import type React from "react";
import { useEffect, useState } from "react";

export default function AdminExperience() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    duration: "",
    description: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await apiClient.getExperience();
      setExperience(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch experience data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      company: "",
      position: "",
      duration: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Experience) => {
    setEditingItem(item);
    setFormData({
      company: item.company,
      position: item.position,
      duration: item.duration,
      description: item.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Experience) => {
    if (!confirm("Are you sure you want to delete this experience entry?")) return;

    try {
      await apiClient.deleteExperience(item._id);
      setExperience(experience.filter(e => e._id !== item._id));
      toast({
        title: "Success",
        description: "Experience entry deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete experience entry",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        const response = await apiClient.updateExperience(editingItem._id, formData);
        setExperience(experience.map(e => (e._id === editingItem._id ? response.data : e)));
      } else {
        const response = await apiClient.createExperience(formData);
        setExperience([...experience, response.data]);
      }
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: `Experience entry ${editingItem ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "create"} experience entry`,
        variant: "destructive",
      });
    }
  };

  const columns = [
    { key: "company", label: "Company" },
    { key: "position", label: "Position" },
    { key: "duration", label: "Duration" },
    {
      key: "description",
      label: "Description",
      render: (description: string) => (
        <span className="text-gray-600 text-sm">{description.length > 50 ? `${description.substring(0, 50)}...` : description}</span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Experience Management</h1>
          <p className="text-gray-600">Manage your work experience</p>
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
        data={experience}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKey="company"
        title="Experience"
        description="Manage your work experience and professional history"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900">{editingItem ? "Edit Experience" : "Add Experience"}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {editingItem ? "Update the experience details" : "Add a new experience entry"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-700">
                  Company
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-gray-700">
                  Position
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                  required
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="duration" className="text-gray-700">
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., Jan 2022 - Present"
                  required
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                placeholder="Describe your responsibilities and achievements"
                required
                className="bg-white border-gray-300 text-gray-900"
              />
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
