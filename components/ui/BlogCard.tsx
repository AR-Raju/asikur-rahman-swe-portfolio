"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"

interface BlogCardProps {
  post: {
    id: number
    title: string
    excerpt: string
    featuredImage: string
    date: string
    url: string
  }
  index: number
  inView: boolean
}

export default function BlogCard({ post, index, inView }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48">
        <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-400 mb-2">{formatDate(post.date)}</div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-2 px-4 bg-teal-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
        >
          Read More
        </a>
      </div>
    </motion.div>
  )
}
