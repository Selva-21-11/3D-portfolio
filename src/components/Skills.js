import React from 'react';
import Skills3DBarGraph from './Skills3DBar'; // Import the 3D bar graph component


const Skills = () => {
  return (
    <section className="skills" id="skills">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-3d-graph">
        <Skills3DBarGraph />
      </div>
    </section>
  );
};

export default Skills;
