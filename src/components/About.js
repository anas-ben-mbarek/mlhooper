import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const features = [
    { icon: '🤖', title: 'AI Insights', desc: 'Latest developments in artificial intelligence' },
    { icon: '📊', title: 'Data Science', desc: 'Practical data analysis techniques' },
    { icon: '🧠', title: 'Deep Learning', desc: 'Neural networks and advanced models' },
    { icon: '🚀', title: 'Career Growth', desc: 'Industry trends and opportunities' }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="ml-gradient bg-clip-text text-transparent">About ML Hooper</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ML Hooper is your comprehensive platform for mastering machine learning. We provide 
            cutting-edge tutorials, in-depth articles, and a structured roadmap to guide you through 
            your AI journey, from beginner concepts to advanced implementations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)' }}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;