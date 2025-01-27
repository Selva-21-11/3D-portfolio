import React, { useEffect, useState, Suspense } from 'react';
import './styles/App.css';
import gsap from 'gsap';
import ShinyText from './blocks/TextAnimations/ShinyText/ShinyText';
import './blocks/TextAnimations/ShinyText/ShinyText.css'
// Lazy-load TitleBG component
const TitleBG = React.lazy(() => import('./components/TitleBG'));

const App = () => {
  const [isTitleBGVisible, setTitleBGVisible] = useState(true); // Set to true to load TitleBG immediately

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            const lightConfig = getLightConfigForSection(sectionIndex);
  
            // Only process if the lightConfig is available
            if (Array.isArray(lightConfig)) {
              lightConfig.forEach(({ color, count, positions }) => {
                const fragment = document.createDocumentFragment(); // Batch DOM updates
  
                for (let i = 0; i < count; i++) {
                  const light = document.createElement('div');
                  light.classList.add('light-effect');
  
                  // Applying linear gradient instead of radial gradient
                  light.style.background = `linear-gradient(45deg, ${color} 25%, ${color} 75%)`;
                  light.style.boxShadow = `0 0 250px 150px ${color}`;
  
                  const { positionX, positionY } = positions[i];
                  light.style.left = `${positionX}%`;
                  light.style.top = `${positionY}%`;
  
                  fragment.appendChild(light);
                  animateLightEffect(light);
                }
  
                // Append all lights in one operation
                entry.target.appendChild(fragment);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    return () => observer.disconnect();
  }, []);
  
  const getLightConfigForSection = (sectionIndex) => {
    switch (sectionIndex) {
      case 0:
        return [
          {
            color: 'linear-gradient(45deg, rgb(246, 255, 0), rgba(255, 0, 255, 0.87))', // Cyan
            count: 1,
            positions: [{ positionX: 110, positionY: 0 }],
          },
        ];
      case 1:
        return [
          {
            color: 'rgba(255, 0, 255, 0.3)', // Magenta
            count: 1,
            positions: [{ positionX: -15, positionY: 50 }],
          },
        ];
      case 2:
        return [
          {
            color: 'rgba(0, 255, 0, 0.3)', // Green
            count: 1,
            positions: [{ positionX: 100, positionY: 50 }],
          },
        ];
      case 3:
        return [
          {
            color: 'rgba(255, 255, 0, 0.3)', // Yellow
            count: 1,
            positions: [{ positionX: 20, positionY: 30 }],
          },
        ];
      default:
        return []; // Return an empty array if no matching section
    }
  };
  
  const animateLightEffect = (lightElement) => {
    requestIdleCallback(() => {
      gsap.to(lightElement, {
        scale: 'random(1, 1.5)',
        opacity: 'random(0.4, 1)',
        x: 'random(-80, 80)',
        y: 'random(-80, 80)',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });
  };
  

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
