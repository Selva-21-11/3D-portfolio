import React from 'react';
import CircularGallery from '../blocks/Components/CircularGallery/CircularGallery';

const items = [
  { image: '/assets/Imagerender1.png', text: 'Item 1' },
  { image: '/assets/Imagerender2.png', text: 'Item 2' },
  { image: '/assets/Imagerender3.png', text: 'Item 3' },
  // Add more items as needed
];

const ImageRenders = () => (
  <div style={{ height: '1000px', position: 'relative' }}>
    {/* Apply the class to the heading */}
    <h2 className="image-renders-heading">
      Image Renders
    </h2>

    <CircularGallery
      items={items}
      bend={0.5}
      textColor="#ffffff"
      borderRadius={0.05}
      itemSize={2000}  // Adjust this value to change the card size
    />
  </div>
);

export default ImageRenders;
