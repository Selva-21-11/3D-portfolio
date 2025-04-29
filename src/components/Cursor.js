import React, { useEffect, useState } from "react";


const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const mouseOver = () => setHovering(true);
    const mouseOut = () => setHovering(false);

    window.addEventListener("mousemove", move);

    // Add hover detection for all interactive elements
    const hoverables = document.querySelectorAll("a, button, input, textarea");
    hoverables.forEach(el => {
      el.addEventListener("mouseenter", mouseOver);
      el.addEventListener("mouseleave", mouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hoverables.forEach(el => {
        el.removeEventListener("mouseenter", mouseOver);
        el.removeEventListener("mouseleave", mouseOut);
      });
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${hovering ? "hovering" : ""}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default Cursor;
