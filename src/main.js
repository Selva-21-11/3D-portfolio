document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const titleSection = document.querySelector("#title"); // Assuming title section has the id "title"
    let lastScrollTop = 0; // Store last scroll position

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
            if (section.id === "title") {
                return;
            }

            // When scrolling down
            if (scrollTop > lastScrollTop) {
                // If section is in view (on the screen)
                if (rect.top >= 0 && rect.top <= window.innerHeight / 1.3) {
                    section.style.opacity = 1;
                    section.style.transform = "translateY(0)";
                }
                // When section leaves the view upwards (scroll up past it)
                else if (rect.bottom < 0) {
                    section.style.opacity = 0;
                    section.style.transform = "translateY(50px)";
                }
            }
            // When scrolling up (reverse animation)
            else if (scrollTop < lastScrollTop) {
                // If section enters view from top (scroll up to it)
                if (rect.top >= 0 && rect.top <= window.innerHeight / 1.3) {
                    section.style.opacity = 1;
                    section.style.transform = "translateY(0)";
                }
                // When section goes out of view (scroll up past it)
                else if (rect.bottom > window.innerHeight) {
                    section.style.opacity = 0;
                    section.style.transform = "translateY(50px)";
                }
            }
        });

        // Update the last scroll position
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    // Function to animate background gradient based on scroll
    const animateBackgroundGradient = () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollY / maxScroll;

        // Calculate gradient based on scroll
        const startColor = `#FFFFFF`;
        const midColor = `#6284FF`;
        const endColor = `#FF0000`;

        const newGradient = `linear-gradient(180deg, ${startColor} 0%, ${mixColors(midColor, startColor, scrollPercentage)} 50%, ${mixColors(endColor, midColor, scrollPercentage)} 100%)`;

        // Update background gradient
        document.body.style.background = newGradient;
    };

    // Function to mix two colors based on a percentage
    const mixColors = (color1, color2, percentage) => {
        const hexToRgb = (hex) => {
            let r = parseInt(hex.substr(1, 2), 16);
            let g = parseInt(hex.substr(3, 2), 16);
            let b = parseInt(hex.substr(5, 2), 16);
            return { r, g, b };
        };

        const rgbToHex = (r, g, b) => {
            return `#${(1 << 24) + (r << 16) + (g << 8) + b}.toString(16).slice(1).toUpperCase()`;
        };

        const color1Rgb = hexToRgb(color1);
        const color2Rgb = hexToRgb(color2);

        const r = Math.round(color1Rgb.r + (color2Rgb.r - color1Rgb.r) * percentage);
        const g = Math.round(color1Rgb.g + (color2Rgb.g - color1Rgb.g) * percentage);
        const b = Math.round(color1Rgb.b + (color2Rgb.b - color1Rgb.b) * percentage);

        return rgbToHex(r, g, b);
    };

    // Set up scroll listeners
    window.addEventListener("scroll", () => {
        animateSectionsOnScroll();
        animateBackgroundGradient();
    });

    // Initial animation for title and sections
    animateTitleOnLoad();
    animateSectionsOnScroll();
    animateBackgroundGradient();
});
