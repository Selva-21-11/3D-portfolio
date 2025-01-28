import React, { useState, Suspense, useRef } from 'react';
import './styles/App.css';
import gsap from 'gsap';
import ShinyText from './blocks/TextAnimations/ShinyText/ShinyText';
import SplitText from './blocks/TextAnimations/SplitText/SplitText';
import SpotlightCard from './blocks/Components/SpotlightCard/SpotlightCard';
import TiltedCard from './blocks/Components/TiltedCard/TiltedCard';
import './blocks/TextAnimations/ShinyText/ShinyText.css';
import './blocks/Components/SpotlightCard/SpotlightCard.css';
import './blocks/Components/TiltedCard/TiltedCard.css';

// Lazy-load TitleBG component
const TitleBG = React.lazy(() => import('./components/TitleBG'));

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State for active carousel item
  const contentRef = useRef(null); // Ref for the content inside the content rectangle
  const headingRef = useRef(null); // Ref for the heading

  const carouselItems = [
    {
      id: 'aboutMe',
      title: 'About Me',
      content: (
        <p>
          I am a passionate 3D Artist and Animator with experience in creating stunning 3D models, animations, and immersive experiences. I love experimenting with new technologies to bring creative ideas to life.
        </p>
      ),
    },
    {
      id: 'skills',
      title: 'Skills',
      content: (
        <div>

          
        </div>
      ),
    },
    {
      id: 'experience',
      title: 'Experience',
      content: (
        <div>
          <div className="timeline-item">
            <div className="timeline-year">2024</div>
            <div className="timeline-role">3D Artist at XYZ</div>
            <p>Created 3D models for various projects, enhancing product visualizations.</p>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2023</div>
            <div className="timeline-role">Animator at ABC</div>
            <p>Worked on animations for product demos, improving customer engagement.</p>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2022</div>
            <div className="timeline-role">Junior Animator at DEF</div>
            <p>Assisted in animating characters for video games and cinematic sequences.</p>
          </div>
        </div>
      ),
    },
  ];

  const navigateCarousel = (direction) => {
    const currentIndex = activeIndex;
    const newIndex =
      direction === 'left'
        ? (currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1)
        : (currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1);

    // Animate heading and content sliding out
    gsap.to(
      [headingRef.current, contentRef.current],
      {
        xPercent: direction === 'right' ? 100 : -100, // Slide current out
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setActiveIndex(newIndex); // Update the index after the slide-out

          // Animate heading and content sliding in from the opposite side
          gsap.fromTo(
            [headingRef.current, contentRef.current],
            {
              xPercent: direction === 'right' ? -100 : 100, // Start from the opposite direction
              opacity: 0,
            },
            {
              xPercent: 0, // Slide in to the center
              opacity: 1,
              duration: 0.5,
              ease: 'power2.inOut',
            }
          );
        },
      }
    );
  };

  return (
    <div className="container">
      <section className="hero" id="hero">
        <Suspense fallback={<div>Loading background...</div>}>
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

      <section className="about" id="about">
        <div className="carousel">
          {/* Section Heading with Arrows */}
          <div className="heading-container">
            <button
              className="arrow left-arrow"
              onClick={() => navigateCarousel('left')}
            >
              &#8592;
            </button>
            <h2 className="section-heading" ref={headingRef}>
              {carouselItems[activeIndex].title}
            </h2>
            <button
              className="arrow right-arrow"
              onClick={() => navigateCarousel('right')}
            >
              &#8594;
            </button>
          </div>

          {/* Spotlight Card Instead of Content Rectangle */}
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)" // You can customize the spotlight color
          >
            {/* Content to be displayed inside the SpotlightCard */}
            <div className="content-rectangle" ref={contentRef}>
              {carouselItems[activeIndex].content}
            </div>
          </SpotlightCard>
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

export default App;
