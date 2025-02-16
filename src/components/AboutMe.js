import React from "react";
import SpotlightCard from "../blocks/Components/SpotlightCard/SpotlightCard"; // Adjust path if needed
import SlideDownText from "./slidedown";

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <div className="about-me-content">

                {/* Circular 3D Object for Photo */}
        <div className="profile-circle">
          <img src="./assets/About_pic.jpg" alt="Profile" className="profile-image" />
        </div>    

        <SpotlightCard className="about-me-card" spotlightColor="rgba(0, 69, 166, 0.25)">
          <div className="about-me-card-content">
          <p className="about-me-text">
  <SlideDownText text="I’m a 3D artist passionate about transforming ideas into" top="0px" left="0px" />
  <br />
  <SlideDownText text="immersive visual experiences. From intricate modeling" top="0px" left="0px" />
  <br />
  <SlideDownText text="and lifelike animation to cutting-edge AR/VR,  I blend " top="0px" left="0px" />
  <br />
  <SlideDownText text="creativity with technology to bring concepts to life. " top="0px" left="0px" />
  <br />
  <SlideDownText text="Always learning, always evolving, I strive to push the " top="0px" left="0px" />
  <br />
  <SlideDownText text=" boundaries of digital art and interactive design." top="0px" left="0px" />
</p>

          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default AboutMe;
