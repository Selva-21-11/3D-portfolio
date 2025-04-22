import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const portfolioItems = [
  { id: 1, type: 'image', src: './assets/Imagerender1.webp' },
  { id: 5, type: 'image', src: './assets/Imagerender2.webp' },
  { id: 6, type: 'image', src: './assets/Imagerender2.webp' },
  { id: 7, type: 'image', src: './assets/Imagerender2.webp' },
  {
    id: 2,
    type: 'video',
    iframe: 'https://www.youtube.com/embed/tZc1T28Oe20?autoplay=1&mute=0&controls=0&modestbranding=0&rel=0&showinfo=1',
    thumbnail: 'https://img.youtube.com/vi/tZc1T28Oe20/hqdefault.jpg', // YouTube thumbnail URL
  },
  {
    id: 8,
    type: 'video',
    iframe: 'https://www.youtube.com/embed/895sufvfnA0?autoplay=1&mute=0&controls=0&modestbranding=0&rel=0&showinfo=1',
    thumbnail: 'https://img.youtube.com/vi/895sufvfnA0/hqdefault.jpg', // YouTube thumbnail URL
  },
  {
    id: 9,
    type: 'video',
    iframe: 'https://www.youtube.com/embed/8fPSmTUGj1Q?autoplay=1&mute=0&controls=0&modestbranding=0&rel=0&showinfo=1',
    thumbnail: 'https://img.youtube.com/vi/8fPSmTUGj1Q/hqdefault.jpg', // YouTube thumbnail URL
  },
  {
    id: 10,
    type: 'video',
    iframe: 'https://www.youtube.com/embed/EVWK63G3Lf8?autoplay=1&mute=0&controls=0&modestbranding=0&rel=0&showinfo=1',
    thumbnail: 'https://img.youtube.com/vi/EVWK63G3Lf8/hqdefault.jpg', // YouTube thumbnail URL
  },
  //{ id: 3, type: 'poster', src: './assets/SportsPoster.jpg' },
  { id: 4, type: '3d', iframe: 'https://v3d.net/18q9', thumbnail: './assets/BMW-Config.webp' },
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
        <button
          key="all"
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          key="image"
          className={`filter-btn ${filter === 'image' ? 'active' : ''}`}
          onClick={() => setFilter('image')}
        >
          Image
        </button>
        <button
          key="video"
          className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
          onClick={() => setFilter('video')}
        >
          Video
        </button>
        <button
          key="poster"
          className={`filter-btn ${filter === 'poster' ? 'active' : ''}`}
          onClick={() => setFilter('poster')}
        >
          Poster
        </button>
        <button
          key="3d"
          className={`filter-btn ${filter === '3d' ? 'active' : ''}`}
          onClick={() => setFilter('3d')}
        >
          3D
        </button>
      </div>

      <motion.div
        className="portfolio-grid"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="wait">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              className="portfolio-card"
              onClick={() => {
                if (item.type === '3d') {
                  window.open(item.iframe, '_blank');
                } else {
                  setSelectedItem(item);
                }
              }}               
              variants={itemVariants}
              transition={{ duration: 0.4, ease: 'easeInOut' }} // Subtle ease-in-out transition
            >
              {item.type === 'image' || item.type === 'poster' ? (
                <img src={item.src} alt="" />
              ) : item.type === 'video' || item.type === '3d' ? (
                <div className="thumbnail-wrapper">
                  <img src={item.thumbnail} alt={`${item.type} thumbnail`} />
                  {item.type === '3d' && <div className="model-tag">3D</div>}
                  {item.type === 'video' && <div className="play-icon">▶</div>}
                </div>
              ) : null}
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
              {selectedItem.type === '3d' || selectedItem.type === 'video' ? (
                <iframe
                  src={selectedItem.iframe}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={selectedItem.type === '3d' ? '3D Model' : 'Video Player'}
                />
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
