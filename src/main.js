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


// Function to animate the title text letter by letter
const animateTextLetterByLetter = () => {
    const welcomeText = document.querySelector(".welcome-text");
    const portfolioText = document.querySelector(".portfolio-text");
    const careerText = document.querySelector(".career-text");
    const exploreButton = document.querySelector(".btn.explore");

    if (!welcomeText || !portfolioText || !careerText || !exploreButton) {
        console.warn('Text or button elements not found');
        return; // Ensure the title elements exist
    }

    const welcomeLetters = welcomeText.querySelectorAll('span');
    const portfolioLetters = portfolioText.querySelectorAll('span');
    const careerLetters = careerText.querySelectorAll('span');

    // Set initial transition for the button
    exploreButton.style.transition = "transform 0.3s ease, opacity 0.3s ease";

    // Button animation on page load
    exploreButton.style.opacity = 1;
    exploreButton.style.transform = "translateY(0)";

    // Add hover effect via JavaScript
    exploreButton.addEventListener("mouseenter", () => {
        exploreButton.style.transform = "scale(1.1)";
    });

    exploreButton.addEventListener("mouseleave", () => {
        exploreButton.style.transform = "scale(1)";
    });

    // Trigger the animation for "WELCOME TO MY"
    welcomeLetters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.transition = "transform 1s ease, opacity 1s ease";
            letter.style.opacity = 1;
            letter.style.transform = "translateY(0)";
        }, index * 100); // Adding delay to each letter animation
    });

    // Trigger the animation for "PORTFOLIO"
    portfolioLetters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.transition = "transform 1s ease, opacity 1s ease";
            letter.style.opacity = 1;
            letter.style.transform = "translateY(0)";
        }, index * 100); // Adding delay to each letter animation
    });

    // Trigger the animation for ".career-text"
    careerLetters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.transition = "transform 0.5s ease, opacity 0.5s ease";
            letter.style.opacity = 1;
            letter.style.transform = "translateY(0)";
        }, index * 100); // Adding delay to each letter animation
    });
};

// Ensure the animation function runs after the page loads
window.addEventListener("load", () => {
    animateTextLetterByLetter();
});

    // Function to animate title section on page load
    const animateTitleOnLoad = () => {
        titleSection.style.opacity = 1;
        titleSection.style.transform = "translateY(0)";
        titleSection.style.transition = "opacity 1s, transform 1s";
    };

    // Add default styles to sections
    sections.forEach((section) => {
        if (section.id !== "hero") {
            section.style.opacity = 0;
            section.style.transform = "translateY(50px)";
            section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }
    });

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

    let popupRenderer, popupScene, popupCamera, model;
    let isAnimating = false; // Initialize isAnimating
    let backgroundScene, backgroundCamera, backgroundRenderer;
    let mouseX = 0, mouseY = 0; // Store normalized mouse position
    let targetX = 0, targetY = 0; // Target positions for camera movement
    
    const initializeBackgroundScene = () => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
    
        backgroundScene = new THREE.Scene();
    
        // Set up the OrthographicCamera
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 20;
        backgroundCamera = new THREE.OrthographicCamera(
            -frustumSize * aspect / 2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            -frustumSize / 2,
            0.1,
            1000
        );
        backgroundCamera.position.set(0, 0, 10);
        backgroundCamera.lookAt(0, 0, 0);
    
        backgroundRenderer = new THREE.WebGLRenderer({ alpha: true });
        backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
        backgroundRenderer.shadowMap.enabled = true;
        backgroundRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
        heroSection.appendChild(backgroundRenderer.domElement);
    
        // Add soft lighting
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
        hemisphereLight.position.set(0, 20, 0);
        backgroundScene.add(hemisphereLight);
    
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        backgroundScene.add(ambientLight);
    
        const spotLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 0.1, 2);
        spotLight.position.set(10, 10, 10);
        spotLight.castShadow = true;
        backgroundScene.add(spotLight);
    
        // Add background shapes
        window.backgroundShapes = add3DBackgroundShapes();
    
        // Event listener for mouse movement
        window.addEventListener('mousemove', onMouseMove);
    };
    
    const onMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to 1 range
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize to -1 to 1 range
    };
    
    const add3DBackgroundShapes = () => {
        // Big circle material
        const bigCircleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x7A1CAC,
            roughness: 0.4,
            metalness: 0.5,
            clearcoat: 0.8,
            clearcoatRoughness: 1,
            reflectivity: 0.7,
        });
    
        const bigCircleGeometry = new THREE.SphereGeometry(7, 64, 64);
        const bigCircle = new THREE.Mesh(bigCircleGeometry, bigCircleMaterial);
        bigCircle.position.set(0, 0, -5);
        bigCircle.castShadow = true;
        backgroundScene.add(bigCircle);
    
        // Small circle material
        const smallCircleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2E073F,
            roughness: 0.1,
            metalness: 0.6,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            reflectivity: 0.8,
        });
    
        const smallCircleGeometry = new THREE.SphereGeometry(3, 64, 64);
        const smallCircle = new THREE.Mesh(smallCircleGeometry, smallCircleMaterial);
        smallCircle.position.set(4, 0, -10);
        smallCircle.castShadow = true;
        backgroundScene.add(smallCircle);
    
        return { bigCircle, smallCircle };
    };
    
    const animateBackgroundShapes = () => {
        if (window.backgroundShapes) {
            const distanceFromCenter = 5;
            window.backgroundShapes.smallCircle.position.x =
                window.backgroundShapes.bigCircle.position.x + distanceFromCenter * Math.cos(mouseX * Math.PI * 2);
            window.backgroundShapes.smallCircle.position.y =
                window.backgroundShapes.bigCircle.position.y + distanceFromCenter * Math.sin(mouseY * Math.PI * 2);
        }
    };
    
    // Advanced parallax effect
    const applyAdvancedParallaxEffect = () => {
        if (!backgroundScene || !backgroundCamera) return;
    
        // Easing for smooth transitions
        const easingFactor = 0.05;
    
        // Target positions based on mouse movement and depth
        const targetOffsetX = mouseX * 2; // Amplify movement along X
        const targetOffsetY = mouseY * 2; // Amplify movement along Y
        const targetOffsetZ = -5 + mouseY * 2; // Depth movement (Z)
    
        // Smoothly transition the camera position
        targetX += (targetOffsetX - targetX) * easingFactor;
        targetY += (targetOffsetY - targetY) * easingFactor;
    
        // Move the camera position and target
        backgroundCamera.position.x = targetX;
        backgroundCamera.position.y = targetY;
        backgroundCamera.position.z = 10 + targetOffsetZ;
        backgroundCamera.lookAt(0, 0, 0);
    
    };
    
    // Render loop with advanced parallax
    const renderBackgroundWithParallax = () => {
        requestAnimationFrame(renderBackgroundWithParallax);
        animateBackgroundShapes();
        applyAdvancedParallaxEffect();
        backgroundRenderer.render(backgroundScene, backgroundCamera);
    };
    
    // Initialize and start the scene
    initializeBackgroundScene();
    renderBackgroundWithParallax();
    

// Initialize popup 3D scene
const initializePopupScene = () => {
    popupScene = new THREE.Scene();

    // Initialize Orthographic camera with initial aspect ratio
    const aspect = popupContainer.clientWidth / popupContainer.clientHeight;
    const frustumSize = 10;  // Adjust this value to control the visible area size

    popupCamera = new THREE.OrthographicCamera(
        -frustumSize * aspect / 2, // Left
        frustumSize * aspect / 2,  // Right
        frustumSize / 2,           // Top
        -frustumSize / 2,          // Bottom
        0.1,                       // Near clipping plane
        1000                       // Far clipping plane
    );

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
    
    const aspect = width / height;
    const frustumSize = 10;  // The same value used to initialize the camera
    
    popupCamera.left = -frustumSize * aspect / 2;
    popupCamera.right = frustumSize * aspect / 2;
    popupCamera.top = frustumSize / 2;
    popupCamera.bottom = -frustumSize / 2;
    
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

// Start rendering the popup scene
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
    document.querySelectorAll('section').forEach((section, index) => {
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
    
        // Fix horizontal positions (left and right edges)
        lightLeft.style.position = 'absolute';
        lightLeft.style.left = `-${parseInt(size) / 2}px`; // Off-screen on the left
        lightRight.style.position = 'absolute';
        lightRight.style.right = `-${parseInt(size) / 2}px`; // Off-screen on the right
    
        // Set a fixed vertical position for both lights (no randomness)
        lightLeft.style.top = '50%'; // Center vertically
        lightRight.style.top = '50%'; // Center vertically
    
        // Set specific colors based on the section index
        let lightColorLeft, lightColorRight;
    
        switch (index) {
            case 0:
                lightColorLeft = '#EBD3F8';
                lightColorRight = '#AD49E1';
                break;
            case 1:
                lightColorLeft = 'violet';
                lightColorRight = 'violet';
                break;
            case 2:
                lightColorLeft = 'blue';
                lightColorRight = 'blue';
                break;
            case 3:
                lightColorLeft = 'white';
                lightColorRight = 'white';
                break;
            default:
                lightColorLeft = 'gray'; // Default color (if needed)
                lightColorRight = 'gray'; // Default color (if needed)
        }
    
        // Apply the color to the lights
        lightLeft.style.backgroundColor = lightColorLeft;
        lightRight.style.backgroundColor = lightColorRight;
    
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
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    // Intersection Observer setup
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // If the section is in the viewport
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0)";
                } else {
                    // If the section is out of the viewport
                    entry.target.style.opacity = 0;
                    entry.target.style.transform = "translateY(50px)";
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of the section is visible
        }
    );

    // Observe each section except the hero section
    sections.forEach((section) => {
        if (section.id !== "hero") {
            // Set initial hidden state
            section.style.opacity = 0;
            section.style.transform = "translateY(50px)";
            section.style.transition = "opacity 0.8s ease, transform 0.8s ease";

            // Add the section to the observer
            observer.observe(section);
        }
    });
});
