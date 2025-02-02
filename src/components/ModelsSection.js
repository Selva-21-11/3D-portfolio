import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ModelViewer from './ModelViewer';


const models = [
  {
    name: 'BMW Car',
    thumbnail: '/assets/BMW_thumbnail.png',
    modelName: 'bmw',
    metadata: 'Modeled in Blender | 2024',
  },
  {
    name: 'Sport Bike',
    thumbnail: '/assets/Bike_thumbnail.png',
    modelName: 'bike',
    metadata: 'Modeled in Blender | 2023',
  },
];

const ModelsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedModel, setSelectedModel] = useState(null);
  const [animationClass, setAnimationClass] = useState('');

  const switchModel = (direction) => {
    setAnimationClass(direction > 0 ? 'slide-out-right' : 'slide-out-left');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + direction + models.length) % models.length);
      setAnimationClass(direction > 0 ? 'slide-in-left' : 'slide-in-right'); // Opposite direction for the new model
    }, 300); // Match animation duration
  };

  return (
    <div className="models-section">
      <h2 className="section-title">3D Models Showcase</h2>

      {/* Carousel */}
      <div className="carousel-wrapper">
        <button className="carousel-nav left" onClick={() => switchModel(-1)}>←</button>

        <div className={`model-card ${animationClass}`} onClick={() => setSelectedModel(models[currentIndex])}>
          <img src={models[currentIndex].thumbnail} alt={models[currentIndex].name} className="thumbnail" />
          <div className="model-info">
            <h3>{models[currentIndex].name}</h3>
            <p>{models[currentIndex].metadata}</p>
          </div>
        </div>

        <button className="carousel-nav right" onClick={() => switchModel(1)}>→</button>
      </div>

      {/* Popup Model Viewer */}
      {selectedModel && (
        <div className="model-popup">
          <Suspense fallback={<div>Loading 3D Model...</div>}>
            <Canvas camera={{ position: [0, 1, 3] }}>
              <ModelViewer modelName={selectedModel.modelName} />
            </Canvas>
          </Suspense>
          <button className="close-btn" onClick={() => setSelectedModel(null)}>✖</button>
        </div>
      )}
    </div>
  );
};

export default ModelsSection;
