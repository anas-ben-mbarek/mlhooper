import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ml-dark/50 to-ml-dark/90 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter blur-sm"
        >
          <source src="https://cdn.pixabay.com/vimeo/328940142/robot-24883.mp4?width=1280&hash=8e4f6c4e6d8f4e4f6c4e6d8f4e4f6c4e6d8f4e4f" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="ml-gradient bg-clip-text text-transparent">
            Welcome to ML Hooper
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
        >
          Your gateway to mastering machine learning through comprehensive tutorials, 
          cutting-edge insights, and a structured learning roadmap
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-ml-cyan text-white rounded-full font-semibold glow-border"
          >
            Explore Roadmap
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('articles').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border-2 border-ml-cyan text-ml-cyan rounded-full font-semibold hover:bg-ml-cyan hover:text-white transition-colors"
          >
            Read Articles
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg className="w-6 h-10 text-ml-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 40">
          <rect x="8" y="8" width="8" height="16" rx="4" strokeWidth="2"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Home;