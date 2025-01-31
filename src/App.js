import React, { Suspense } from 'react';
import ShinyText from './blocks/TextAnimations/ShinyText/ShinyText';
import SplitText from './blocks/TextAnimations/SplitText/SplitText';
import './blocks/TextAnimations/ShinyText/ShinyText.css';
import './blocks/Components/SpotlightCard/SpotlightCard.css';
import './styles/App.css';
import './styles/Skills.css';


// Lazy-load TitleBG component
const TitleBG = React.lazy(() => import('./components/TitleBG'));
const Skills = React.lazy(() => import('./components/Skills'));

const App = () => {

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
            {/* Skills Section */}
            <Skills />
    </div>
  );
};

export default App;