import React, { useState } from "react";
import ModelViewer from "./ModelViewer"; // Assuming you already have this
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const models = [
    {
        name: "BMW Car",
        thumbnail: "./assets/BMW_thumbnail.png",
        modelName: "bmw",
        metadata: "Modeled in Blender | 2024",
    },
    {
        name: "Sport Bike",
        thumbnail: "./assets/Bike_thumbnail.png",
        modelName: "bike",
        metadata: "Modeled in Blender | 2023",
    },
    {
        name: "Spaceship",
        thumbnail: "./assets/spaceship_thumbnail.png",
        modelName: "spaceship",
        metadata: "Modeled in Blender | 2023",
    }
];

const ModelsSection = () => {
    const [selectedModel, setSelectedModel] = useState(null);

    const handleModelClick = (model) => {
        setSelectedModel(model);
    };

    const handleClose = () => {
        setSelectedModel(null);
    };

    return (
        <div className="models-section">
            <h2 className="section-title">3D Models Showcase</h2>
            <div className="models-grid">
                {models.map((model, index) => (
                    <div 
                        key={index} 
                        className="model-card"
                        onClick={() => handleModelClick(model)}
                    >
                        <img src={model.thumbnail} alt={model.name} className="thumbnail" />
                        <div className="overlay">
                            <h3>{model.name}</h3>
                            <p>{model.metadata}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup with no animation */}
            {selectedModel && (
                <>
                    <div className="popup-overlay" onClick={handleClose}></div>
                    <div className="model-popup">
                        <button className="close-btn" onClick={handleClose}>✖</button>
                        <div className="canvas-box">
                            <Suspense fallback={<div>Loading 3D Model...</div>}>
                                <Canvas camera={{ position: [0, 1, 5] }}>
                                    <ModelViewer modelName={selectedModel.modelName} />
                                </Canvas>
                            </Suspense>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModelsSection;
