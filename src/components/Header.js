import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Removed FaTwitter


const Header = () => {
  const socialLinks = [
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourprofile" },
    { icon: <FaGithub />, url: "https://github.com/yourusername" },
    // Twitter icon removed
  ];

  return (
    <header className="site-header">
      {/* Logo Animation */}
      <motion.div
        className="logo-container"
        initial={{ rotate: -360, opacity: 0, y: -100 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      > 
        <motion.img
          src="./assets/logo.png"
          alt="logo"
          className="logo"
          whileHover={{
            rotate: 360,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        />
      </motion.div>

      {/* Text Reveal from behind the Logo */}
      <motion.div
        className="logo-text-container"
        initial={{ opacity: 0, x: -30 }}  // Start slightly left behind the logo
        animate={{ opacity: 1, x: 0 }}   // Slide in to the right, revealing the text
        transition={{ duration: 0.6, delay: 1 }} // Delay until logo finishes animating
      >
        <span className="logo-text">SELVARANJAN</span>
      </motion.div>

      {/* Social Icons */}
      <motion.nav
        className="social-icons"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 1.8, // Delay until after logo and text animation
            },
          },
        }}
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            className="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.3, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            whileTap={{ scale: 0.95 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </motion.nav>
    </header>
  );
};

export default Header;
