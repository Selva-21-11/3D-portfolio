import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { throttle } from 'lodash';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

const TitleBG = () => {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const bigSphereRef = useRef(null);
  const smallSphereRef = useRef(null);
  const composerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -2 * aspect, 2 * aspect, 2, -2, 0.1, 1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    document.getElementById('hero').appendChild(renderer.domElement);
    rendererRef.current = renderer;
    cameraRef.current = camera;
    sceneRef.current = scene;
    camera.position.z = 5;

    // Set up the loading manager
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => console.log("Loading started...");
    loadingManager.onLoad = () => {
      console.log("Loading complete!");
      setIsLoading(false);

      // Trigger popup animation after loading
      gsap.fromTo(bigSphereRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1, ease: 'power3.out' });
      gsap.fromTo(smallSphereRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1, ease: 'power3.out' });
    };

    // Load MatCap texture
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const matCapTexture = textureLoader.load('/assets/mattext.png'); // Replace with the path to your MatCap PNG file

    // Create materials using MatCap texture
    const matCapMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });

    // Create sphere geometries with lower detail (to optimize)
    const bigSphereGeometry = new THREE.SphereGeometry(1, 32, 32);  // Lower segments
    const smallSphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);  // Lower segments

    // Create meshes with MatCap material
    const bigSphere = new THREE.Mesh(bigSphereGeometry, matCapMaterial);
    const smallSphere = new THREE.Mesh(smallSphereGeometry, matCapMaterial);

    // Group the spheres for easier management
    const sphereGroup = new THREE.Group();
    sphereGroup.add(bigSphere);
    sphereGroup.add(smallSphere);
    scene.add(sphereGroup);

    bigSphereRef.current = bigSphere;
    smallSphereRef.current = smallSphere;

    // Basic lights (not necessary for MatCap material, but kept for completeness)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Adjusted throttle for mouse events to reduce frequency
    const handleMouseMove = throttle((event) => {
      const mouseXPosition = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseYPosition = (event.clientY / window.innerHeight) * 2 - 1;

      // Reduced movement intensity for the parallax effect
      const parallaxX = mouseXPosition * 0.1;  // Reduced intensity
      const parallaxY = mouseYPosition * 0.1;  // Reduced intensity

      // Move the camera or background more subtly based on mouse position
      gsap.to(camera.position, { x: parallaxX, y: parallaxY, z: 5, duration: 0.6, ease: 'power3.out' });

      // Optional: you can also move other elements for the parallax effect
      const radius = 1;
      const targetX = radius * Math.cos(mouseXPosition * Math.PI);
      const targetY = radius * Math.sin(mouseYPosition * Math.PI);

      gsap.to(smallSphere.position, { x: targetX, y: targetY, z: -1, duration: 0.5, ease: 'power3.out' });
    }, 100);  // Increased throttle for less frequent updates

    window.addEventListener('mousemove', handleMouseMove);

    // Post-processing setup (optimized FilmPass)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new FilmPass(0.2, 0.05, 648, false));  // Adjusted strength for less computation
    composerRef.current = composer;

    // Animation loop
    const animate = () => {
      if (!isLoading) {
        composer.render();
      }
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handling
    const onWindowResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -2 * aspect;
      camera.right = 2 * aspect;
      camera.top = 2;
      camera.bottom = -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup function (unload)
    const unload = () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', handleMouseMove);

      // Dispose of materials, geometries, and textures
      matCapTexture.dispose();
      bigSphereGeometry.dispose();
      smallSphereGeometry.dispose();
      bigSphere.material.dispose();
      smallSphere.material.dispose();

      // Dispose of post-processing composer
      composerRef.current && composerRef.current.dispose();

      // Clear scene
      scene.clear();
      renderer.dispose();
    };

    // Call unload function on component unmount
    return () => {
      unload();
    };
  }, [isLoading]);

  return (
    <div>
      {isLoading && (
        <div className="loading-screen">
          <h3>Loading...</h3>
        </div>
      )}
    </div>
  );
};

export default TitleBG;
