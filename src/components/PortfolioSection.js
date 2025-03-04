import React, { useState, useEffect } from 'react';

const PortfolioSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [displayItems, setDisplayItems] = useState([]);
    const [renderedItems, setRenderedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const items = [
        { id: 1, type: 'image', src: './assets/BMW_thumbnail.png' },
        { 
            id: 2, 
            type: 'video', 
            src: './assets/Car_chase.mp4', 
            thumbnail: './assets/Car chase.png'
        },
        { id: 3, type: 'image', src: './assets/Imagerender1.png' },
        { 
            id: 4, 
            type: 'video', 
            src: './assets/Perfume 1.mov', 
            thumbnail: './assets/Perfume_thubnail.png'
        },
        { id: 5, type: 'poster', src: './assets/Movie Poster.jpg' },
        { id: 6, type: 'poster', src: './assets/WFH final.jpg' },
    ];

    useEffect(() => {
        setRenderedItems(displayItems.map(item => ({ ...item, removing: true })));

        setTimeout(() => {
            const filtered = activeFilter === 'all' ? items : items.filter(item => item.type === activeFilter);
            setDisplayItems(filtered);
            setRenderedItems(filtered.map(item => ({ ...item, removing: false })));
        }, 300);
    }, [activeFilter]);

    const openModal = (item) => setSelectedItem(item);
    const closeModal = () => setSelectedItem(null);

    return (
        <div className="portfolio-section">
            <div className="portfolio-header">
                <h2>Renders</h2>
                <p>Explore my image, video, and poster renders</p>
            </div>

            <div className="portfolio-filters">
                {['all', 'image', 'video', 'poster'].map(filter => (
                    <button
                        key={filter}
                        className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>

            <div className="portfolio-grid-wrapper">
                <div className="portfolio-grid">
                    {renderedItems.map(item => (
                        <div
                            key={item.id}
                            className={`portfolio-item ${item.removing ? 'fade-out' : 'fade-in'}`}
                            onClick={() => openModal(item)}
                        >
                            <div className="portfolio-thumbnail">
                                {(item.type === 'image' || item.type === 'poster') && (
                                    <img src={item.src} alt="Portfolio item" />
                                )}
                                {item.type === 'video' && (
                                    <img src={item.thumbnail} alt="Video thumbnail" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedItem && (
                <div className="portfolio-modal" onClick={closeModal}>
                    <div className="portfolio-modal-content" onClick={(e) => e.stopPropagation()}>
                        {selectedItem.type === 'video' ? (
                            <video src={selectedItem.src} controls autoPlay />
                        ) : (
                            <img src={selectedItem.src} alt="Large view" />
                        )}
                        <button className="portfolio-modal-close" onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioSection;
