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


const App = () => {

  
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero" id="hero">
      <BackgroundLight 
        initialX={6.0} // Light starts from a bit off-screen on the left
        color={{ r: 1.0, g: 0.5, b: 0.1 }} // Orange light
        glowRadiusX={0.9} 
        glowRadiusY={0.36}
        intensity={0.5} // Brighter light
        opacity={0.5} // Light starts with 70% opacity
        fadeDuration={2.0} // Fades in over 2 seconds
        lightDirection={1.2} // Light moves towards the right from a starting point
        wiggleAmount={100} // Horizontal wiggle range
        verticalWiggleAmount={100} // Vertical wiggle range
        wiggleSpeed={8} // Faster wiggle speed for more noticeable effect
      />
        <Suspense fallback={<div>Loading skills...</div>}>
          <TitleBG />
        </Suspense>
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
      <BackgroundLight 
        initialX={-5.0} // Light starts from a bit off-screen on the left
        color={{ r: 0.1, g: 0.5, b: 1.0 }} // Blue light
        glowRadiusX={0.4} 
        glowRadiusY={0.3}
        intensity={0.4} // Brighter light
        opacity={0.5} // Light starts with 70% opacity
        fadeDuration={2.0} // Fades in over 2 seconds
        lightDirection={-0} // Light moves towards the right from a starting point
        wiggleAmount={100} // Horizontal wiggle range
        verticalWiggleAmount={100} // Vertical wiggle range
        wiggleSpeed={8} // Faster wiggle speed for more noticeable effect
      />
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
      <BackgroundLight 
        initialX={6.0} // Light starts from a bit off-screen on the left
        color={{ r: 1.0, g: 0.5, b: 0.1 }} // Orange light
        glowRadiusX={0.9} 
        glowRadiusY={0.36}
        intensity={0.5} // Brighter light
        opacity={0.5} // Light starts with 70% opacity
        fadeDuration={2.0} // Fades in over 2 seconds
        lightDirection={1.2} // Light moves towards the right from a starting point
        wiggleAmount={100} // Horizontal wiggle range
        verticalWiggleAmount={100} // Vertical wiggle range
        wiggleSpeed={8} // Faster wiggle speed for more noticeable effect
      />
        <ModelsSection />
      </section>

      {/* Image Renders Section */}
      <section id="image-renders">
      <BackgroundLight 
        initialX={-5.0} // Light starts from a bit off-screen on the left
        color={{ r: 0.1, g: 0.5, b: 1.0 }} // Blue light
        glowRadiusX={0.4} 
        glowRadiusY={0.3}
        intensity={0.4} // Brighter light
        opacity={0.5} // Light starts with 70% opacity
        fadeDuration={2.0} // Fades in over 2 seconds
        lightDirection={-0} // Light moves towards the right from a starting point
        wiggleAmount={100} // Horizontal wiggle range
        verticalWiggleAmount={100} // Vertical wiggle range
        wiggleSpeed={8} // Faster wiggle speed for more noticeable effect
      />
        <ImageRenders />
      </section>

      {/* Video Renders Section */}
      <section id="video-renders">
      <BackgroundLight 
        initialX={6.0} // Light starts from a bit off-screen on the left
        color={{ r: 1.0, g: 0.5, b: 0.1 }} // Orange light
        glowRadiusX={0.9} 
        glowRadiusY={0.36}
        intensity={0.5} // Brighter light
        opacity={0.5} // Light starts with 70% opacity
        fadeDuration={2.0} // Fades in over 2 seconds
        lightDirection={1.2} // Light moves towards the right from a starting point
        wiggleAmount={100} // Horizontal wiggle range
        verticalWiggleAmount={100} // Vertical wiggle range
        wiggleSpeed={8} // Faster wiggle speed for more noticeable effect
      />
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
      <BackgroundLight 
        initialX={-5.0} // Light starts from a bit off-screen on the left
        color={{ r: 0.1, g: 0.5, b: 1.0 }} // Blue light
        glowRadiusX={0.4} 
        glowRadiusY={0.3}
        intensity={0.4} // Brighter light
        opacity={0.5} // Light starts with 70% opacity
        fadeDuration={2.0} // Fades in over 2 seconds
        lightDirection={-0} // Light moves towards the right from a starting point
        wiggleAmount={100} // Horizontal wiggle range
        verticalWiggleAmount={100} // Vertical wiggle range
        wiggleSpeed={8} // Faster wiggle speed for more noticeable effect
      />
        <ContactSection />
      </section>
    </div>
  );
};

export default App;
