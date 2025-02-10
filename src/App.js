import React, { Suspense, useState, useEffect } from "react";
import gsap from "gsap";
import SplitText from "./blocks/TextAnimations/SplitText/SplitText";
import ShinyText from "./blocks/TextAnimations/ShinyText/ShinyText";
import "./styles/App.css";
import "./styles/Skills.css";
import "./styles/3Dmodels.css";
import "./styles/ImageRenders.css";
import "./styles/VideoRender.css";
import "./styles/ContactSection.css";
import ModelsSection from "./components/ModelsSection";
import ImageRenders from "./components/ImageRenders";
import VideoRender from "./components/VideoRender";
import ContactSection from "./components/ContactSection";
import BackgroundLight from "./components/BackgroundLight"; // Import the BackgroundLight component
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Correct import of ScrollTrigger


// Lazy-load components
const TitleBG = React.lazy(() => import("./components/TitleBG"));
const Skills = React.lazy(() => import("./components/Skills"));
gsap.registerPlugin(ScrollTrigger);
const App = () => {
  const [activeSection, setActiveSection] = useState("hero");

  // Light settings for each section
  const lightSettings = {
    hero: {
      initialX: -0.7,
      color: { r: 1.0, g: 0.8, b: 0.4 },
      glowRadius: 0.2,
      intensity: 1.0,
      opacity: 0.7,
      wiggleAmount: 70,
      verticalWiggleAmount: 50,
      fadeDuration: 5,
      wiggleSpeed: 10,
      lightDirection: -0.2,
    },
    skills: {
      initialX: 1.2,
      color: { r: 0.4, g: 0.8, b: 1.0 },
      glowRadius: 0.2,
      intensity: 1.0,
      opacity: 0.7,
      wiggleAmount: 60,
      verticalWiggleAmount: 50,
      fadeDuration: 4,
      wiggleSpeed: 10,
      lightDirection: 1.1,
    },
    models: {
      initialX: -0.7,
      color: { r: 0.8, g: 1.0, b: 0.4 },
      glowRadius: 0.2,
      intensity: 1.0,
      opacity: 0.7,
      wiggleAmount: 80,
      verticalWiggleAmount: 50,
      fadeDuration: 4,
      wiggleSpeed: 10,
      lightDirection: -0.2,
    },
    imageRenders: {
      initialX: 1.1,
      color: { r: 0.7, g: 0.9, b: 1.0 },
      glowRadius: 0.2,
      intensity: 1.0,
      opacity: 0.7,
      wiggleAmount: 65,
      verticalWiggleAmount: 50,
      fadeDuration: 4,
      wiggleSpeed: 10,
      lightDirection: 1.1,
    },
    videoRenders: {
      initialX: -0.7,
      color: { r: 1.0, g: 0.7, b: 0.7 },
      glowRadius: 0.2,
      intensity: 1.0,
      opacity: 0.7,
      wiggleAmount: 75,
      verticalWiggleAmount: 50,
      fadeDuration: 4,
      wiggleSpeed: 10,
      lightDirection: -0.2,
    },
    contact: {
      initialX: 1.2,
      color: { r: 0.9, g: 0.8, b: 0.9 },
      glowRadius: 0.2,
      intensity: 1.0,
      opacity: 0.7,
      wiggleAmount: 70,
      verticalWiggleAmount: 58,
      fadeDuration: 4,
      wiggleSpeed: 10,
      lightDirection: 1.1,
    },
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    // Trigger the light change when the section is fully in view
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top", // Trigger when the section top reaches the top of the viewport
        end: "bottom top", // Trigger when the section bottom leaves the top of the viewport
        scrub: 1,
        onEnter: () => setActiveSection(section.id),
        onLeaveBack: () => setActiveSection(section.id), // Reset light when section leaves
        markers: true, // Optional: Set to `true` for debugging
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const currentLight = lightSettings[activeSection] || lightSettings["hero"]; // Default to "hero" if no section is active

  
  return (
    <div className="container">
      {/* Background Light - Dynamically changes per section */}
      <BackgroundLight
        initialX={currentLight.initialX}
        color={currentLight.color}
        glowRadius={currentLight.glowRadius}
        intensity={currentLight.intensity}
        opacity={currentLight.opacity}
        wiggleAmount={currentLight.wiggleAmount}
        verticalWiggleAmount={currentLight.verticalWiggleAmount}
        fadeDuration={currentLight.fadeDuration}
        wiggleSpeed={currentLight.wiggleSpeed}
        lightDirection={currentLight.lightDirection}
      />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h1 className="first-line">
            <SplitText text="WELCOME TO MY" animation="fadeIn" delay={50} />
          </h1>
          <h2 className="second-line">
            <SplitText text="PORTFOLIO" animation="fadeIn" delay={50} />
          </h2>
          <p className="subheading">
            <SplitText text="3D Artist | Animator" animation="fadeIn" delay={100} />
          </p>
          <button className="btn explore">
            <ShinyText text="Explore My Work" />
          </button>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider-hero">
        <h2 className="section-line-hero">It's</h2>
        <h2 className="section-line-hero">Versatile</h2>
        <h3 className="section-subline-hero">Scroll down for skill section</h3>
      </div>

      {/* Skills Section */}
      <section id="skills">
        <Suspense fallback={<div>Loading skills...</div>}>
          <Skills />
        </Suspense>
      </section>

      {/* Another Section Divider */}
      <div className="section-divider-skill">
        <h2 className="section-line-skill">My</h2>
        <h2 className="section-line-skill">Works</h2>
        <h3 className="section-subline-skill">Explore my projects below</h3>
      </div>

      {/* Models Section */}
      <section id="models">
        <ModelsSection />
      </section>

      {/* Image Renders Section */}
      <section id="image-renders">
        <ImageRenders />
      </section>

      {/* Video Renders Section */}
      <section id="video-renders">
        <VideoRender />
      </section>

      {/* Contact Section Divider */}
      <div className="section-divider-contact">
        <h2 className="section-line-contact">Get In</h2>
        <h2 className="section-line-contact">Touch</h2>
        <h3 className="section-subline-contact">Reach out to me below</h3>
      </div>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
};

export default App;
