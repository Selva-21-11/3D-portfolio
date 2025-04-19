import React, { useRef, useState, useEffect } from "react";
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard"; // Import TiltedCard component

const SkillsSection = () => {
  const skills = [
    { imageSrc: "./assets/Blender.png", captionText: "Blender", progressBarValue: 80, leveltext: "Expertise" },
    { imageSrc: "./assets/unreal-engine.png", captionText: "Unreal Engine", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/adobe-photoshop.png", captionText: "Photoshop", progressBarValue: 80, leveltext: "Expertise" },
    { imageSrc: "./assets/Html.png", captionText: "HTML", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/CSS.png", captionText: "CSS", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/Javascript.png", captionText: "JavaScript", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/Verge3d.png", captionText: "Verge3D", progressBarValue: 60, leveltext: "Expertise" },
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
