import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutMe = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.3,     // 30% of the section must be visible
  });

  return (
    <div className="about-me-fullscreen" ref={ref}>
      {/* Left Text */}
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

      {/* Divider Line */}
      <motion.div
        className="divider-line"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        style={{ originY: 0 }}
      />

      {/* Right Image */}
      <motion.div
        className="about-me-image"
        initial={{ opacity: 0, x: 100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <img src="./assets/About_pic.jpg" alt="Selva Profile" className="profile-image" />
      </motion.div>
    </div>
  );
};

export default AboutMe;
