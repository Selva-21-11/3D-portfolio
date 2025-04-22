import React, { Suspense } from "react";
import "./styles/App.css";
import "./styles/Skills.css";
import "./styles/ContactSection.css";
import "./styles/AboutMe.css";
import './styles/Header.css';
import './styles/PortfolioSection.css';
import "./styles/Header.css";
import Aurora from "./blocks/backgrounds/aurora/Aurora";
import "./styles/Hero.css";
import Header from "./components/Header";


// Lazy-load components
const TitleBG = React.lazy(() => import("./components/TitleBG"));
const Hero = React.lazy(() => import("./components/Hero"));
const AboutMe = React.lazy(() => import("./components/AboutMe"));
const Skills = React.lazy(() => import("./components/Skills"));
const ContactSection = React.lazy(() => import("./components/ContactSection"));
const PortfolioSection = React.lazy(() => import("./components/PortfolioSection"));

// Use React.memo for components that don't need to re-render
const MemoizedContactSection = React.memo(ContactSection);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="aurora-wrapper"> {/* Optional wrapper for layering */}
      <Aurora
          colorStops={["#6F7D91", "#8BBBC9", "#2A3341"]} // Steel & Ice Gradient
          amplitude={0.2}
          blend={1}
        />

        <div className="container">
          <div className="background-glow"></div>
          <Header />
          <section className="hero" id="hero">
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

          <section id="skills" data-title="Skills">
            <Suspense fallback={<div>Loading skills...</div>}>
              <Skills />
            </Suspense>
          </section>

          <section id="portfolio" data-title="Portfolio">
            <Suspense fallback={<div>Loading portfolio...</div>}>
              <PortfolioSection />
            </Suspense>
          </section>

          <section id="contact" data-title="Contact Me">
            <MemoizedContactSection />
          </section>
        </div>
      </div>
    </Suspense>
  );
};

export default App;
