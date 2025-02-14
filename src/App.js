import React, { Suspense } from "react";
import SplitText from "./blocks/TextAnimations/SplitText/SplitText";
import { Link } from "react-scroll";
import { Element } from "react-scroll";
import "./styles/App.css";
import "./styles/Skills.css";
import "./styles/3Dmodels.css";
import "./styles/ImageRenders.css";
import "./styles/VideoRender.css";
import "./styles/ContactSection.css";
import SlideUpText from './components/Textreveal';
import { scroller } from "react-scroll";

// Lazy-load components
const TitleBG = React.lazy(() => import("./components/TitleBG"));
const Skills = React.lazy(() => import("./components/Skills"));
const BackgroundLight = React.lazy(() => import("./components/BackgroundLight"));
const ModelsSection = React.lazy(() => import("./components/ModelsSection"));
const ImageRenders = React.lazy(() => import("./components/ImageRenders"));
const VideoRender = React.lazy(() => import("./components/VideoRender"));
const ContactSection = React.lazy(() => import("./components/ContactSection"));

// Use React.memo for components that don't need to re-render
const MemoizedModelsSection = React.memo(ModelsSection);
const MemoizedImageRenders = React.memo(ImageRenders);
const MemoizedVideoRender = React.memo(VideoRender);
const MemoizedContactSection = React.memo(ContactSection);

const App = () => {
  const scrollToSection = () => {
    scroller.scrollTo("skills", {
      duration: 500,
      smooth: true,
      offset: 0, // Adjust if needed
    });
  };
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
        {/* Hero Section */}
        <section className="hero" id="hero">
          <Suspense fallback={<div>Loading light...</div>}>
            <BackgroundLight
              initialX={6.0} 
              color={{ r: 1.0, g: 0.5, b: 0.1 }} 
              glowRadiusX={0.5}
              glowRadiusY={0.3}
              intensity={0} 
              opacity={0.5} 
              fadeDuration={2.0}
              lightDirection={1.2} 
              wiggleAmount={100}
              verticalWiggleAmount={100}
              wiggleSpeed={8}
            />
          </Suspense>
          <Suspense fallback={<div>Loading title...</div>}>
            <TitleBG />
          </Suspense>
          <div className="hero-content">
            <h1 className="first-line">
              <SplitText text="DISCOVER" animation="fadeIn" delay={50} />
            </h1>
            <h2 className="second-line">
              <SplitText text="THIRD DIMENSION!" animation="fadeIn" delay={50} />
            </h2>
              <SlideUpText text="Scroll down to discover" bottom="0px" left="30px" fontSize="1.5rem" />
          </div>
        </section>

        

        {/* Skills Section */}
        <section id="skills">
          <Suspense fallback={<div>Loading light...</div>}>
            <BackgroundLight
              initialX={-10} 
              color={{ r: 0.1, g: 0.5, b: 1.0 }} 
              glowRadiusX={0.3}
              glowRadiusY={0.2}
              intensity={0}
              opacity={0.5}
              fadeDuration={2.0}
              lightDirection={-0}
              wiggleAmount={100}
              verticalWiggleAmount={100}
              wiggleSpeed={8}
            />
          </Suspense>
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
          <Suspense fallback={<div>Loading light...</div>}>
            <BackgroundLight
              initialX={6.0}
              color={{ r: 1.0, g: 0.5, b: 0.1 }}
              glowRadiusX={0.5}
              glowRadiusY={0.3}
              intensity={0}
              opacity={0.5}
              fadeDuration={2.0}
              lightDirection={1.2}
              wiggleAmount={100}
              verticalWiggleAmount={100}
              wiggleSpeed={8}
            />
          </Suspense>
          <MemoizedModelsSection />
        </section>

        {/* Image Renders Section */}
        <section id="image-renders">
          <Suspense fallback={<div>Loading light...</div>}>
            <BackgroundLight
              initialX={-5.0}
              color={{ r: 0.1, g: 0.5, b: 1.0 }}
              glowRadiusX={0.3}
              glowRadiusY={0.2}
              intensity={0}
              opacity={0.5}
              fadeDuration={2.0}
              lightDirection={-0}
              wiggleAmount={100}
              verticalWiggleAmount={100}
              wiggleSpeed={8}
            />
          </Suspense>
          <MemoizedImageRenders />
        </section>

        {/* Video Renders Section */}
        <section id="video-renders">
          <Suspense fallback={<div>Loading light...</div>}>
            <BackgroundLight
              initialX={6.0}
              color={{ r: 1.0, g: 0.5, b: 0.1 }}
              glowRadiusX={0.5}
              glowRadiusY={0.3}
              intensity={0}
              opacity={0.5}
              fadeDuration={2.0}
              lightDirection={1.2}
              wiggleAmount={100}
              verticalWiggleAmount={100}
              wiggleSpeed={8}
            />
          </Suspense>
          <MemoizedVideoRender />
        </section>

        {/* Contact Section Divider */}
        <div className="section-divider-contact">
          <h2 className="section-line-contact">Get In</h2>
          <h2 className="section-line-contact">Touch</h2>
          <h3 className="section-subline-contact">Reach out to me below</h3>
        </div>

        {/* Contact Section */}
        <section id="contact">
          <Suspense fallback={<div>Loading light...</div>}>
            <BackgroundLight
              initialX={-5.0}
              color={{ r: 0.1, g: 0.5, b: 1.0 }}
              glowRadiusX={0.4}
              glowRadiusY={0.3}
              intensity={0}
              opacity={0.5}
              fadeDuration={2.0}
              lightDirection={-0}
              wiggleAmount={100}
              verticalWiggleAmount={100}
              wiggleSpeed={8}
            />
          </Suspense>
          <MemoizedContactSection />
        </section>
      </div>
    </Suspense>
  );
};

export default App;
