'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown, Search, Send } from 'lucide-react';

const phrases = ['build products', 'ship AI solutions', 'lead teams', 'solve problems', 'drive growth'];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResponse, setSearchResponse] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      const data = await response.json();
      setSearchResponse(data.response || 'No response available');
    } catch (error) {
      setSearchResponse('Sorry, I encountered an error while searching. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-neutral-50 dark:bg-neutral-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>
      
      {/* Minimal background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-200/20 dark:bg-sage-800/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl" />

      {/* Main content container */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Hero section with profile and intro */}
        <div className="flex-1 flex items-center justify-center px-8 py-20">
          <div className="max-w-6xl w-full mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Profile image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center md:justify-end"
              >
                <div className="relative">
                  <div className="w-80 h-80 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                      <div className="w-72 h-72 rounded-full bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900 dark:to-sage-800 flex items-center justify-center text-neutral-800 dark:text-neutral-100 text-6xl font-bold shadow-inner">
                        AS
                      </div>
                    </div>
                  </div>
                  {/* Subtle accent ring */}
                  <div className="absolute inset-0 rounded-full border border-sage-300/50 dark:border-sage-700/50"></div>
                </div>
              </motion.div>

              {/* Introduction text */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center md:text-left"
              >
                <h1 className="text-4xl md:text-6xl font-light text-neutral-800 dark:text-neutral-100 mb-6">
                  Hi, I am{' '}
                  <span className="font-semibold text-neutral-900 dark:text-neutral-50">
                    Arya Singh
                  </span>
                </h1>
                
                <div className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  A Product Manager who can{' '}
                  <div className="inline-block min-w-[200px] text-left">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentPhrase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-sage-700 dark:text-sage-400 font-medium"
                      >
                        {phrases[currentPhrase]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
                  I build AI-powered products that solve real problems and drive business growth.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Search section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-8 pb-20"
        >
          <div className="max-w-4xl mx-auto">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything about Arya!"
                  className="w-full pl-12 pr-16 py-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-300 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-sage-600 hover:bg-sage-700 rounded-xl text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>

            {/* Response area */}
            {searchResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Response:</h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{searchResponse}</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      
      {/* Large animated blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
      />

      {/* Additional smaller accents */}
      <motion.div
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-2xl"
      />
    </section>
  );
}