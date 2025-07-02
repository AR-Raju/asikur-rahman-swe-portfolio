"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  searchKey: string;
  title: string;
  description?: string;
}

export default function DataTable({ data, columns, onAdd, onEdit, onDelete, searchKey, title, description }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData =
    data?.filter((item: { [x: string]: string }) => item[searchKey]?.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>
          <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add {title.slice(0, -1)}
          </Button>
        </div>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader className="bg-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">{title} List</CardTitle>
              <CardDescription className="text-gray-600">Manage your {title.toLowerCase()} entries</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-white border-gray-300 text-gray-900"
                />
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                {filteredData.length} items
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white">
          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No {title.toLowerCase()} found</p>
              <Button onClick={onAdd} variant="outline" className="mt-4 bg-white border-gray-300 text-gray-700">
                <Plus className="h-4 w-4 mr-2" />
                Add your first {title.slice(0, -1).toLowerCase()}
              </Button>
            </div>
          ) : (
            <div className="rounded-md border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    {columns.map(column => (
                      <TableHead key={column.key} className="text-gray-700 font-medium">
                        {column.label}
                      </TableHead>
                    ))}
                    <TableHead className="text-gray-700 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item: { [x: string]: any; _id: any; id: any }, index: any) => (
                    <TableRow key={item._id || item.id || index} className="hover:bg-gray-50">
                      {columns.map(column => (
                        <TableCell key={column.key} className="text-gray-900">
                          {column.render ? column.render(item[column.key], item) : item[column.key] || "-"}
                        </TableCell>
                      ))}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                            <DropdownMenuItem onClick={() => onEdit(item)} className="text-gray-700 hover:text-gray-900 cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(item)} className="text-red-600 hover:text-red-700 cursor-pointer">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
