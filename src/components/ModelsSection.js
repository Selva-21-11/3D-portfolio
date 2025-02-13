import React, { Suspense, useState } from "react";
import Slider from "react-slick";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";

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
        name: "Sport Bike",
        thumbnail: "./assets/Bike_thumbnail.png",
        modelName: "bike",
        metadata: "Modeled in Blender | 2023",
    },
];

const ModelsSection = () => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [centeredModelIndex, setCenteredModelIndex] = useState(0); // Track centered model index

    const settings = {
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
        infinite: true,
        speed: 500,
        arrows: true,
        focusOnSelect: true,
        beforeChange: (current, next) => {
            setCenteredModelIndex(next); // Update centered model index on slide change
        },
    };

    const handleModelClick = (index) => {
        if (index === centeredModelIndex) {
            setSelectedModel(models[index]);
        }
    };

    return (
        <div className="models-section">
            <h2 className="section-title">3D Models Showcase</h2>

            <Slider {...settings}>
                {models.map((model, index) => (
                    <div
                        key={index}
                        className="model-card"
                        onClick={() => handleModelClick(index)} // Only click if centered
                        style={{
                            pointerEvents: index === centeredModelIndex ? "auto" : "none", // Disable pointer events for non-centered models
                        }}
                    >
                        <img src={model.thumbnail} alt={model.name} className="thumbnail" />
                        <div className="model-info">
                            <h3>{model.name}</h3>
                            <p>{model.metadata}</p>
                        </div>
                    </div>
                ))}
            </Slider>

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
