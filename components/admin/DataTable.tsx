"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Search, Plus } from "lucide-react"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  onEdit: (item: any) => void
  onDelete: (item: any) => void
  onAdd: () => void
  searchKey?: string
  title: string
}

export default function DataTable({ data, columns, onEdit, onDelete, onAdd, searchKey, title }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = searchKey
    ? data.filter((item) => item[searchKey]?.toLowerCase().includes(searchTerm.toLowerCase()))
    : data

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <Button onClick={onAdd} className="bg-teal-500 hover:bg-teal-600">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      {searchKey && (
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white"
          />
        </div>
      )}

      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              {columns.map((column) => (
                <TableHead key={column.key} className="text-gray-300">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-8 text-gray-400">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, index) => (
                <TableRow key={item.id || index} className="border-gray-700">
                  {columns.map((column) => (
                    <TableCell key={column.key} className="text-gray-300">
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onDelete(item)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
