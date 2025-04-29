import React, { Suspense } from "react";
import "./styles/App.css";
import "./styles/Skills.css";
import "./styles/ContactSection.css";
import "./styles/AboutMe.css";
import "./styles/Header.css";
import "./styles/PortfolioSection.css";
import "./styles/Hero.css";
import Aurora from "./blocks/Backgrounds/Aurora/Aurora";
import Header from "./components/Header";
import Cursor from "./components/Cursor";

// Lazy-load components
const TitleBG = React.lazy(() => import("./components/TitleBG"));
const Hero = React.lazy(() => import("./components/Hero"));
const AboutMe = React.lazy(() => import("./components/AboutMe"));
const Skills = React.lazy(() => import("./components/Skills"));
const ContactSection = React.lazy(() => import("./components/ContactSection"));
const PortfolioSection = React.lazy(() => import("./components/PortfolioSection"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Cursor />
      <div className="aurora-wrapper">
        {/* Background and Aurora component */}
        <Aurora
          colorStops={["#6F7D91", "#8BBBC9", "#2A3341"]} // Steel & Ice Gradient
          amplitude={0.2}
          blend={1}
        />

        <div className="container">
          <div className="background-glow" />
          
          {/* Header section */}
          <Header />

          {/* Hero Section with lazy-loaded components */}
          <section className="hero" id="hero">
            <Suspense fallback={<div>Loading title...</div>}>
              <TitleBG />
            </Suspense>
            <Suspense fallback={<div>Loading hero...</div>}>
              <Hero />
            </Suspense>
          </section>

          {/* About Me Section */}
          <section id="about-me" data-title="About Me">
            <Suspense fallback={<div>Loading About Me...</div>}>
              <AboutMe />
            </Suspense>
          </section>

          {/* Skills Section */}
          <section id="skills" data-title="Skills">
            <Suspense fallback={<div>Loading skills...</div>}>
              <Skills />
            </Suspense>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" data-title="Portfolio">
            <Suspense fallback={<div>Loading portfolio...</div>}>
              <PortfolioSection />
            </Suspense>
          </section>

          {/* Contact Section */}
          <section id="contact" data-title="Contact Me">
            <Suspense fallback={<div>Loading contact...</div>}>
              <ContactSection />
            </Suspense>
          </section>
        </div>
      </div>
    </Suspense>
  );
};

export default App;
