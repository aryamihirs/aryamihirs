'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, Users, Target, TrendingUp, Briefcase, Award, Zap } from 'lucide-react';
import { Experience } from '@/types/content';

export default function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  useEffect(() => {
    // Load experiences (in a real app, this would be from your data source)
    const loadExperiences = async () => {
      try {
        const response = await fetch('/api/content/experiences');
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error('Failed to load experiences:', error);
        // Fallback data for demo
        setExperiences([
          {
            id: 'ai-search-tool',
            title: 'AI-Powered Search Platform',
            company: 'TechCorp',
            role: 'Senior Product Manager',
            duration: '2023 - Present',
            summary: 'Led the development of an enterprise AI search tool that increased search accuracy by 85%',
            problem: 'Enterprise employees spent 30% of their time searching for information across siloed systems',
            stakeholders: ['Engineering', 'Data Science', 'Sales', 'Customer Success'],
            solution: 'Built a unified AI-powered search platform using RAG architecture and semantic search',
            impact: {
              metrics: ['85% improvement in search accuracy', '30% reduction in time-to-find information', '$2M annual cost savings'],
              testimonials: ['This tool transformed how our team works - VP of Engineering']
            },
            contributions: [
              'Defined product vision and roadmap',
              'Led cross-functional team of 12',
              'Implemented user research program',
              'Drove technical architecture decisions'
            ],
            learnings: [
              'Importance of iterative development with user feedback',
              'Building trust in AI systems through transparency',
              'Balancing technical complexity with user simplicity'
            ],
            tags: ['AI', 'Search', 'Enterprise', 'Product Management'],
            featured: true,
            demoUrl: 'https://demo.example.com',
            prototypeUrl: 'https://figma.com/example'
          }
        ]);
      }
    };

    loadExperiences();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <section className="py-32 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30 rounded-full text-sm text-blue-700 dark:text-blue-300 mb-8"
          >
            <Briefcase className="w-4 h-4" />
            Professional Experience
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Product leadership roles where I&apos;ve built{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">
              AI-powered solutions
            </span>{' '}
            that deliver real business impact
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedExperience(experience)}
            >
              {/* Animated border gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/30 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        {experience.featured && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium"
                          >
                            <Award className="w-3 h-3" />
                            Featured
                          </motion.span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {experience.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {experience.company}
                        </p>
                        <div className="flex items-center text-slate-500 dark:text-slate-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{experience.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                    {experience.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {experience.tags.slice(0, 4).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + tagIndex * 0.1 }}
                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm px-3 py-1 rounded-full font-medium border border-slate-200 dark:border-slate-600"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group"
                  >
                    <span>View Case Study</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2"
                    >
                      <Zap className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Modal for detailed view */}
        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedExperience(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 dark:border-slate-700/30"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-slate-900 dark:text-white mb-3"
                      >
                        {selectedExperience.title}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-600 dark:text-blue-400 font-semibold"
                      >
                        {selectedExperience.role} at {selectedExperience.company}
                      </motion.p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedExperience(null)}
                      className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 text-xl transition-colors"
                    >
                      ✕
                    </motion.button>
                  </div>
                </div>

                <div className="p-8">
                  {/* Problem & Solution Grid */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                            <Target className="w-4 h-4 text-white" />
                          </div>
                          Problem
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedExperience.problem}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          Stakeholders
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedExperience.stakeholders.map((stakeholder, index) => (
                            <motion.span
                              key={stakeholder}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700"
                            >
                              {stakeholder}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          Solution
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedExperience.solution}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          Impact
                        </h3>
                        <div className="space-y-3">
                          {selectedExperience.impact.metrics.map((metric, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-600 dark:text-slate-300">{metric}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Contributions & Learnings Grid */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-bold mb-4">My Contributions</h3>
                      <div className="space-y-3">
                        {selectedExperience.contributions.map((contribution, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600 dark:text-slate-300">{contribution}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-bold mb-4">Key Learnings</h3>
                      <div className="space-y-3">
                        {selectedExperience.learnings.map((learning, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-600 dark:text-slate-300">{learning}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  {(selectedExperience.demoUrl || selectedExperience.prototypeUrl) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-slate-700"
                    >
                      {selectedExperience.demoUrl && (
                        <motion.a
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={selectedExperience.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          View Demo
                        </motion.a>
                      )}
                      {selectedExperience.prototypeUrl && (
                        <motion.a
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={selectedExperience.prototypeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          View Prototype
                        </motion.a>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}