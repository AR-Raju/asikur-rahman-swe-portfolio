"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Blog {
  id: number
  title: string
  excerpt: string
  featuredImage: string
  author: string
  publishedAt: string
  tags: string[]
  category: string
  readTime: number
  featured: boolean
}

export default function ModernBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data.slice(0, 3))) // Show only first 3 blogs
      .catch((error) => console.error("Error fetching blogs:", error))
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <section id="blog_area" className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-teal-400 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm font-medium tracking-wider uppercase">Blog</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest Articles</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, technology, and programming.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:border-teal-500 transition-all duration-300 group h-full">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={blog.featuredImage || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{blog.category}</Badge>
                    </div>

                    {/* Featured Badge */}
                    {blog.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-teal-500 text-gray-900">Featured</Badge>
                      </div>
                    )}

                    {/* Read Time */}
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-1 text-white text-sm bg-gray-900/70 px-2 py-1 rounded">
                        <Clock className="h-3 w-3" />
                        <span>{blog.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                  </div>

                  <CardTitle className="text-xl mb-3 text-white group-hover:text-teal-400 transition-colors line-clamp-2">
                    <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </CardTitle>

                  <CardDescription className="text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</CardDescription>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {blog.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{blog.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <Button variant="ghost" className="p-0 h-auto text-teal-400 hover:text-teal-300" asChild>
                    <Link href={`/blogs/${blog.id}`}>
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/blogs">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
