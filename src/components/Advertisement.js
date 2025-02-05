import React, { useEffect } from "react";


const Advertisement = () => {
  useEffect(() => {
    const adSection = document.querySelector(".advertisement");

    const revealAd = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const adPosition = adSection.offsetTop;

      if (scrollPosition > adPosition + 100) {
        adSection.classList.add("reveal");
      }
    };

    window.addEventListener("scroll", revealAd);
    return () => window.removeEventListener("scroll", revealAd);
  }, []);

  return (
    <>
      {/* Section Divider for Advertisement */}
      <div className="section-divider-ad">
        <h2 className="section-line-ad">Special</h2>
        <h2 className="section-line-ad">Offer</h2>
        <h3 className="section-subline-ad">Check out the latest updates</h3>
      </div>

      {/* Advertisement Section */}
      <section className="advertisement" id="advertisement">
        <h2 className="ad-title">Exclusive Deals & Updates</h2>
        <p className="ad-description">
          Stay updated with my latest works, offers, and collaborations.
        </p>
      </section>
    </>
  );
};

export default Advertisement;
