'use client';

import ProgressBar from '@/components/ui/ProgressBar';
import { useInView } from 'react-intersection-observer';

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skill_list = [
    { name: 'React', percentage: 90 },
    { name: 'JavaScript', percentage: 95 },
    { name: 'TypeScript', percentage: 90 },
    { name: 'HTML & CSS', percentage: 95 },
    { name: 'Node.js', percentage: 85 },
    { name: 'Next.js', percentage: 85 },
    { name: 'Tailwind CSS', percentage: 90 },
    { name: 'Git', percentage: 90 },
  ];

  return (
    <section id="skill_area" className="bg-theme-2" ref={ref}>
      <div className="container mx-auto">
        <div className="flex items-center flex-wrap justify-between mb-6">
          <h2 className="section_title">My Skills</h2>
        </div>
        <div className="skill_list">
          {skill_list.map((skill, index) => (
            <ProgressBar key={index} data={skill} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
