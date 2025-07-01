"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import DataTable from "@/components/admin/DataTable"

interface Education {
  id: number
  institution: string
  degree: string
  period: string
  description: string
  location: string
  gpa: string
}

export default function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Education | null>(null)
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    period: "",
    description: "",
    location: "",
    gpa: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    try {
      const response = await fetch("/api/admin/education")
      if (response.ok) {
        const data = await response.json()
        setEducation(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch education data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      institution: "",
      degree: "",
      period: "",
      description: "",
      location: "",
      gpa: "",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (item: Education) => {
    setEditingItem(item)
    setFormData({
      institution: item.institution,
      degree: item.degree,
      period: item.period,
      description: item.description,
      location: item.location,
      gpa: item.gpa,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (item: Education) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return

    try {
      const response = await fetch(`/api/admin/education/${item.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEducation(education.filter((e) => e.id !== item.id))
        toast({
          title: "Success",
          description: "Education entry deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete education entry",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingItem ? `/api/admin/education/${editingItem.id}` : "/api/admin/education"
      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        if (editingItem) {
          setEducation(education.map((e) => (e.id === editingItem.id ? data : e)))
        } else {
          setEducation([...education, data])
        }
        setIsModalOpen(false)
        toast({
          title: "Success",
          description: `Education entry ${editingItem ? "updated" : "created"} successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "create"} education entry`,
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "institution", label: "Institution" },
    { key: "degree", label: "Degree" },
    { key: "period", label: "Period" },
    { key: "location", label: "Location" },
    { key: "gpa", label: "GPA" },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Education Management</h1>
          <p className="text-gray-400">Manage your educational background</p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Education Management</h1>
        <p className="text-gray-400">Manage your educational background</p>
      </div>

      <DataTable
        data={education}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKey="institution"
        title="Education Entries"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Education" : "Add Education"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingItem ? "Update the education details" : "Add a new education entry"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-gray-300">
                  Institution
                </Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree" className="text-gray-300">
                  Degree
                </Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="period" className="text-gray-300">
                  Period
                </Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="e.g., 2018 - 2022"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpa" className="text-gray-300">
                  GPA
                </Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="e.g., 3.75/4.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                {editingItem ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
