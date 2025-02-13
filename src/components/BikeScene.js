import React, { useEffect } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const BikeScene = () => {
  const { scene, cameras, lights, environment } = useGLTF('./assets/Bike.glb');
  const { set, camera, gl } = useThree();

  useEffect(() => {
    // Use the camera from the GLB model if available
    if (cameras.length > 0) {
      set({ camera: cameras[0] });
      console.log("🚀 Using GLB Camera for Bike:", {
        fov: cameras[0].fov,
        position: cameras[0].position.toArray(),
        near: cameras[0].near,
        far: cameras[0].far
      });
    } else {
      // Fallback to a default camera if no camera is found in the GLB model
      camera.position.set(3, 2, 5);
      camera.lookAt(0, 0, 0);
      console.log("⚠️ No GLB Camera found! Using fallback camera:", {
        fov: camera.fov,
        position: camera.position.toArray(),
        near: camera.near,
        far: camera.far
      });
    }

    // Traverse through the scene and add punctual lights from GLB model
    scene.traverse((child) => {
      if (child.isLight) {
        // Check if the light is punctual (e.g., point, spot, or directional light)
        if (child.isPointLight || child.isSpotLight || child.isDirectionalLight) {
          // Adjust intensity (you can customize the intensity control here)
          child.intensity = 1.5; // Set the intensity to a desired level (you can change this value)
          console.log(`💡 Adjusted light intensity: ${child.intensity}`);
        }
        scene.add(child); // Add the light to the scene as it is in the GLB
      }
    });

    // Apply environment map if available in the GLB
    if (environment) {
      scene.environment = environment;
      gl.setEnvironmentMap(scene.environment);
      console.log("🌍 Environment Map Applied from GLB!");
    }

  }, [cameras, set, camera, scene, lights, environment, gl]);

  return (
    <>
      <primitive object={scene} />
      <OrbitControls enableZoom={true} />
    </>
  );
};

export default BikeScene;
