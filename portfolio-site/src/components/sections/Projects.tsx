'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Code2, Zap, Rocket } from 'lucide-react';
import { Project } from '@/types/content';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects (in a real app, this would be from your data source)
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/content/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
        // Fallback data for demo
        setProjects([
          {
            id: 'rag-agent',
            title: 'Open Source RAG Agent Framework',
            description: 'Built a flexible RAG agent framework for conversational AI applications',
            techStack: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
            githubUrl: 'https://github.com/username/rag-agent',
            liveUrl: 'https://rag-demo.example.com',
            status: 'active',
            highlights: [
              '10k+ GitHub stars',
              'Used by 50+ companies',
              'Modular architecture for easy customization'
            ],
            screenshots: ['/images/rag-agent-1.png', '/images/rag-agent-2.png'],
            tags: ['AI', 'RAG', 'Open Source', 'Python'],
            featured: true
          }
        ]);
      }
    };

    loadProjects();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'completed':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'archived':
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  return (
    <section className="py-32 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/30 rounded-full text-sm text-purple-300 mb-8"
          >
            <Code2 className="w-4 h-4" />
            Featured Projects
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Open source projects and technical builds that showcase my{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
              engineering skills
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Animated border gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
                {/* Project Image/Screenshot */}
                <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                  {project.screenshots && project.screenshots[0] ? (
                    <img
                      src={project.screenshots[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to gradient if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <div className="text-white text-center">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Code2 className="w-16 h-16 mx-auto mb-3 opacity-70" />
                        </motion.div>
                        <p className="text-sm opacity-70 font-medium">Project Preview</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Status badge */}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(project.status)}`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </motion.span>

                  {project.featured && (
                    <motion.span
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3" />
                      Featured
                    </motion.span>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + techIndex * 0.1 }}
                        className="bg-slate-700/70 text-slate-300 text-sm px-3 py-1 rounded-full font-medium border border-slate-600/50"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-slate-400 text-sm py-1">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">
                      Key Achievements:
                    </h4>
                    <div className="space-y-2">
                      {project.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                        <motion.div
                          key={highlightIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + highlightIndex * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-slate-300">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-semibold transition-colors flex-1 justify-center border border-slate-600"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </motion.a>
                    )}

                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex-1 justify-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>

                  {/* GitHub Stats */}
                  {project.githubUrl && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center gap-6 pt-4 border-t border-slate-700/50"
                    >
                      <div className="flex items-center text-sm text-slate-400">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        <span>1.2k</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-400">
                        <GitFork className="w-4 h-4 mr-2 text-slate-400" />
                        <span>234</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/30 rounded-full text-sm text-purple-300 mb-8"
          >
            <Rocket className="w-4 h-4" />
            More Coming Soon
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Want to see <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">more projects</span>?
          </h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Check out my GitHub for more open source projects, contributions, and experimental builds
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Github className="w-5 h-5 mr-3" />
                Visit My GitHub
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-flex items-center px-8 py-4 border-2 border-purple-400/50 text-purple-300 rounded-2xl font-semibold hover:border-purple-400 hover:bg-purple-400/10 transition-all"
            >
              <ExternalLink className="w-5 h-5 mr-3" />
              Let&apos;s Collaborate
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}