import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { throttle } from 'lodash';

const TitleBG = () => {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const bigSphereRef = useRef(null);
  const smallSphereRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -2 * aspect, 2 * aspect, 2, -2, 0.1, 1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.LinearSRGBColorSpace;
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

    // Load MatCap textures
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const matCapTextureBig = textureLoader.load('/assets/mattext.png'); // Replace with your matcap texture
    const matCapTextureSmall = textureLoader.load('/assets/mattext.png'); // Replace with your matcap texture

    // Set texture wrapping
    matCapTextureBig.wrapS = matCapTextureBig.wrapT = THREE.ClampToEdgeWrapping;
    matCapTextureSmall.wrapS = matCapTextureSmall.wrapT = THREE.ClampToEdgeWrapping;

    const shaderMaterialBig = new THREE.ShaderMaterial({
      uniforms: {
        tMatCap: { type: 't', value: matCapTextureBig },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
    
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tMatCap;
        varying vec3 vNormal;
        varying vec3 vPosition;
    
        void main() {
          vec3 matCapColor = texture2D(tMatCap, vec2(vNormal.x * 0.5 + 0.5, vNormal.y * 0.5 + 0.5)).rgb;
          gl_FragColor = vec4(matCapColor, 1.0);
        }
      `,
    });
    
    // Same change for the small sphere material:
    const shaderMaterialSmall = new THREE.ShaderMaterial({
      uniforms: {
        tMatCap: { type: 't', value: matCapTextureSmall },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
    
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tMatCap;
        varying vec3 vNormal;
        varying vec3 vPosition;
    
        void main() {
          vec3 matCapColor = texture2D(tMatCap, vec2(vNormal.x * 0.5 + 0.5, vNormal.y * 0.5 + 0.5)).rgb;
          gl_FragColor = vec4(matCapColor, 1.0);
        }
      `,
    });

    // Create sphere geometries
    const bigSphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const smallSphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

    // Create meshes with ShaderMaterial
    const bigSphere = new THREE.Mesh(bigSphereGeometry, shaderMaterialBig);
    const smallSphere = new THREE.Mesh(smallSphereGeometry, shaderMaterialSmall);

    // Group the spheres for easier management
    const sphereGroup = new THREE.Group();
    sphereGroup.add(bigSphere);
    sphereGroup.add(smallSphere);
    scene.add(sphereGroup);

    bigSphereRef.current = bigSphere;
    smallSphereRef.current = smallSphere;

    // Adjusted throttle for mouse events to reduce frequency
    const handleMouseMove = throttle((event) => {
      const mouseXPosition = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseYPosition = (event.clientY / window.innerHeight) * 2 - 1;

      // Reduced movement intensity for the parallax effect
      const parallaxX = mouseXPosition * 0.1;  // Reduced intensity
      const parallaxY = mouseYPosition * 0.1;  // Reduced intensity

      // Move the camera or background more subtly based on mouse position
      gsap.to(camera.position, { x: parallaxX, y: parallaxY, z: 5, duration: 0.6, ease: 'power3.out' });

      const radius = 1.5;
      const targetX = radius * Math.cos(mouseXPosition * Math.PI);
      const targetY = radius * Math.sin(mouseYPosition * Math.PI);

      gsap.to(smallSphere.position, { x: targetX, y: targetY, z: -1, duration: 0.5, ease: 'power3.out' });
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!isLoading) {
        renderer.render(scene, camera);
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
      matCapTextureBig.dispose();
      matCapTextureSmall.dispose();
      bigSphereGeometry.dispose();
      smallSphereGeometry.dispose();
      bigSphere.material.dispose();
      smallSphere.material.dispose();

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
