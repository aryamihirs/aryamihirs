'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, Users, Target, TrendingUp, 
  ExternalLink, Github, Globe, Building, Tag,
  Clock, Award, Zap, CheckCircle
} from 'lucide-react';
import { CaseStudy } from '@/types/content';

export default function CaseStudyPage() {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const response = await fetch('/api/content/case-studies');
        const data = await response.json();
        const foundCaseStudy = data.find((cs: CaseStudy) => cs.id === id);
        
        if (foundCaseStudy) {
          setCaseStudy(foundCaseStudy);
        } else {
          setError('Case study not found');
        }
      } catch (err) {
        setError('Failed to load case study');
        console.error('Error fetching case study:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sage-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            {error || 'Case study not found'}
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </button>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  caseStudy.category === 'work' 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                }`}>
                  {caseStudy.category === 'work' ? <Building className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                  {caseStudy.category === 'work' ? 'Experience' : 'Project'}
                </span>
                
                {caseStudy.featured && (
                  <Award className="w-5 h-5 text-amber-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            {caseStudy.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-6 text-neutral-600 dark:text-neutral-400">
            {caseStudy.company && (
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span className="font-semibold">{caseStudy.company}</span>
              </div>
            )}
            
            {caseStudy.role && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{caseStudy.role}</span>
              </div>
            )}
            
            {caseStudy.duration && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{caseStudy.duration}</span>
              </div>
            )}
            
            {caseStudy.teamSize && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Team of {caseStudy.teamSize}</span>
              </div>
            )}
          </div>
          
          <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl">
            {caseStudy.summary}
          </p>
        </motion.div>

        {/* Quick Links */}
        {(caseStudy.githubUrl || caseStudy.liveUrl || caseStudy.demoUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {caseStudy.githubUrl && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            )}
            
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
              >
                <Globe className="w-5 h-5" />
                View Live
              </a>
            )}
            
            {caseStudy.demoUrl && (
              <a
                href={caseStudy.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                View Demo
              </a>
            )}
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Problem & Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {caseStudy.problem && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
                    Problem
                  </h2>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>
              )}
              
              {caseStudy.solution && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    Solution
                  </h2>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Approach & Challenges */}
            {(caseStudy.approach || caseStudy.challenges) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {caseStudy.approach && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      Approach
                    </h2>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {caseStudy.approach}
                    </p>
                  </div>
                )}
                
                {caseStudy.challenges && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      Challenges
                    </h2>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {caseStudy.challenges}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Impact & Results */}
            {caseStudy.impact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-sage-50 dark:bg-sage-900/20 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-sage-600 dark:text-sage-400" />
                  Impact & Results
                </h2>
                
                {caseStudy.impact.metrics && caseStudy.impact.metrics.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {caseStudy.impact.metrics.map((metric, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-sage-600 dark:bg-sage-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 dark:text-neutral-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {caseStudy.impact.testimonials && caseStudy.impact.testimonials.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Testimonials</h3>
                    <div className="space-y-4">
                      {caseStudy.impact.testimonials.map((testimonial, index) => (
                        <blockquote key={index} className="bg-white dark:bg-neutral-800 p-4 rounded-lg border-l-4 border-sage-500">
                          <p className="text-neutral-700 dark:text-neutral-300 italic">&ldquo;{testimonial}&rdquo;</p>
                        </blockquote>
                      ))}
                    </div>
                  </div>
                )}
                
                {caseStudy.impact.achievements && caseStudy.impact.achievements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Key Achievements</h3>
                    <div className="space-y-3">
                      {caseStudy.impact.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700 dark:text-neutral-300">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Contributions & Learnings */}
            {(caseStudy.contributions || caseStudy.learnings) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {caseStudy.contributions && caseStudy.contributions.length > 0 && (
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold mb-4">My Contributions</h2>
                    <div className="space-y-3">
                      {caseStudy.contributions.map((contribution, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 dark:text-neutral-300">{contribution}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {caseStudy.learnings && caseStudy.learnings.length > 0 && (
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold mb-4">Key Learnings</h2>
                    <div className="space-y-3">
                      {caseStudy.learnings.map((learning, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 dark:text-neutral-300">{learning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack */}
            {caseStudy.techStack && caseStudy.techStack.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills */}
            {caseStudy.skills && caseStudy.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <h3 className="text-lg font-semibold mb-4">Skills Applied</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-sage-100 dark:bg-sage-900/50 text-sage-700 dark:text-sage-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tags */}
            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <h3 className="text-lg font-semibold mb-4">Project Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Status</span>
                  <span className={`font-medium ${
                    caseStudy.status === 'active' ? 'text-green-600 dark:text-green-400' :
                    caseStudy.status === 'completed' ? 'text-blue-600 dark:text-blue-400' :
                    'text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {caseStudy.status.charAt(0).toUpperCase() + caseStudy.status.slice(1)}
                  </span>
                </div>
                
                {caseStudy.projectType && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Type</span>
                    <span className="font-medium">{caseStudy.projectType.charAt(0).toUpperCase() + caseStudy.projectType.slice(1)}</span>
                  </div>
                )}
                
                {caseStudy.period && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Duration</span>
                    <span className="font-medium">{caseStudy.period}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}