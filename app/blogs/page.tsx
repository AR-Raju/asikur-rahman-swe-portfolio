import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, User } from "lucide-react"

interface Blog {
  id: number
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  author: string
  publishedAt: string
  tags: string[]
  category: string
  readTime: number
  featured: boolean
}

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch blogs")
  }

  return res.json()
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Posts</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, technology, and programming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="bg-gray-800 border-gray-700 hover:border-teal-500 transition-colors">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.featuredImage || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  {blog.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-teal-500 text-gray-900">Featured</Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{blog.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 line-clamp-2">
                  <Link href={`/blogs/${blog.id}`} className="hover:text-teal-400 transition-colors">
                    {blog.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</CardDescription>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(blog.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{blog.readTime} min read</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {blog.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{blog.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
