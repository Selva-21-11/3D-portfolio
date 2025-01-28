import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeDScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(150, 150); // Small canvas size for the coin
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    const coin = new THREE.Mesh(geometry, material);
    scene.add(coin);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const animate = (event) => {
      const { clientX, clientY } = event;
      const rotationX = (clientY / window.innerHeight - 0.5) * Math.PI;
      const rotationY = (clientX / window.innerWidth - 0.5) * Math.PI;
      coin.rotation.x = rotationX;
      coin.rotation.y = rotationY;
    };

    document.addEventListener("mousemove", animate);

    const renderScene = () => {
      coin.rotation.z += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(renderScene);
    };
    renderScene();

    return () => {
      document.removeEventListener("mousemove", animate);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={mountRef}></div>;
}

export default ThreeDScene;
