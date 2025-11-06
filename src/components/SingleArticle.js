import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const SingleArticle = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${window.mlHooper.apiUrl}posts?slug=${slug}`);
      if (response.data.length > 0) {
        setPost(response.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-ml-dark">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ml-cyan"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-ml-dark">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <Link to="/" className="text-ml-cyan hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-ml-dark text-gray-900 dark:text-white"
    >
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <Link 
          to="/"
          className="inline-flex items-center mb-8 text-ml-cyan hover:text-ml-cyan/80 transition-colors"
        >
          ← Back to Home
        </Link>
        
        {post.featured_image_url && (
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src={post.featured_image_url}
            alt={post.title.rendered}
            className="w-full h-96 object-cover rounded-xl mb-8"
          />
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </motion.div>
  );
};

export default SingleArticle;