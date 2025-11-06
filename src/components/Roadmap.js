import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Roadmap = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const roadmapSteps = [
    { 
      phase: 'Foundation',
      items: ['Python Basics', 'Mathematics for ML', 'Statistics & Probability'],
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      phase: 'Core ML',
      items: ['Supervised Learning', 'Unsupervised Learning', 'Feature Engineering'],
      color: 'from-cyan-500 to-green-500'
    },
    { 
      phase: 'Deep Learning',
      items: ['Neural Networks', 'CNNs', 'RNNs & LSTMs'],
      color: 'from-green-500 to-purple-500'
    },
    { 
      phase: 'Advanced',
      items: ['Transformers', 'GANs', 'Reinforcement Learning'],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="roadmap" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="ml-gradient bg-clip-text text-transparent">ML Learning Roadmap</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your structured path to machine learning mastery
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-ml-cyan to-purple-500 opacity-30" />

          {roadmapSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
            >
              <div className="relative w-full md:w-5/12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-xl bg-gradient-to-r ${step.color} bg-opacity-10 backdrop-blur-sm border border-gray-200 dark:border-gray-700`}
                >
                  {/* Node */}
                  <div className={`absolute top-1/2 ${index % 2 === 0 ? '-right-8' : '-left-8'} transform -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${step.color} animate-pulse`} />
                  
                  <h3 className="font-display text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-ml-cyan to-purple-500">
                    {step.phase}
                  </h3>
                  <div className="space-y-2">
                    {step.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-ml-cyan" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;