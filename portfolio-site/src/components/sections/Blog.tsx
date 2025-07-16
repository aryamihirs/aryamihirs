'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, BookOpen, Sparkles } from 'lucide-react';
import { BlogPost } from '@/types/content';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blog posts (in a real app, this would be from your data source)
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/content/blogs');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
        // Fallback data for demo
        setPosts([
          {
            slug: 'building-ai-agents',
            title: 'Building Production-Ready AI Agents',
            date: '2024-01-15',
            summary: 'A comprehensive guide to building, deploying, and scaling AI agents in production environments',
            tags: ['AI', 'Engineering', 'Product'],
            coverImage: '/images/ai-agents-cover.jpg',
            readTime: '8 min',
            content: 'Full blog content would be here...'
          },
          {
            slug: 'product-management-ai',
            title: 'Product Management in the Age of AI',
            date: '2024-01-10',
            summary: 'How AI is transforming product management and what PMs need to know to stay ahead',
            tags: ['Product Management', 'AI', 'Strategy'],
            coverImage: '/images/pm-ai-cover.jpg',
            readTime: '6 min',
            content: 'Full blog content would be here...'
          },
          {
            slug: 'rag-architecture-guide',
            title: 'Complete Guide to RAG Architecture',
            date: '2024-01-05',
            summary: 'Deep dive into Retrieval-Augmented Generation systems and how to build them effectively',
            tags: ['AI', 'RAG', 'Architecture'],
            coverImage: '/images/rag-guide-cover.jpg',
            readTime: '10 min',
            content: 'Full blog content would be here...'
          }
        ]);
      }
    };

    loadPosts();
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-emerald-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30 rounded-full text-sm text-emerald-700 dark:text-emerald-300 mb-6"
          >
            <BookOpen className="w-4 h-4" />
            Latest Insights
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-emerald-900 to-blue-900 dark:from-white dark:via-emerald-100 dark:to-blue-100 bg-clip-text text-transparent">
              Blog & Insights
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Thoughts on AI, product management, and building{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 font-semibold">
              the future of technology
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
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative cursor-pointer"
            >
              {/* Animated border gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-teal-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-slate-700/30">
                {/* Cover Image */}
                <div className="h-52 bg-gradient-to-br from-emerald-500 to-blue-500 relative overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        // Fallback to gradient if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                      <div className="text-white text-center">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        >
                          <BookOpen className="w-16 h-16 mx-auto mb-3 opacity-70" />
                        </motion.div>
                        <p className="text-sm opacity-70 font-medium">Article Preview</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Reading Time Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full flex items-center font-medium"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + tagIndex * 0.1 }}
                        className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-sm px-3 py-1 rounded-full font-medium border border-emerald-200 dark:border-emerald-700/50"
                      >
                        {tag}
                      </motion.span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-slate-500 dark:text-slate-400 text-sm py-1">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(post.date)}
                    </div>

                    <motion.div
                      className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Read Article
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Enhanced Newsletter Subscription */}
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30 rounded-full text-sm text-emerald-700 dark:text-emerald-300 mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Weekly Insights
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">ahead of the curve</span>
          </h3>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Subscribe to my newsletter for the latest insights on AI, product management, and emerging technologies
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div className="relative group">
              {/* Animated border gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl">
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-lg font-medium focus:outline-none"
                    suppressHydrationWarning={true}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="m-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                    suppressHydrationWarning={true}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Join 1,000+ subscribers • Unsubscribe anytime • No spam, ever
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}