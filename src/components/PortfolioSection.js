import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = ['all', 'image renders', 'video renders', 'posters', '3d'];

const portfolioItems = [
  { id: 1, type: 'image renders', src: './assets/Imagerender1.webp' },
  { id: 5, type: 'image renders', src: './assets/Imagerender2.webp' },
  { id: 6, type: 'image renders', src: './assets/Imagerender2.webp' },
  { id: 7, type: 'image renders', src: './assets/Imagerender2.webp' },
  {
    id: 2,
    type: 'video renders',
    iframe: 'https://www.youtube.com/embed/tZc1T28Oe20?autoplay=1&mute=0&controls=0&modestbranding=0&rel=0&showinfo=1',
    thumbnail: '',
  },
  {
    id: 8,
    type: 'video renders',
    iframe: 'https://www.youtube.com/embed/895sufvfnA0?autoplay=1&mute=0&controls=0&modestbranding=0&rel=0&showinfo=1',
    thumbnail: './assets/Stromscene.png',
  },
  {
    id: 9,
    type: 'video renders',
    iframe: 'https://www.youtube.com/embed/8fPSmTUGj1Q?autoplay=1&mute=0&controls=0&modestbranding=0&rel=0&showinfo=1',
    thumbnail: './assets/perfume.png',
  },
  {
    id: 10,
    type: 'video renders',
    iframe: 'https://www.youtube.com/embed/EVWK63G3Lf8?autoplay=1&mute=0&controls=0&modestbranding=0&rel=0&showinfo=1',
    thumbnail: './assets/Motoranimationthumb.png',
  },
  // { id: 3, type: 'posters', src: './assets/SportsPoster.jpg' },
  { id: 4, type: '3d', iframe: 'https://v3d.net/18s8', thumbnail: './assets/BMW-Config.webp' },
  { id: 11, type: '3d', iframe: 'https://v3d.net/18s1', thumbnail: './assets/Bevelgear.png' },
];

const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : 'auto';
  }, [selectedItem]);

  const filteredItems = useMemo(
    () => (filter === 'all' ? portfolioItems : portfolioItems.filter(item => item.type === filter)),
    [filter]
  );

  const renderItemContent = (item) => {
    if (item.type === 'image renders' || item.type === 'poster') {
      return <img src={item.src} alt={`${item.type} preview`} loading="lazy" />;
    }

    return (
      <div className="thumbnail-wrapper">
        <img src={item.thumbnail} alt={`${item.type} thumbnail`} loading="lazy" />
        {item.type === 'video renders' && <div className="play-icon">▶</div>}
        {item.type === '3d' && <div className="model-tag">3D</div>}
      </div>
    );
  };

  return (
    <motion.div
      className="portfolio-modern-section"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Filter Bar */}
      <div className="portfolio-filter-bar">
        {FILTERS.map((type) => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid Items */}
      <motion.div
        className="portfolio-grid"
        variants={{
          animate: { transition: { staggerChildren: 0.1 } },
        }}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="wait">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              className="portfolio-card"
              onClick={() =>
                item.type === '3d' ? window.open(item.iframe, '_blank') : setSelectedItem(item)
              }
              variants={{
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.95 },
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {renderItemContent(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="portfolio-modal"
            onClick={() => setSelectedItem(null)}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="modal-inner"
              onClick={(e) => e.stopPropagation()}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
{selectedItem.type === 'video renders' || selectedItem.type === '3d' ? (
  <iframe
    src={selectedItem.iframe}
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
    title={selectedItem.type === '3d' ? '3D Model' : 'Video Player'}
  />
) : (
  <img src={selectedItem.src} alt={`${selectedItem.type} full`} />
)}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioSection;
