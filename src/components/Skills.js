import React from 'react';
import TiltedCard from '../blocks/Components/TiltedCard/TiltedCard'; // Import the TiltedCard component
const SkillsSection = () => {
  // Define an array of skills with required properties
  const skills = [
    { imageSrc: '/assets/Blender.jpg', captionText: 'Test Image', progressBarValue: 100 },
    { imageSrc: 'path_to_skill_image_2.jpg', captionText: 'Skill 2', progressBarValue: 60 },
    { imageSrc: 'path_to_skill_image_3.jpg', captionText: 'Skill 3', progressBarValue: 90 },
    { imageSrc: 'path_to_skill_image_4.jpg', captionText: 'Skill 4', progressBarValue: 70 },
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
            containerHeight="300px"  // Adjust container height
            containerWidth="250px"   // Adjust container width
            scaleOnHover={1.1}       // Adjust scale on hover
            rotateAmplitude={14}     // Adjust rotation amplitude
            displayOverlayContent={true} // Show overlay content
            overlayContent={<div>More Info About {skill.captionText}</div>}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
