import React, { Suspense } from 'react';
import ShinyText from './blocks/TextAnimations/ShinyText/ShinyText';
import SplitText from './blocks/TextAnimations/SplitText/SplitText';
import './blocks/TextAnimations/ShinyText/ShinyText.css';
import './blocks/Components/SpotlightCard/SpotlightCard.css';
import './blocks/Components/CircularGallery/CircularGallery.css';
import './styles/App.css';
import './styles/Skills.css';
import './styles/3Dmodels.css';
import './styles/ImageRenders.css';
import './styles/VideoRender.css';
import './styles/ContactSection.css';
import './styles/Advertisement.css';
import ModelsSection from './components/ModelsSection';
import ImageRenders from './components/ImageRenders';
import VideoRender from './components/VideoRender';
import ContactSection from './components/ContactSection';
import Advertisement from "./components/Advertisement"; 
import BackgroundLight from './components/BackgroundLight';

// Lazy-load TitleBG and Skills components
const TitleBG = React.lazy(() => import('./components/TitleBG'));
const Skills = React.lazy(() => import('./components/Skills'));

const App = () => {
  
  return (
    <div className="container">
      <section className="hero" id="hero">
        <BackgroundLight
          initialX={-1.4} // Light starts from the right
          color={{ r: 0.1, g: 0.8, b: 0.3 }} // Greenish light
          glowRadius={0.4} // Larger radius for soft glow
          intensity={0.7} // Higher intensity
          wiggleAmount={80} // Larger wiggle for more noticeable movement
          opacity={0.2} // Fade-in starting opacity
          lightDirection={-0.2} // Starts from right
        />
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

      {/* Section Divider */}
      <div className="section-divider-hero">
        <h2 className="section-line-hero">It's</h2>
        <h2 className="section-line-hero">Versatile</h2>
        <h3 className="section-subline-hero">Scroll down for skill section</h3>
      </div>

      {/* Skills Section */}
      <Suspense fallback={<div>Loading skills...</div>}>
          <Skills />
      </Suspense>

      {/* Another Section Divider */}
      <div className="section-divider-skill">
        <h2 className="section-line-skill">My</h2>
        <h2 className="section-line-skill">Works</h2>
        <h3 className="section-subline-skill">Explore my projects below</h3>
      </div>

      <ModelsSection />

      <ImageRenders />

      <VideoRender/>

      <div className="section-divider-contact">
        <h2 className="section-line-contact">Get In</h2>
        <h2 className="section-line-contact">Touch</h2>
        <h3 className="section-subline-contact">Reach out to me below</h3>
      </div>

      <ContactSection />

      <Advertisement />


    </div>

    

  );
};

export default App;
