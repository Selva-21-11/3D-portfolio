import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutMe = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    setTransform({ rotateX, rotateY, scale: 1.05 }); // Pop-up scale
  };

  const resetTransform = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 }); // Reset
  };

  return (
    <div className="about-me-fullscreen" ref={ref}>
      <motion.div
        className="about-me-text"
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="intro-text">Hi, I’m Selva</h1>
        <p className="description-text">
          I’m a 3D artist dedicated to crafting clean, immersive digital experiences.
          Whether it's detailed modeling or AR/VR storytelling, I blend design and
          technology to create visuals that are both beautiful and meaningful.
          My approach is minimal, but the impact is intentional.
        </p>
      </motion.div>

      <motion.div
        className="divider-line"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        style={{ originY: 0 }}
      />

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
          }}
        >
          <img src="./assets/About_pic.jpg" alt="Selva Profile" className="profile-image" />
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
