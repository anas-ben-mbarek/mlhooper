import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Articles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${window.mlHooper.apiUrl}posts?per_page=6`);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  return (
    <section id="articles" className="py-20 px-4">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="ml-gradient bg-clip-text text-transparent">Latest Articles</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore our collection of machine learning tutorials and insights
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ml-cyan"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/post/${post.slug}`}>
                  {post.featured_image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title.rendered}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 
                      className="font-semibold text-xl mb-2 group-hover:text-ml-cyan transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div 
                      className="text-gray-600 dark:text-gray-400 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <motion.span
                      className="inline-block mt-4 text-ml-cyan font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      Read More →
                    </motion.span>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-ml-cyan transition-colors rounded-xl" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-ml-cyan text-white rounded-full font-semibold hover:shadow-lg hover:shadow-ml-cyan/50 transition-all"
            >
              View All Articles
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Articles;