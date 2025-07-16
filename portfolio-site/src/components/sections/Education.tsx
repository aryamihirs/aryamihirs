'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { Education } from '@/types/content';

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    // Load education data (in a real app, this would be from your data source)
    const loadEducation = async () => {
      try {
        const response = await fetch('/api/content/education');
        const data = await response.json();
        setEducation(data);
      } catch (error) {
        console.error('Failed to load education:', error);
        // Fallback data for demo
        setEducation([
          {
            id: 'stanford-cs',
            institution: 'Stanford University',
            degree: 'Master of Science in Computer Science',
            field: 'Artificial Intelligence & Machine Learning',
            period: '2020 - 2022',
            description: 'Focused on AI/ML with coursework in deep learning, computer vision, and natural language processing',
            achievements: [
              'Graduated Summa Cum Laude (GPA: 3.9/4.0)',
              'Teaching Assistant for CS229 (Machine Learning)',
              'Research in Large Language Models',
              'Published 2 papers in AI conferences'
            ],
            coursework: [
              'CS229 - Machine Learning',
              'CS231N - Computer Vision',
              'CS224N - Natural Language Processing',
              'CS332 - Advanced Computer Networks'
            ]
          },
          {
            id: 'berkeley-eecs',
            institution: 'UC Berkeley',
            degree: 'Bachelor of Science',
            field: 'Electrical Engineering & Computer Science',
            period: '2016 - 2020',
            description: 'Strong foundation in computer science fundamentals and electrical engineering principles',
            achievements: [
              'Dean\'s List for 6 semesters',
              'President of Computer Science Society',
              'Winner of UC Berkeley Hackathon 2019',
              'Completed undergraduate thesis on distributed systems'
            ],
            coursework: [
              'CS61A - Structure and Interpretation of Computer Programs',
              'CS61B - Data Structures',
              'CS162 - Operating Systems',
              'CS186 - Database Systems'
            ]
          }
        ]);
      }
    };

    loadEducation();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-200/30 dark:border-indigo-700/30 rounded-full text-sm text-indigo-700 dark:text-indigo-300 mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            Academic Background
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-100 dark:to-purple-100 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Academic foundation that shaped my understanding of technology and innovation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>

          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>

              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} ml-16 md:ml-0`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* Institution Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {edu.institution}
                        </h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                          {edu.degree}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Field and Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{edu.field}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{edu.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {edu.description}
                  </p>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills/Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Continuous Learning
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Education doesn&apos;t stop at graduation. I&apos;m constantly learning through online courses, 
            conferences, and hands-on projects to stay current with the latest in AI and technology.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Online Courses
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regular completion of advanced AI and ML courses from top universities
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Certifications
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Industry certifications in cloud platforms, AI frameworks, and product management
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Conferences
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active participation in AI conferences, product summits, and tech meetups
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}