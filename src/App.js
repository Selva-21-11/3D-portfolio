import React, { Suspense } from "react";
import "./styles/App.css";
import "./styles/Skills.css";
import "./styles/ContactSection.css";
import "./styles/AboutMe.css";
import './styles/Header.css';
import './styles/PortfolioSection.css';
import "./styles/Header.css";
import "./styles/Hero.css";
import Header from "./components/Header";


// Lazy-load components
const TitleBG = React.lazy(() => import("./components/TitleBG"));
const Hero = React.lazy(() => import("./components/Hero"));
const AboutMe = React.lazy(() => import("./components/AboutMe"));
const Skills = React.lazy(() => import("./components/Skills"));
const BackgroundLight = React.lazy(() => import("./components/BackgroundLight"));
const ContactSection = React.lazy(() => import("./components/ContactSection"));
const PortfolioSection = React.lazy(() => import("./components/PortfolioSection"));

// Use React.memo for components that don't need to re-render
const MemoizedContactSection = React.memo(ContactSection);

const App = () => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
      <Header />
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
  <Suspense fallback={<div>Loading hero...</div>}>
    <Hero />
  </Suspense>
</section>


        <section id="about-me" data-title="About Me">
            <Suspense fallback={<div>Loading About Me...</div>}>
                <AboutMe />
            </Suspense>
        </section>

        {/* Skills Section */}
        <section id="skills" data-title="Skills">
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

        <section id="portfolio" data-title="Portfolio">
        <Suspense fallback={<div>Loading portfolio...</div>}>
            <PortfolioSection />
        </Suspense>
        </section>



        {/* Contact Section */}
        <section id="contact" data-title="Contact Me">
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
