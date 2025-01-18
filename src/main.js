document.addEventListener("DOMContentLoaded", function () {
    // Ensure the DOM is fully loaded before selecting elements
    const sections = document.querySelectorAll("section");
    const titleSection = document.querySelector("#hero"); // Assuming the title section is "hero"
    const filterButtons = document.querySelectorAll(".portfolio-filters .btn"); // Filter buttons
    const portfolioSections = document.querySelectorAll(".portfolio-section"); // All portfolio subsections
    const portfolioTitle = document.querySelector("#portfolio-title"); // Portfolio Title Section (Make sure this element exists in your HTML)

    // Portfolio content for different types
    const portfolioItems = {
        "3d-model": `
            <h3>3D Models</h3>
            <div class="portfolio-items">
                <div class="portfolio-item">
                    <div class="threejs-container"></div>
                    <p>3D Model 1</p>
                </div>
                <div class="portfolio-item">
                    <div class="threejs-container"></div>
                    <p>3D Model 2</p>
                </div>
            </div>
        `,
        "video-render": `
            <h3>Video Renders</h3>
            <div class="portfolio-items">
                <div class="portfolio-item">
                    <video controls>
                        <source src="video1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <p>Video Render 1</p>
                </div>
                <div class="portfolio-item">
                    <video controls>
                        <source src="video2.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <p>Video Render 2</p>
                </div>
            </div>
        `,
        "image-render": `
            <h3>Image Renders</h3>
            <div class="image-grid">
                <div class="portfolio-item">
                    <img src="image1.jpg" alt="Image Render 1">
                    <p>Image Render 1</p>
                </div>
                <div class="portfolio-item">
                    <img src="image2.jpg" alt="Image Render 2">
                    <p>Image Render 2</p>
                </div>
            </div>
        `
    };

    // Function to animate title section on page load
    const animateTitleOnLoad = () => {
        titleSection.style.opacity = 1;
        titleSection.style.transform = "translateY(0)";
        titleSection.style.transition = "opacity 1s, transform 1s"; // Smooth animation
    };

    // Function to animate sections based on scroll
    const animateSectionsOnScroll = () => {
        let scrollTop = window.scrollY || window.pageYOffset;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            // Skip the title section and apply animation only to others
            if (section.id === "hero") return;

            if (rect.top >= 0 && rect.top <= window.innerHeight / 1.3) {
                section.style.opacity = 1;
                section.style.transform = "translateY(0)";
            } else if (rect.bottom < 0 || rect.top > window.innerHeight) {
                section.style.opacity = 0;
                section.style.transform = "translateY(50px)";
            }
        });
    };

    // Portfolio filtering functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            console.log("Button clicked:", e.target); // Log the clicked button
            const filterType = e.target.getAttribute("data-filter");

            // Check if the filterType exists
            if (!filterType) {
                console.error("No data-filter attribute on the button");
                return;
            }

            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Show/Hide sections based on the selected filter
            portfolioSections.forEach(section => {
                if (section.id.includes(filterType) || filterType === 'all') {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            });

            // Set the portfolio section title based on the filter
            if (portfolioTitle) {
                portfolioTitle.innerHTML = `My Portfolio - ${filterType.replace("-", " ").toUpperCase()}`;
            }
        });
    });

    // Initial load animations
    animateTitleOnLoad();
    animateSectionsOnScroll();

    // Scroll event to animate sections
    window.addEventListener("scroll", () => {
        animateSectionsOnScroll();
    });
});
