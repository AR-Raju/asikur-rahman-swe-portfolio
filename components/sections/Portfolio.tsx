'use client';

import PortfolioCard from '@/components/ui/PortfolioCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPortfolioList([
        {
          id: 1,
          title: 'KloverCloud Platform',
          description: 'A cloud-native application platform for Kubernetes',
          image: '/placeholder.svg?height=300&width=400',
          link: 'https://klovercloud.com',
          technologies: ['Angular', 'TypeScript', 'Tailwind CSS'],
        },
        {
          id: 2,
          title: 'TechIncent Blog',
          description: 'A tech blog focused on web development tutorials',
          image: '/placeholder.svg?height=300&width=400',
          link: 'https://techincent.com',
          technologies: ['Next.js', 'React', 'Tailwind CSS'],
        },
        {
          id: 3,
          title: 'E-commerce Dashboard',
          description: 'Admin dashboard for managing e-commerce operations',
          image: '/placeholder.svg?height=300&width=400',
          link: '#',
          technologies: ['React', 'Material UI', 'Chart.js'],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <section id="portfolio_area" className="pt-[70px] pb-[80px]" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center flex-wrap justify-between mb-5"
        >
          <h2 className="section_title">Explore Latest Projects</h2>
          <a
            className="py-2 px-4 bg-teal-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
            target="_blank"
            href="https://techincent.com/works"
            rel="noopener noreferrer"
          >
            View All
          </a>
        </motion.div>

        {isLoading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : errorMsg ? (
          <div className="border border-red-400 px-4 py-3 rounded-lg relative" role="alert">
            <span>{errorMsg}!</span>
            <a className="ml-4 underline" href="https://techincent.com/works">
              Check Here
            </a>
            <span> to visit portfolio</span>
          </div>
        ) : portfolioList.length === 0 ? (
          <h4>Portfolio items not found!</h4>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
            {portfolioList.map((item, index) => (
              <PortfolioCard key={item.id} item={item} index={index} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
