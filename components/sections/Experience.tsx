'use client';
import ExperienceItem from '@/components/ui/ExperienceItem';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      company: 'Zaag Systems Ltd.',
      position: 'Software Engineer',
      period: 'May 2024 — Present',
      description: [
        'Led frontend for investment platform; improved UX, multilingual support, and workflows',
        'Built modular tour system; optimized loading, responsiveness, and user engagement',
        'Collaborated with team and mentored junior developers',
        'Worked on performance optimization and code quality improvement',
      ],
      tags: ['Next.js', 'React', 'Redux', 'TypeScript', 'Material-UI', 'Jest', 'Node.js', 'Express', 'MongoDB'],
    },
    {
      id: 2,
      company: 'Zaag Systems Ltd.',
      position: 'Junior Software Engineer',
      period: 'Feb 2022 — Apr 2024',
      description: [
        'Implemented APIs and built responsive UI components based on product designs',
        'Collaborated with cross-functional teams in planning and architecture discussions',
        'Contributed to design systems and participated in debugging and QA processes',
      ],
      tags: ['React', 'TypeScript', 'Material-UI', 'Jest'],
    },
    {
      id: 3,
      company: 'Previous Company',
      position: 'Frontend Developer',
      period: 'June 2021 — Jan 2022',
      description: [
        'Developed web applications using React',
        'Collaborated with cross-functional teams to deliver projects on time',
        'Studied WebRTC and Socket.IO for real-time chat feature development',
        'Implemented responsive designs and improved user experience',
      ],
      tags: ['React', 'TailwindCSS', 'Socket.io', 'Bootstrap', 'JavaScript', 'HTML', 'CSS'],
    },
  ];

  return (
    <section id="experience_area" className="py-[70px]" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center flex-wrap justify-between mb-6"
        >
          <h2 className="section_title">Work Experience</h2>
        </motion.div>
        <div className="experience_list">
          {experiences.map((experience, index) => (
            <ExperienceItem key={experience.id} experience={experience} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
