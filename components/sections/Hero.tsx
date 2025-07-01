'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [animationState, setAnimationState] = useState(0);
  const [hueState, setHueState] = useState(false);
  const grettingText = "Hello, I'm Asikur Rahman,".split('');
  const titleText = 'Professional Software Engineer'.split('');

  useEffect(() => {
    setAnimationState(1);
  }, []);

  const getDelay = (index: number, length: number) => {
    return index * 50;
  };

  return (
    <section id="hero_area" className="bg-theme-2">
      <div className="container mx-auto">
        <h2 className="hero_title">
          <span className="hero_title_sub">
            {grettingText.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 + i * 0.05, duration: 0.5 }}
                onAnimationComplete={() => i === grettingText.length - 1 && setHueState(!hueState)}
              >
                {letter}
              </motion.span>
            ))}
          </span>
          <br />
          {titleText.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + getDelay(i, titleText.length) / 1000, duration: 0.5 }}
              onAnimationComplete={() => i === titleText.length - 1 && setHueState(!hueState)}
            >
              {letter}
            </motion.span>
          ))}
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 3.2 }}
          className="hero_illustrator"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 3.2 }}
          className="hero_avatar"
        >
          <div className="hero_avatar_img">
            <Image src="/assets/avatar.jpg" alt="Asikur Rahman" width={260} height={260} />
          </div>
        </motion.div>
        <div className="hero_details">
          {/* Professional Definition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            At this time I have more than three years of working experiences as Software Engineer. Currently I am
            working as a Software Engineer at Zaag Systems Ltd. for three years. My responsibility at Zaag Systems Ltd.,
            improves and implement new features at their saas platform, lead UI products.
          </motion.p>

          {/* Self Definition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1.0 }}
          >
            Well, I would describe myself as somebody who is positive, happy and also resilient. I would say I'm the
            type of person who always puts the needs of a team first. I am a creative problem solver. I always embraces
            positive change. I am trustworthy and reliable.
          </motion.p>

          {/* Personal Life */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.0 }}
          >
            Outside of computer, I like to keep myself fit and active. Which in turn improves my concentration levels
            whilst.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 1.0 }}
            className="social_media"
          >
            <li>
              <a target="_blank" href="https://www.linkedin.com/in/asikurrahman-raju/" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://github.com/AR-Raju" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </a>
            </li>
          </motion.ul>
        </div>
      </div>
      <div className="scroll-down">
        <span></span>
      </div>
    </section>
  );
}
