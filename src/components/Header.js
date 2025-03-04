import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [activeSection, setActiveSection] = useState("Welcome");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = { threshold: 0.6 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute("data-title") || "Welcome");
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="floating-header-wrapper">
      <div className="floating-header">
        {/* Logo */}
        <span className="header-logo">Selva</span>

        {/* Section Title */}
        <div className="header-title-wrapper">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeSection}
              className="floating-header-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {activeSection}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Action Buttons (LinkedIn, Resume, Contact) */}
        <div className="header-nav-icons">
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="header-btn"
          >
            LinkedIn
          </a>
          <a
            href="/your-resume.pdf"
            download="My_Resume.pdf"
            className="header-btn"
          >
            Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
