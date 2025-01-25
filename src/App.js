import React from 'react';
import './styles/App.css'; // Import your CSS file

// Import Components
import Scene3D from './components/3DScene';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Experience from './components/Experience';

function App() {
  return (
    <div className="App">
      <Scene3D />
      <FloatingRectangle />
      <AboutMe />
      <Skills />
      <Experience />
    </div>
  );
}

export default App;
