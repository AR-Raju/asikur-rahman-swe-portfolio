"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight, Folder } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: number
  name: string
  shortDescription: string
  thumbnail: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  status: string
}

export default function ModernProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 3))) // Show only first 3 projects
      .catch((error) => console.error("Error fetching projects:", error))
  }, [])

  return (
    <section id="projects_area" className="py-20 bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-teal-400 mb-4">
            <Folder className="h-6 w-6" />
            <span className="text-sm font-medium tracking-wider uppercase">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work and projects that demonstrate my skills and expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-gray-900 border-gray-700 hover:border-teal-500 transition-all duration-300 group h-full">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant={project.status === "Live" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-teal-500 text-gray-900">Featured</Badge>
                      </div>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-1">
                  <CardTitle className="text-xl mb-3 text-white group-hover:text-teal-400 transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                    {project.shortDescription}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button className="w-full group/btn" asChild>
                    <Link href={`/projects/${project.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
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
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
