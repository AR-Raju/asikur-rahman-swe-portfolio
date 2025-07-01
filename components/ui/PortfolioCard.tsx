"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface PortfolioCardProps {
  item: {
    id: number
    title: string
    description: string
    image: string
    link: string
    technologies: string[]
  }
  index: number
  inView: boolean
}

export default function PortfolioCard({ item, index, inView }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48">
        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-gray-400 mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.technologies.map((tech, i) => (
            <span key={i} className="bg-teal-400/20 text-teal-400 text-xs px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-2 px-4 bg-teal-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
        >
          View Project
        </a>
      </div>
    </motion.div>
  )
}
