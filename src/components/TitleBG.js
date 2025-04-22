import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { throttle } from 'lodash';

const TitleBG = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const bigSphereRef = useRef(null);
  const smallSphereRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -2 * aspect, 2 * aspect, 2, -2, 0.1, 1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.LinearSRGBColorSpace;
    renderer.physicallyCorrectLights = true;

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    rendererRef.current = renderer;
    cameraRef.current = camera;
    sceneRef.current = scene;

    // Load manager
    const loadingManager = new THREE.LoadingManager();

    // Load textures
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const matCapTexture = textureLoader.load('./assets/mattext.webp');
    matCapTexture.wrapS = matCapTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Shader Material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tMatCap: { value: matCapTexture },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tMatCap;
        varying vec3 vNormal;
        void main() {
          vec3 matCapColor = texture2D(tMatCap, vec2(vNormal.x * 0.5 + 0.5, vNormal.y * 0.5 + 0.5)).rgb;
          gl_FragColor = vec4(matCapColor, 1.0);
        }
      `
    });

    const bigSphere = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), shaderMaterial);
    const smallSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), shaderMaterial.clone());

    const group = new THREE.Group();
    group.add(bigSphere);
    group.add(smallSphere);
    scene.add(group);

    bigSphereRef.current = bigSphere;
    smallSphereRef.current = smallSphere;

    const handleMouseMove = throttle((event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      const radius = 1.6;
      const angle = Math.atan2(mouseY, mouseX);
      const targetX = radius * Math.cos(angle);
      const targetY = radius * Math.sin(angle);

      gsap.to(smallSphere.position, {
        x: targetX,
        y: targetY,
        z: -1,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(camera.position, {
        x: mouseX * 0.1,
        y: mouseY * 0.1,
        z: 5,
        duration: 0.6,
        ease: 'power3.out',
      });
    }, 100);

    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -2 * aspect;
      camera.right = 2 * aspect;
      camera.top = 2;
      camera.bottom = -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    loadingManager.onLoad = () => {
      setIsLoading(false);
      gsap.fromTo(bigSphere.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1 });
      gsap.fromTo(smallSphere.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1 });
      animate();
    };

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();

      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.isMaterial) {
            child.material.dispose();
          }
        }
      });

      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} id="hero">
      {isLoading && (
        <div className="loading-screen">
          <h3>Loading...</h3>
        </div>
      )}
    </div>
  );
};

export default TitleBG;
