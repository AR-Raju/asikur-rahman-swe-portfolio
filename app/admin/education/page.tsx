"use client";

import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/auth";
import type React from "react";
import { useEffect, useState } from "react";

interface Education {
  _id: string;
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export default function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    duration: "",
    description: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await apiClient.getEducation();
      setEducation(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch education data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      institution: "",
      degree: "",
      duration: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Education) => {
    setEditingItem(item);
    setFormData({
      institution: item.institution,
      degree: item.degree,
      duration: item.duration,
      description: item.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Education) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;

    try {
      await apiClient.deleteEducation(item._id);
      setEducation(education.filter(e => e._id !== item._id));
      toast({
        title: "Success",
        description: "Education entry deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete education entry",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        const response = await apiClient.updateEducation(editingItem._id, formData);
        setEducation(education.map(e => (e._id === editingItem._id ? response.data : e)));
      } else {
        const response = await apiClient.createEducation(formData);
        setEducation([...education, response.data]);
      }
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: `Education entry ${editingItem ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "create"} education entry`,
        variant: "destructive",
      });
    }
  };

  const columns = [
    { key: "institution", label: "Institution" },
    { key: "degree", label: "Degree" },
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
          <h1 className="text-2xl font-bold text-gray-900">Education Management</h1>
          <p className="text-gray-600">Manage your educational background</p>
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
        data={education}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKey="institution"
        title="Education"
        description="Manage your educational background and qualifications"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900">{editingItem ? "Edit Education" : "Add Education"}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {editingItem ? "Update the education details" : "Add a new education entry"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-gray-700">
                  Institution
                </Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  required
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree" className="text-gray-700">
                  Degree
                </Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
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
                  placeholder="e.g., 2018 - 2022"
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
                rows={3}
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
