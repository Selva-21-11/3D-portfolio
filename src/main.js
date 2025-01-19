// Import CSS for Webpack to handle bundling
import './styles.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib'; // Import the GLTFLoader from 'three-stdlib'
import { DRACOLoader } from 'three-stdlib';

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
    
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Simple email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // If everything is valid, you can proceed to submit the form
        // For now, we will just log the data to the console
        console.log("Form Submitted", { name, email, message });
        alert("Your message has been sent!");
        contactForm.reset();  // Reset the form
    });

    const modelPopup = document.getElementById("model-popup");
    const closePopupButton = document.getElementById("close-popup");
    const popupContainer = document.getElementById("popup-model-container");
    const loadingMessage = document.getElementById("loading-message");

    if (!loadingMessage) {
        console.error("Loading message element not found!");
        return;
    }

    let scene, camera, renderer, model;
    let isAnimating = false; // Flag to track whether animation is running

    // Function to initialize the 3D scene
    const initializeScene = () => {
        // Create the scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 5); // Make sure camera is always set to a good position

        // Create the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        popupContainer.appendChild(renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(ambientLight);
        scene.add(directionalLight);
    };

    // Function to load the 3D model
    const load3DModel = () => {
        loadingMessage.style.display = 'block'; // Show loading message

        if (model) {
            // Dispose of the previous model
            model.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
            scene.remove(model); // Remove the model from the scene
            model = null; // Reset the model variable
        }

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/'); // Path to Draco decoder files

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        loader.load(
            '/models/bmw.glb', // Path to your 3D model
            function (gltf) {
                model = gltf.scene;
                model.scale.set(0.5, 0.5, 0.5); // Scale the model if needed
                scene.add(model); // Add the model to the scene
                loadingMessage.style.display = 'none'; // Hide loading message
                console.log('Model loaded successfully');
                startAnimation(); // Start animation loop
            },
            function (xhr) {
                if (xhr.total > 0) { // Ensure xhr.total is available
                    const percent = (xhr.loaded / xhr.total) * 100;
                    loadingMessage.textContent = `${Math.round(percent)}% loaded`; // Update loading message
                    console.log(`${Math.round(percent)}% loaded`); // Log the percentage
                }
            },
            function (error) {
                console.error('An error happened', error);
                loadingMessage.textContent = 'Failed to load model'; // Update loading message with error
            }
        );
        
        
    };

    // Function to start the animation loop
    const startAnimation = () => {
        if (!isAnimating) {
            isAnimating = true; // Set the flag to true to indicate the animation is running
            animate();
        }
    };

    // Function to animate the model
    const animate = () => {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y += 0.01; // Rotate the model
        }
        renderer.render(scene, camera);
    };

    // Show popup and load the model
    document.querySelectorAll('.view-3d-model').forEach(button => {
        button.addEventListener('click', () => {
            modelPopup.style.display = 'flex'; // Show the popup
            if (!scene) {
                initializeScene(); // Initialize the scene if not already initialized
            }
            load3DModel(); // Load the 3D model inside the popup
        });
    });

    // Close the popup and clean up
    closePopupButton.addEventListener('click', () => {
        modelPopup.style.display = 'none';

        // Clean up the 3D scene to prevent memory leaks
        if (model) {
            model.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
        }
    });

    // Ensure proper positioning and rendering after closing and reopening the popup
    window.addEventListener('resize', () => {
        if (renderer) {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
    });
});
