"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import DataTable from "@/components/admin/DataTable"

interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string[]
  tags: string[]
}

export default function AdminExperience() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Experience | null>(null)
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    period: "",
    description: "",
    tags: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchExperience()
  }, [])

  const fetchExperience = async () => {
    try {
      const response = await fetch("/api/admin/experience")
      if (response.ok) {
        const data = await response.json()
        setExperience(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch experience data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      company: "",
      position: "",
      period: "",
      description: "",
      tags: "",
    })
    setIsModalOpen(true)
  }

  const handleEdit = (item: Experience) => {
    setEditingItem(item)
    setFormData({
      company: item.company,
      position: item.position,
      period: item.period,
      description: item.description.join("\n"),
      tags: item.tags.join(", "),
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (item: Experience) => {
    if (!confirm("Are you sure you want to delete this experience entry?")) return

    try {
      const response = await fetch(`/api/admin/experience/${item.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setExperience(experience.filter((e) => e.id !== item.id))
        toast({
          title: "Success",
          description: "Experience entry deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete experience entry",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submitData = {
      company: formData.company,
      position: formData.position,
      period: formData.period,
      description: formData.description.split("\n").filter((line) => line.trim()),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    try {
      const url = editingItem ? `/api/admin/experience/${editingItem.id}` : "/api/admin/experience"
      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        const data = await response.json()
        if (editingItem) {
          setExperience(experience.map((e) => (e.id === editingItem.id ? data : e)))
        } else {
          setExperience([...experience, data])
        }
        setIsModalOpen(false)
        toast({
          title: "Success",
          description: `Experience entry ${editingItem ? "updated" : "created"} successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "create"} experience entry`,
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "company", label: "Company" },
    { key: "position", label: "Position" },
    { key: "period", label: "Period" },
    {
      key: "tags",
      label: "Technologies",
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Experience Management</h1>
          <p className="text-gray-400">Manage your work experience</p>
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
        <h1 className="text-2xl font-bold text-white">Experience Management</h1>
        <p className="text-gray-400">Manage your work experience</p>
      </div>

      <DataTable
        data={experience}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKey="company"
        title="Experience Entries"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Experience" : "Add Experience"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingItem ? "Update the experience details" : "Add a new experience entry"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-300">
                  Company
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-gray-300">
                  Position
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
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
                placeholder="e.g., May 2024 — Present"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">
                Description (one point per line)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                rows={5}
                placeholder="Enter each responsibility or achievement on a new line"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-gray-300">
                Technologies (comma-separated)
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., React, TypeScript, Node.js"
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
