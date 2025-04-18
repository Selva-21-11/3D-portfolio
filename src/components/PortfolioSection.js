import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const portfolioItems = [
  { id: 1, type: 'image', src: './assets/Imagerender1.png' },
  { id: 5, type: 'image', src: './assets/Imagerender2.png' },
  { id: 6, type: 'image', src: './assets/Imagerender2.png' },
  { id: 2, type: 'video', src: './assets/portfolio/video1.mp4' },
  { id: 3, type: 'poster', src: './assets/portfolio/poster1.jpg' },
  { id: 4, type: '3d', iframe: 'https://your-3d-model-viewer.com/embed/model1' },
];

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.95 },
};

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    filter === 'all' ? portfolioItems : portfolioItems.filter(item => item.type === filter);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : 'auto';
  }, [selectedItem]);

  return (
    <motion.div
      className="portfolio-modern-section"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="portfolio-filter-bar">
        {['all', 'image', 'video', 'poster', '3d'].map(category => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div
        className="portfolio-grid"
        layout
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="wait">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              className="portfolio-card"
              onClick={() => setSelectedItem(item)}
              layout
              variants={itemVariants}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {item.type === 'image' || item.type === 'poster' ? (
                <img src={item.src} alt="" />
              ) : item.type === 'video' ? (
                <video src={item.src} muted autoPlay loop />
              ) : (
                <div className="model-placeholder">3D</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal with animation */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="portfolio-modal"
            onClick={() => setSelectedItem(null)}
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="modal-inner"
              onClick={(e) => e.stopPropagation()}
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {selectedItem.type === '3d' ? (
                <iframe src={selectedItem.iframe} frameBorder="0" allowFullScreen title="3D Model" />
              ) : selectedItem.type === 'video' ? (
                <video src={selectedItem.src} controls autoPlay />
              ) : (
                <img src={selectedItem.src} alt="full" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioSection;
