'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    // Show success message
    alert('Message sent successfully!');
  };

  return (
    <section id="contact_area" ref={ref}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="contact_intro">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl xl:text-4xl font-bold">
                Let's Chat. <br />
                Tell me about your project
              </h2>
              <p className="mt-2">Let's create something together 🤟</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 shadow shadow-teal-400/5 bg-teal-400/5 p-4 mt-4"
            >
              <div className="flex-none bg-teal-400/20 h-10 w-10 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    fill="currentColor"
                    d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"
                  />
                </svg>
              </div>
              <div className="flex-auto flex flex-col">
                <h6>Mail Me At</h6>
                <a
                  className="text-primary"
                  href="mailto:sajalmia.official@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rahman99.asikur&#64;gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 shadow shadow-teal-400/5 bg-teal-400/5 p-4 mt-4"
            >
              <div className="flex-none bg-teal-400/20 h-10 w-10 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    fill="currentColor"
                    d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"
                  />
                </svg>
              </div>
              <div className="flex-auto flex flex-col">
                <h6>Call Me At</h6>
                <a className="text-primary" href="callto:+8801742353078" target="_blank" rel="noopener noreferrer">
                  +8801780846337
                </a>
              </div>
            </motion.div>
          </div>
          <div className="contact">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className=" mb-6"
            >
              Send Message
            </motion.h2>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                  placeholder="Let me know how I can help you"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="py-3 px-5 bg-teal-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
