import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const socialLinks = [
    { icon: '🐦', href: '#', label: 'Twitter' },
    { icon: '💼', href: '#', label: 'LinkedIn' },
    { icon: '🐙', href: '#', label: 'GitHub' },
    { icon: '📧', href: '#', label: 'Email' }
  ];

  return (
    <footer ref={ref} className="py-12 px-4 bg-ml-dark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-6xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h3 className="font-display text-2xl font-bold ml-gradient bg-clip-text text-transparent">
              ML Hooper
            </h3>
            <p className="text-gray-400 mt-2">Empowering the next generation of ML engineers</p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)'
                }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl hover:bg-ml-cyan transition-colors"
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ML Hooper. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;