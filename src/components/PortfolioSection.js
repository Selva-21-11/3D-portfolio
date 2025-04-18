import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PortfolioSection.css';

const portfolioItems = [
  { id: 1, type: 'image', src: './assets/portfolio/image1.jpg' },
  { id: 2, type: 'video', src: './assets/portfolio/video1.mp4' },
  { id: 3, type: 'poster', src: './assets/portfolio/poster1.jpg' },
  { id: 4, type: '3d', iframe: 'https://your-3d-model-viewer.com/embed/model1' },
  // Add more items as needed
];

const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.type === filter);

  return (
    <div className="portfolio-section">
      <div className="filter-buttons">
        {['all', 'image', 'video', 'poster', '3d'].map(cat => (
          <button 
            key={cat} 
            className={filter === cat ? 'active' : ''}
            onClick={() => setFilter(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.div 
              key={item.id}
              className="portfolio-item"
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              {item.type === 'image' || item.type === 'poster' ? (
                <img src={item.src} alt="" className="thumb" />
              ) : item.type === 'video' ? (
                <video src={item.src} className="thumb" muted autoPlay loop />
              ) : (
                <div className="thumb">3D Model</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {selectedItem.type === '3d' ? (
              <iframe src={selectedItem.iframe} title="3D Model" frameBorder="0" allowFullScreen />
            ) : selectedItem.type === 'video' ? (
              <video src={selectedItem.src} controls autoPlay />
            ) : (
              <img src={selectedItem.src} alt="Full View" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;
