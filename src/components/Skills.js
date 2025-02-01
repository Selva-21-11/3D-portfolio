import React, { useRef, useEffect } from 'react';
import TiltedCard from '../blocks/Components/TiltedCard/TiltedCard'; // Import the TiltedCard component


const SkillsSection = () => {
  const skills = [
    { imageSrc: '/assets/Blender.png', captionText: 'Blender', progressBarValue: 80 },
    { imageSrc: '/assets/unreal-engine.png', captionText: 'Unreal Engine', progressBarValue: 60 },
    { imageSrc: '/assets/adobe-photoshop.png', captionText: 'Photoshop', progressBarValue: 80 },
    { imageSrc: '/assets/adobe-photoshop.png', captionText: 'Photoshop', progressBarValue: 80 },
    { imageSrc: '/assets/unreal-engine.png', captionText: 'Unreal Engine', progressBarValue: 60 },
    { imageSrc: '/assets/unreal-engine.png', captionText: 'Unreal Engine', progressBarValue: 60 },
    { imageSrc: '/assets/unreal-engine.png', captionText: 'Unreal Engine', progressBarValue: 60 },
    { imageSrc: '/assets/unreal-engine.png', captionText: 'Unreal Engine', progressBarValue: 60 },
  ];

  const sectionRef = useRef(null); // Reference for the whole skills section

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const { offsetWidth: width, offsetHeight: height } = sectionRef.current;

    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate the relative mouse position
    const deltaX = (mouseX - centerX) / centerX;
    const deltaY = (mouseY - centerY) / centerY;

    // Apply even more subtle 3D effect on the entire skills section
    sectionRef.current.style.transform = `perspective(1200px) rotateX(${deltaY * 2}deg) rotateY(${deltaX * 2}deg)`;
  };

  useEffect(() => {
    const section = sectionRef.current;

    // Add event listener for mousemove
    const onMouseMove = (e) => {
      requestAnimationFrame(() => handleMouseMove(e)); // Smooth, real-time changes
    };

    section.addEventListener('mousemove', onMouseMove);

    // Cleanup the event listener when the component is unmounted
    return () => {
      section.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section className="skills-section" ref={sectionRef}>


      {/* Glass effect container with camera perspective */}
      <div className="skills-container-wrapper">
        <div className="skills-container">
          {skills.map((skill, index) => (
            <TiltedCard
              key={index}
              imageSrc={skill.imageSrc}
              captionText={skill.captionText}
              progressBarValue={skill.progressBarValue}
              containerHeight="200px"
              containerWidth="200px"
              scaleOnHover={1.1}
              rotateAmplitude={14}
              displayOverlayContent={true}
              overlayContent={<div>{skill.captionText}</div>}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
