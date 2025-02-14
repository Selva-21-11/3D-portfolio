import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";
const SlideUpText = ({ text, bottom = '0px', left = '0px' }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        overflow: "hidden",
        display: "inline-block",
        position: "relative", // Container must have relative positioning
        bottom: bottom,              // Move the container
        left: left,            // Move the container
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Current text that slides up */}
      <motion.div
        initial={{ y: "100%" }}
        animate={hovered ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "relative", // Keep it stacked on top
          top: 0,
          left: 0,
          display: "inline-block",
        }}
      >
        {text}
      </motion.div>

      {/* New text that slides in from bottom */}
      <motion.div
        initial={{ y: "100%" }} // Start hidden below the container
        animate={hovered ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute", // Positioned directly below the first text
          top: 0,
          left: 0,
          display: "inline-block",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default SlideUpText;
