'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Calendar, Users, Target, TrendingUp, 
  Briefcase, Award, Zap, Filter, Building, Tag,
  Github, Globe, ArrowRight
} from 'lucide-react';
import { CaseStudy } from '@/types/content';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [companies, setCompanies] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        const response = await fetch('/api/content/case-studies');
        const data = await response.json();
        setCaseStudies(data);
        
        // Extract unique companies and tags
        const uniqueCompanies = [...new Set(data.map((cs: CaseStudy) => cs.company).filter(Boolean))];
        const uniqueTags = [...new Set(data.flatMap((cs: CaseStudy) => cs.tags))];
        
        setCompanies(uniqueCompanies);
        setTags(uniqueTags);
      } catch (error) {
        console.error('Failed to load case studies:', error);
      }
    };

    loadCaseStudies();
  }, []);

  const filteredCaseStudies = caseStudies.filter(cs => {
    if (activeFilter === 'all') return true;
    if (activeFilter.startsWith('company:')) {
      return cs.company === activeFilter.replace('company:', '');
    }
    if (activeFilter.startsWith('tag:')) {
      return cs.tags.includes(activeFilter.replace('tag:', ''));
    }
    return cs.category === activeFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 px-4 bg-white dark:bg-neutral-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sage-300 dark:bg-sage-700 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-300 dark:bg-blue-700 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 dark:bg-sage-900 border border-sage-200 dark:border-sage-800 rounded-full text-sm text-sage-700 dark:text-sage-300 mb-6"
          >
            <Briefcase className="w-4 h-4" />
            Case Studies & Projects
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            My Work
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Deep dives into products I&apos;ve built, problems I&apos;ve solved, and impact I&apos;ve created
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {/* Category filters */}
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600'
              }`}
            >
              All Work
            </button>
            
            <button
              onClick={() => setActiveFilter('work')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'work'
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600'
              }`}
            >
              Experience
            </button>
            
            <button
              onClick={() => setActiveFilter('project')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'project'
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600'
              }`}
            >
              Projects
            </button>

            {/* Company dropdown */}
            {companies.length > 0 && (
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600">
                  <Building className="w-4 h-4" />
                  Companies
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {companies.map(company => (
                    <button
                      key={company}
                      onClick={() => setActiveFilter(`company:${company}`)}
                      className="block w-full text-left px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCaseStudies.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => setSelectedCaseStudy(caseStudy)}
            >
              <div className="relative h-full">
                {/* Card glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                
                <div className="relative h-full bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      caseStudy.category === 'work' 
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                    }`}>
                      {caseStudy.category === 'work' ? <Briefcase className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                      {caseStudy.category === 'work' ? 'Experience' : 'Project'}
                    </span>
                    
                    {caseStudy.featured && (
                      <Award className="w-5 h-5 text-amber-500" />
                    )}
                  </div>

                  {/* Title and company */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {caseStudy.title}
                  </h3>
                  
                  {caseStudy.company && (
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {caseStudy.company}
                    </p>
                  )}

                  {/* Summary */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                    {caseStudy.summary}
                  </p>

                  {/* Impact metrics preview */}
                  {caseStudy.impact?.metrics && caseStudy.impact.metrics.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        {caseStudy.impact.metrics[0]}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {caseStudy.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 text-slate-500">
                        +{caseStudy.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCaseStudy(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-slate-900 rounded-2xl max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {selectedCaseStudy.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm">
                        {selectedCaseStudy.company && (
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {selectedCaseStudy.company}
                          </span>
                        )}
                        {selectedCaseStudy.duration && (
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {selectedCaseStudy.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCaseStudy(null)}
                      className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-8">
                  {/* Summary */}
                  <div>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedCaseStudy.summary}
                    </p>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedCaseStudy.problem && (
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-red-600 dark:text-red-400" />
                          Problem
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          {selectedCaseStudy.problem}
                        </p>
                      </div>
                    )}
                    
                    {selectedCaseStudy.solution && (
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                          Solution
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                          {selectedCaseStudy.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Impact */}
                  {selectedCaseStudy.impact && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        Impact & Results
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedCaseStudy.impact.metrics?.map((metric, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                            <span className="text-slate-700 dark:text-slate-300">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {selectedCaseStudy.techStack && selectedCaseStudy.techStack.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCaseStudy.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                    {selectedCaseStudy.githubUrl && (
                      <a
                        href={selectedCaseStudy.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        <Github className="w-5 h-5" />
                        View on GitHub
                      </a>
                    )}
                    {selectedCaseStudy.liveUrl && (
                      <a
                        href={selectedCaseStudy.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        <Globe className="w-5 h-5" />
                        View Live Demo
                      </a>
                    )}
                    {selectedCaseStudy.demoUrl && (
                      <a
                        href={selectedCaseStudy.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}