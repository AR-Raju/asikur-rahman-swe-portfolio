"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ModernFooter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800" ref={ref}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Asikur Rahman</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Senior Software Engineer passionate about creating exceptional digital experiences. Let's build something
              amazing together.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/AR-Raju"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Github className="h-5 w-5 text-gray-400 group-hover:text-gray-900" />
              </a>
              <a
                href="https://www.linkedin.com/in/asikurrahman-raju/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-gray-900" />
              </a>
              <a
                href="mailto:rahman99.asikur@gmail.com"
                className="w-10 h-10 bg-gray-800 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-gray-900" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#hero_area" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#experience_area" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#skills_area" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:rahman99.asikur@gmail.com"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  rahman99.asikur@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+8801780846337" className="text-gray-400 hover:text-teal-400 transition-colors">
                  +880 178 084 6337
                </a>
              </li>
              <li>
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm">© {currentYear} Asikur Rahman. All rights reserved.</p>

          <Button
            onClick={scrollToTop}
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-400 hover:text-white hover:border-teal-500 bg-transparent"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to Top
          </Button>
        </motion.div>
      </div>
    </footer>
  )
}
