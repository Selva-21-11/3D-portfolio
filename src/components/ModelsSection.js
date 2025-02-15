import React, { Suspense, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import gsap from "gsap";

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
    const [centeredModelIndex, setCenteredModelIndex] = useState(0);
    const popupRef = useRef(null);

    const settings = {
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
        infinite: true,
        speed: 500,
        arrows: true,
        focusOnSelect: true,
        beforeChange: (current, next) => setCenteredModelIndex(next),
    };

    const handleModelClick = (index) => {
        if (index === centeredModelIndex) {
            setSelectedModel(models[index]);
        }
    };

    useEffect(() => {
        if (selectedModel && popupRef.current) {
            gsap.fromTo(
                popupRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [selectedModel]);

    const handleClose = () => {
        gsap.to(popupRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => setSelectedModel(null),
        });
    };

    return (
        <div className="models-section">
            <h2 className="section-title">3D Models Showcase</h2>

            <Slider {...settings}>
                {models.map((model, index) => (
                    <div
                        key={index}
                        className="model-card"
                        onClick={() => handleModelClick(index)}
                        style={{
                            pointerEvents: index === centeredModelIndex ? "auto" : "none",
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
                <>
                    <div className="popup-overlay" onClick={handleClose}></div>
                    <div className="model-popup" ref={popupRef}>
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
