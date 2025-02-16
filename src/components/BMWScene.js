import React, { useEffect } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const BMWScene = () => {
  const { scene, cameras } = useGLTF('./assets/BMW.glb');
  const { set, camera } = useThree();

  useEffect(() => {
    if (cameras.length > 0) {
      camera.position.copy(cameras[0].position);
      camera.fov = cameras[0].fov;
      camera.near = cameras[0].near;
      camera.far = cameras[0].far;
      camera.updateProjectionMatrix();
      set({ camera });
      console.log("🚀 Using GLB Camera for BMW:", camera);
    } else {
      camera.position.set(4, 3, 6);
      camera.lookAt(0, 0, 0);
      console.log("⚠️ No GLB Camera found! Using fallback.");
    }
  }, [cameras, set, camera]);

  return (
    <>
      <primitive object={scene} />
      <OrbitControls enableZoom={true} />
    </>
  );
};

export default BMWScene;
