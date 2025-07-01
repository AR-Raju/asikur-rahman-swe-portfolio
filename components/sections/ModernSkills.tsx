"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code, Palette, Database, Wrench } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Skill {
  id: number
  name: string
  level: number
  category: string
  logo: string
}

const categoryIcons = {
  Frontend: Palette,
  Backend: Database,
  Language: Code,
  Database: Database,
  Tools: Wrench,
}

const categoryColors = {
  Frontend: "from-pink-500 to-rose-500",
  Backend: "from-green-500 to-emerald-500",
  Language: "from-blue-500 to-cyan-500",
  Database: "from-purple-500 to-violet-500",
  Tools: "from-orange-500 to-amber-500",
}

export default function ModernSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error))
  }, [])

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <section id="skills_area" className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-teal-400 mb-4">
            <Code className="h-6 w-6" />
            <span className="text-sm font-medium tracking-wider uppercase">Skills & Technologies</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Expertise</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code
            const gradientColor = categoryColors[category as keyof typeof categoryColors] || "from-gray-500 to-gray-600"

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              >
                <Card className="bg-gray-800 border-gray-700 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradientColor} flex items-center justify-center`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{category}</h3>
                        <Badge variant="outline" className="mt-1">
                          {categorySkills.length} skills
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 relative">
                                <Image
                                  src={skill.logo || "/placeholder.svg"}
                                  alt={skill.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-white font-medium">{skill.name}</span>
                            </div>
                            <span className="text-teal-400 font-bold">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2 bg-gray-700" />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
