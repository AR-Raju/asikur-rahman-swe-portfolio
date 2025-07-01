'use client';

import { motion } from 'framer-motion';

interface ExperienceItemProps {
  experience: {
    id: number;
    company: string;
    position: string;
    period: string;
    description: string[];
    tags?: string[];
  };
  index: number;
  inView: boolean;
}

export default function ExperienceItem({ experience, index, inView }: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="mb-12 relative"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Left: Period */}
        <div className="sm:w-1/4 text-md text-gray-400 whitespace-nowrap">{experience.period}</div>

        {/* Right: Company, Role, Description */}
        <div className="sm:w-3/4 space-y-2">
          <div>
            <h3 className="text-lg font-semibold">
              {experience.position} - <span className="text-primary">{experience.company}</span>
            </h3>
          </div>

          <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
            {experience.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {experience.tags && experience.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {experience.tags.map((tag, i) => (
                <span key={i} className="bg-teal-800 text-xs text-white px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
