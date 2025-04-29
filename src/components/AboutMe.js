import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import VariableProximity from "../blocks/TextAnimations/VariableProximity/VariableProximity";

const AboutMe = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const cardRef = useRef(null);
  const containerRef = useRef(null); // Added ref for the container
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * 10;
    const rotateY = ((x - width / 2) / (width / 2)) * -10;

    setTransform({ rotateX, rotateY, scale: 1.05 });
  }, []);

  const resetTransform = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return (
    <section className="about-me-fullscreen" ref={ref} id="about">
      {/* Text Section */}
      <motion.div
        className="about-me-text"
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div ref={containerRef} style={{ position: "relative" }}>
          {/* VariableProximity for the heading */}
          <VariableProximity
  label="Hi, I’m Selva"
  className="intro-text"
  fromFontVariationSettings="'wght' 600" // Start from weight 400 (normal)
  toFontVariationSettings="'wght' 200" // End at weight 900 (bold)
  containerRef={containerRef}
  radius={120}
  falloff="linear"
/>

        </div>
        
        <p className="description-text">
        I create high-performance 3D models, immersive environments, and interactive web experiences tailored for AR, VR, gaming, and digital platforms. 
        My work merges technical precision with creative intent—delivering optimized, scalable solutions that are as functional as they are visually compelling. Alongside this, I design clean, purpose-driven graphics and posters that elevate storytelling across mediums. 
        </p>
      </motion.div>

      {/* Divider Line */}
      <motion.div
        className="divider-line"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        style={{ originY: 0 }}
        aria-hidden="true"
      />

      {/* Image Section with Hover Effect */}
      <motion.div
        className="about-me-image"
        initial={{ opacity: 0, x: 100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <div
          className="profile-wrapper"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTransform}
          style={{
            transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
            transition: "transform 0.2s ease-out",
            willChange: "transform",
          }}
        >
          <img
            src="./assets/About_pic.webp"
            alt="Portrait of Selva"
            className="profile-image"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
