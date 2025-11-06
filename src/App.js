import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Roadmap from './components/Roadmap';
import Articles from './components/Articles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SingleArticle from './components/SingleArticle';
import Loader from './components/Loader';
import useTheme from './hooks/useTheme';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Router>
      <div className={theme}>
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" />
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-white dark:bg-ml-dark text-gray-900 dark:text-white transition-colors duration-300"
            >
              <Routes>
                <Route path="/post/:slug" element={<SingleArticle />} />
                <Route path="*" element={
                  <>
                    <Navigation theme={theme} toggleTheme={toggleTheme} />
                    <Home />
                    <About />
                    <Roadmap />
                    <Articles />
                    <Contact />
                    <Footer />
                  </>
                } />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;