import { motion } from "framer-motion";
import React from "react";

const SlideDownText = ({ text, top = '0px', left = '0px' }) => {
  return (
    <div
      style={{
        overflow: "hidden",
        display: "inline-block",
        position: "relative", // Container must have relative positioning
        top: top,              // Move the container
        left: left,            // Move the container
      }}
    >
      {/* Single text that slides down */}
      <motion.div
        initial={{ y: "-100%" }}  // Start hidden above
        animate={{ y: "0%" }}     // Slide down to 0%
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "relative",   // Keep it stacked on top
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

export default SlideDownText;
