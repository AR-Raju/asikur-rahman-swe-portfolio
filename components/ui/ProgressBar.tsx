'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  data: {
    name: string;
    percentage: number;
  };
  index: number;
  inView: boolean;
}

export default function ProgressBar({ data, index, inView }: ProgressBarProps) {
  const colors = ['bg-green-500', 'bg-violet-500', 'bg-yellow-400'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium">{data.name}</span>
        <span className="text-sm font-medium">{data.percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${data.percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 * index }}
          className={`${colors[index % 3]} h-2.5 rounded-full`}
        ></motion.div>
      </div>
    </motion.div>
  );
}
