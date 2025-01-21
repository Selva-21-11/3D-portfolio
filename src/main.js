import './styles.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';

document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll("section");
    const titleSection = document.querySelector("#hero");
    const filterButtons = document.querySelectorAll(".portfolio-filters .btn");
    const portfolioSections = document.querySelectorAll(".portfolio-section");
    const portfolioTitle = document.querySelector("#portfolio-title");

    // Portfolio items code remains unchanged

    // Function to animate title section on page load
    const animateTitleOnLoad = () => {
        titleSection.style.opacity = 1;
        titleSection.style.transform = "translateY(0)";
        titleSection.style.transition = "opacity 1s, transform 1s";
    };

    const animateSectionsOnScroll = () => {
        let scrollTop = window.scrollY || window.pageYOffset;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();

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

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const filterType = e.target.getAttribute("data-filter");
            if (!filterType) return;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            portfolioSections.forEach(section => {
                section.style.display = section.id.includes(filterType) || filterType === 'all' ? "block" : "none";
            });

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

        console.log("Form Submitted", { name, email, message });
        alert("Your message has been sent!");
        contactForm.reset();
    });

    const modelPopup = document.getElementById("model-popup");
    const closePopupButton = document.getElementById("close-popup");
    const popupContainer = document.getElementById("popup-model-container");
    const loadingMessage = document.getElementById("loading-message");

    let backgroundRenderer, backgroundScene, backgroundCamera;
    let popupRenderer, popupScene, popupCamera, model;
    let isAnimating = false; // Initialize isAnimating

    // Initialize background 3D scene
    const initializeBackgroundScene = () => {
        backgroundScene = new THREE.Scene();
        backgroundCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        backgroundCamera.position.set(0, 0, 5);

        backgroundRenderer = new THREE.WebGLRenderer({ alpha: true });
        backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(backgroundRenderer.domElement);  // Attach to body for background rendering

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        backgroundScene.add(ambientLight);
        backgroundScene.add(directionalLight);

        // Add background 3D shapes (cube, sphere, pyramid)
        add3DBackgroundShapes();
    };

    const add3DBackgroundShapes = () => {
        // Cube shape
        const geometry1 = new THREE.BoxGeometry();
        const material1 = new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.5 });
        const cube = new THREE.Mesh(geometry1, material1);
        cube.position.set(-2, 0, -5);
        backgroundScene.add(cube);

        // Sphere shape
        const geometry2 = new THREE.SphereGeometry(0.7, 32, 32);
        const material2 = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.5 });
        const sphere = new THREE.Mesh(geometry2, material2);
        sphere.position.set(2, 0, -5);
        backgroundScene.add(sphere);

        // Pyramid shape (Cone)
        const geometry3 = new THREE.ConeGeometry(0.7, 1.5, 4);
        const material3 = new THREE.MeshStandardMaterial({ color: 0x0000ff, roughness: 0.5 });
        const pyramid = new THREE.Mesh(geometry3, material3);
        pyramid.position.set(0, 2, -5);
        backgroundScene.add(pyramid);

        // Store shapes for animation
        window.backgroundShapes = { cube, sphere, pyramid };
    };

    // Start rendering the background scene
    const renderBackground = () => {
        requestAnimationFrame(renderBackground);
        animateBackgroundShapes(); // Animate the shapes
        backgroundRenderer.render(backgroundScene, backgroundCamera);
    };

    const animateBackgroundShapes = () => {
        if (window.backgroundShapes) {
            // Rotate each shape to create animation
            window.backgroundShapes.cube.rotation.y += 0.01;
            window.backgroundShapes.sphere.rotation.x += 0.01;
            window.backgroundShapes.pyramid.rotation.z += 0.01;
        }
    };

  // Initialize popup 3D scene
const initializePopupScene = () => {
    popupScene = new THREE.Scene();

    // Initialize camera with initial aspect ratio
    popupCamera = new THREE.PerspectiveCamera(75, popupContainer.clientWidth / popupContainer.clientHeight, 0.1, 1000);
    popupCamera.position.z = 5;

    popupRenderer = new THREE.WebGLRenderer({ alpha: true });
    popupRenderer.setSize(popupContainer.clientWidth, popupContainer.clientHeight);
    popupContainer.appendChild(popupRenderer.domElement); // Attach canvas to the container

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    popupScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    popupScene.add(directionalLight);

    // Update camera aspect ratio on window resize
    window.addEventListener('resize', updateCameraAspectRatio);
};

// Function to update the camera aspect ratio on window resize
const updateCameraAspectRatio = () => {
    const width = popupContainer.clientWidth;
    const height = popupContainer.clientHeight;
    
    popupCamera.aspect = width / height;
    popupCamera.updateProjectionMatrix(); // Recalculate projection matrix

    // Update renderer size
    popupRenderer.setSize(width, height);
};

// Load the 3D model
const load3DModel = (modelPath) => {
    loadingMessage.style.display = 'block';

    if (model) {
        model.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
        popupScene.remove(model);
        model = null;
    }

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
        modelPath,
        (gltf) => {
            model = gltf.scene;

            // Use the camera embedded in the GLB file, if available
            const embeddedCamera = gltf.cameras?.[0];
            if (embeddedCamera) {
                popupCamera = embeddedCamera; // Replace the default camera with the embedded one
                popupCamera.aspect = popupContainer.clientWidth / popupContainer.clientHeight; // Ensure aspect ratio is correct
                popupCamera.updateProjectionMatrix(); // Update projection matrix
            } else {
                console.warn('No camera found in the GLB file. Using default popup camera.');
            }

            // Adjust model scale if necessary and position it
            model.scale.set(1, 1, 1); // Ensure the model is scaled properly
            model.position.set(0, 0, 0); // Center the model in the scene
            popupScene.add(model);

            loadingMessage.style.display = 'none';
            startPopupAnimation();
        },
        (xhr) => {
            if (xhr.total > 0) {
                const percent = (xhr.loaded / xhr.total) * 100;
                loadingMessage.textContent = `${Math.round(percent)}% loaded`;
            }
        },
        (error) => {
            console.error('An error happened', error);
            loadingMessage.textContent = 'Failed to load model';
        }
    );
};
    

    const startPopupAnimation = () => {
        if (!isAnimating) {
            isAnimating = true;
            renderPopupScene();
        }
    };

    const renderPopupScene = () => {
        requestAnimationFrame(renderPopupScene);
        if (model) {
            model.rotation.y += 0.01;
        }
        popupRenderer.render(popupScene, popupCamera);
    };

    document.querySelectorAll('.view-3d-model').forEach(button => {
        button.addEventListener('click', () => {
            modelPopup.style.display = 'flex';
            if (!popupScene) {
                initializePopupScene(); // Initialize popup scene
            }
            load3DModel('../public/models/bmw.glb');
        });
    });

    closePopupButton.addEventListener('click', () => {
        modelPopup.style.display = 'none';
        if (model) {
            model.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
        }
    });

    // Close the popup when clicking on the background (popupContainer)
popupContainer.addEventListener('click', (event) => {
    // Only close if the click is directly on the background (not on the popup content itself)
    if (event.target === popupContainer) {
        modelPopup.style.display = 'none'; // Hide the popup
        if (model) {
            model.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
        }
    }
});
    

    window.addEventListener('resize', () => {
        if (backgroundRenderer) {
            backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
            backgroundCamera.aspect = window.innerWidth / window.innerHeight;
            backgroundCamera.updateProjectionMatrix();
        }

        if (popupRenderer) {
            popupRenderer.setSize(popupContainer.clientWidth, popupContainer.clientHeight);
            popupCamera.aspect = popupContainer.clientWidth / popupContainer.clientHeight;
            popupCamera.updateProjectionMatrix();
        }
    });

    // Initialize the background scene immediately on page load
    initializeBackgroundScene();
    renderBackground();

    document.querySelectorAll('section').forEach((section) => {
        // Create two div elements for the lights
        const lightLeft = document.createElement('div');
        const lightRight = document.createElement('div');
        lightLeft.classList.add('section-light');
        lightRight.classList.add('section-light');
    
        // Append the lights to the section
        section.appendChild(lightLeft);
        section.appendChild(lightRight);
    
        // Set the size of the lights
        const size = '600px'; // Fixed size for lights
    
        // Randomly position lightLeft on the left edge
        const topPositionLeft = Math.random() * 100; // Randomize top position for left light
        lightLeft.style.position = 'absolute';
        lightLeft.style.left = `-${parseInt(size) / 2}px`; // Off-screen on the left
        lightLeft.style.top = `${topPositionLeft}%`;
    
        // Randomly assign a background position for lightLeft
        const randomBackgroundLeftX = Math.random() * 100; // Horizontal position (0-100%)
        const randomBackgroundLeftY = Math.random() * 100; // Vertical position (0-100%)
        lightLeft.style.backgroundPosition = `${randomBackgroundLeftX}% ${randomBackgroundLeftY}%`;
    
        // Randomly position lightRight on the right edge
        const topPositionRight = Math.random() * 100; // Randomize top position for right light
        lightRight.style.position = 'absolute';
        lightRight.style.right = `-${parseInt(size) / 2}px`; // Off-screen on the right
        lightRight.style.top = `${topPositionRight}%`;
    
        // Randomly assign a background position for lightRight
        const randomBackgroundRightX = Math.random() * 100; // Horizontal position (0-100%)
        const randomBackgroundRightY = Math.random() * 100; // Vertical position (0-100%)
        lightRight.style.backgroundPosition = `${randomBackgroundRightX}% ${randomBackgroundRightY}%`;
    
        // Animation function for smooth wobble effect
        let time = Date.now() / 1000; // Using time for smooth animation pacing
    
        function animateLight(light) {
            // Apply wobble effects for position, scale, and opacity
            let scale = 1 + Math.sin(time) * 0.1; // Smooth scale wobble
            let positionOffset = Math.sin(time * 2) * 50; // Smooth vertical wobble (translateY)
            let opacity = 0.6 + Math.sin(time) * 0.2; // Smooth opacity change
    
            // Apply the wobble animation (translateY for position wobble, scale, and opacity)
            light.style.transform = `translateY(${positionOffset}px) scale(${scale})`;
            light.style.opacity = opacity;
    
            // Increment time for continuous animation
            time += 0.01;
    
            // Use requestAnimationFrame for smooth continuous animation
            requestAnimationFrame(() => animateLight(light));
        }
    
        // Start the animation for both left and right lights
        animateLight(lightLeft);
        animateLight(lightRight);
    });
    
    
});
