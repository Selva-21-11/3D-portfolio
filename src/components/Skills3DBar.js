import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Text, OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const skillsData = [
  { name: '3D Modeling', progress: 90 },
  { name: 'Animation', progress: 85 },
  { name: 'Texturing', progress: 80 },
  { name: 'Unity', progress: 70 },
  { name: 'Blender', progress: 95 },
  { name: 'Adobe Photoshop', progress: 75 },
];

const SkillBar = ({ skill, position, height }) => {
  // Animate the height of the bars
  const { scaleY } = useSpring({
    scaleY: height / 100,
    config: { tension: 170, friction: 26 },
  });

  return (
    <group position={position}>
      <Box args={[1, 1, 1]} scale={[1, scaleY, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#4f93e2" />
      </Box>
      <Text position={[0, height / 100 + 0.25, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        {skill.name}
      </Text>
    </group>
  );
};

const Skills3DBarGraph = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} castShadow intensity={1} />
      <OrbitControls />
      {skillsData.map((skill, index) => (
        <SkillBar
          key={index}
          skill={skill}
          position={[index * 2 - 5, 0, 0]} // Position bars horizontally
          height={skill.progress} // Height based on skill level
        />
      ))}
    </Canvas>
  );
};

export default Skills3DBarGraph;
