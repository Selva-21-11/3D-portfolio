import React from 'react';
import TiltedCard from '../blocks/Components/TiltedCard/TiltedCard'; // Import the TiltedCard component
const SkillsSection = () => {
  const skills = [
    { imageSrc: '/assets/Blender.png', captionText: 'Blender', progressBarValue: 80 },
    { imageSrc: '/assets/Mattext.png', captionText: 'Mattext', progressBarValue: 60 },
    { imageSrc: '/assets/OtherSkill.png', captionText: 'Other Skill', progressBarValue: 90 },
    { imageSrc: '/assets/AnotherSkill.png', captionText: 'Another Skill', progressBarValue: 70 },
  ];

  return (
    <section className="skills-section">
      <h2>My Skills</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <TiltedCard
            key={index}
            imageSrc={skill.imageSrc}
            captionText={skill.captionText}
            progressBarValue={skill.progressBarValue}
            containerHeight="300px"
            containerWidth="250px"
            scaleOnHover={1.1}
            rotateAmplitude={14}
            displayOverlayContent={true}
            overlayContent={<div>More Info About {skill.captionText}</div>}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
