import React from "react";
import SpotlightCard from "../blocks/Components/SpotlightCard/SpotlightCard"; // Adjust path if needed


const AboutMe = () => {
  return (
    <div className="about-me-container">
      <div className="about-me-content">

                {/* Circular 3D Object for Photo */}
        <div className="profile-circle">
          <img src="./assets/git.png" alt="Profile" className="profile-image" />
        </div>    

        <SpotlightCard className="about-me-card" spotlightColor="rgba(0, 69, 166, 0.25)">
          <div className="about-me-card-content">
            <p className="about-me-text">
              I specialize in 3D modeling, rendering, and animation, bringing ideas to life in the third dimension. My work focuses on precision, realism, and creative storytelling.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default AboutMe;
