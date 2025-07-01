import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: number
  name: string
  shortDescription: string
  thumbnail: string
  techStack: string[]
  liveUrl: string
  githubUrl: string
  status: string
  featured: boolean
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch projects")
  }

  return res.json()
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of projects I've worked on, showcasing my skills and experience in web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-800 border-gray-700 hover:border-teal-500 transition-colors">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={project.status === "Live" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-teal-500 text-gray-900">Featured</Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                <CardDescription className="text-gray-400 mb-4">{project.shortDescription}</CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techStack.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/projects/${project.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
