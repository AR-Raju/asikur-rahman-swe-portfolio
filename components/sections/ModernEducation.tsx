"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
  location: string;
  gpa: string;
}

export default function ModernEducation() {
  const [education, setEducation] = useState<Education[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch("/api/education")
      .then(res => res.json())
      .then(data => setEducation(data))
      .catch(error => console.error("Error fetching education:", error));
  }, []);

  return (
    <section id="education_area" className="py-20 bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-teal-400 mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-sm font-medium tracking-wider uppercase">Education</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Academic Background</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My educational journey that shaped my technical foundation and problem-solving skills.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-blue-500"></div>

            <div className="space-y-12">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-gray-900" />
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 bg-gray-900 border-gray-700 hover:border-teal-500 transition-colors">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                          <h4 className="text-xl text-teal-400 mb-2">{edu.institution}</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge variant="outline" className="w-fit">
                            <Calendar className="h-3 w-3 mr-1" />
                            {edu.period}
                          </Badge>
                          <Badge variant="secondary" className="w-fit">
                            <MapPin className="h-3 w-3 mr-1" />
                            {edu.location}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-400 leading-relaxed mb-4">{edu.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-medium">GPA: {edu.gpa}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
