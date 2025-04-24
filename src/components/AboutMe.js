import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutMe = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const cardRef = useRef(null);
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
        <h1 className="intro-text">Hi, I’m Selva</h1>
        <p className="description-text">
        Bridging design and technology through advanced 3D workflows.
        I specialize in developing high-performance 3D assets and immersive environments for AR, VR, gaming, and interactive media. My focus lies in delivering optimized, scalable solutions that align with both creative vision and technical precision—ensuring every experience is as efficient as it is engaging.
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
