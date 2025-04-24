import React, { useRef, useState, useEffect, useCallback } from "react";
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard";

const skillsData = [
  { imageSrc: "./assets/Blender.webp", captionText: "Blender", progressBarValue: 80, leveltext: "Expertise" },
  { imageSrc: "./assets/unreal-engine.webp", captionText: "Unreal Engine", progressBarValue: 60, leveltext: "Beginner" },
  { imageSrc: "./assets/adobe-photoshop.webp", captionText: "Photoshop", progressBarValue: 80, leveltext: "Intermediate" },
  { imageSrc: "./assets/Verge3d.webp", captionText: "Verge3D", progressBarValue: 60, leveltext: "Intermediate" },
  { imageSrc: "./assets/Html.webp", captionText: "HTML", progressBarValue: 60, leveltext: "Intermediate" },
  { imageSrc: "./assets/CSS.webp", captionText: "CSS", progressBarValue: 60, leveltext: "Intermediate" },
  { imageSrc: "./assets/Javascript.webp", captionText: "JavaScript", progressBarValue: 60, leveltext: "Expertise" },
  { imageSrc: "./assets/VR.webp", captionText: "XR Technology", progressBarValue: 60, leveltext: "Intermediate" },
];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback(([entry]) => {
    if (entry.isIntersecting) setIsVisible(true);
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const currentSection = sectionRef.current;

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [handleIntersection]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills-section ${isVisible ? "animate" : ""}`}
    >
      <div className="skills-container-wrapper">
        <div className="skills-container">
          {skillsData.map(({ imageSrc, captionText, progressBarValue, leveltext }, index) => (
            <TiltedCard
              key={index}
              imageSrc={imageSrc}
              captionText={captionText}
              progressBarValue={progressBarValue}
              containerHeight="200px"
              containerWidth="200px"
              scaleOnHover={1.1}
              rotateAmplitude={14}
              displayOverlayContent
              overlayContent={<div>{leveltext}</div>}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
