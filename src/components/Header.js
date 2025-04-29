import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const socialLinks = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/selva-ranjan-03a5ab239/" },
  { icon: <FaGithub />, url: "https://github.com/Selva-21-11" },
];

const logoVariants = {
  hidden: { rotate: -360, opacity: 0, y: -100 },
  visible: { rotate: 0, opacity: 1, y: 0 },
};

const logoTextVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const socialLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => (
  <header className="site-header">
    {/* Logo Animation */}
    <motion.div
      className="logo-container"
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeOut" }}
    >
<motion.img
  src="./assets/logo.webp"
  alt="logo"
  className="logo"
  whileHover={{
    scale: 1.3,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  }}
  whileTap={{ scale: 0.95 }}
/>

    </motion.div>

    {/* Text Reveal from behind the Logo */}
    <motion.div
      className="logo-text-container"
      variants={logoTextVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, delay: 1 }}
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
          variants={socialLinkVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{
            scale: 1.3,
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.nav>
  </header>
);

export default Header;
