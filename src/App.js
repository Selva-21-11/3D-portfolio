import React, { useEffect, useState, Suspense } from 'react';
import './styles/App.css';
import gsap from 'gsap';
import ShinyText from './blocks/TextAnimations/ShinyText/ShinyText';
import './blocks/TextAnimations/ShinyText/ShinyText.css'
// Lazy-load TitleBG component
const TitleBG = React.lazy(() => import('./components/TitleBG'));

const App = () => {
  const [isTitleBGVisible, setTitleBGVisible] = useState(true); // Set to true to load TitleBG immediately
  
  return (
    <div className="container">
     <section className="hero" id="hero">
        <Suspense fallback={<div>Loading background...</div>}>
          <TitleBG />
        </Suspense>
        <div className="hero-content">
          <h1 className="first-line">WELCOME TO MY</h1>
          <h2 className="second-line">PORTFOLIO</h2>
          <p className="subheading">3D Artist | Animator</p>
          <button className="btn explore">
            <ShinyText text="Explore My Work" />
          </button>
        </div>
      </section>

      <section className="about" id="about">
        <div className="glass-effect">
          <h2>About Me</h2>
          <p>Some description about your work, skills, and experience.</p>
          <a href="#contact" className="btn contact">Contact Me</a>
        </div>
      </section>

      <section className="portfolio" id="portfolio">
        <div className="glass-effect">
          <h2>My Portfolio</h2>
          <p>Showcase of projects like 3D models, animations, etc.</p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="glass-effect">
          <h2>Contact</h2>
          <p>Get in touch with me.</p>
          <a href="#hero" className="btn contact">Back to Top</a>
        </div>
      </section>
    </div>
  );
};

// Throttle function for IntersectionObserver callback
const throttle = (func, wait) => {
  let timeout = null;
  return function () {
    const context = this;
    const args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
};

export default App;
