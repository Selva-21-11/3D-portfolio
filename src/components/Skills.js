import React, { useRef, useState, useEffect } from "react";
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard"; // Import TiltedCard component

const SkillsSection = () => {
  const skills = [
    { imageSrc: "./assets/Blender.webp", captionText: "Blender", progressBarValue: 80, leveltext: "Expertise" },
    { imageSrc: "./assets/unreal-engine.webp", captionText: "Unreal Engine", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/adobe-photoshop.webp", captionText: "Photoshop", progressBarValue: 80, leveltext: "Expertise" },
    { imageSrc: "./assets/Verge3d.webp", captionText: "Verge3D", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/Html.webp", captionText: "HTML", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/CSS.webp", captionText: "CSS", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/Javascript.webp", captionText: "JavaScript", progressBarValue: 60, leveltext: "Expertise" },
    
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("IntersectionObserver Triggered: ", entry.isIntersecting); // Debug log
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visible state to true
        }
      },
      { threshold: 0.2 } // Trigger animation when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Start observing the section
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Clean up observer
      }
    };
  }, []);

  return (
    <section
      className={`skills-section ${isVisible ? "animate" : ""}`}
      ref={sectionRef}
    >
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
              overlayContent={<div>{skill.leveltext}</div>}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
