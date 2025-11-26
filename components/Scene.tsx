import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import TreeParticles from './TreeParticles';
import Snow from './Snow';
import { TreeConfig } from '../types';

interface SceneProps {
  config: TreeConfig;
}

const Scene: React.FC<SceneProps> = ({ config }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]} // Handle high DPI screens
    >
      <color attach="background" args={['#050505']} />
      
      {/* Controls */}
      <OrbitControls
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableZoom={true}
        maxDistance={40}
        minDistance={5}
      />

      {/* Ambient Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Snow />

      {/* Main Content */}
      <group position={[0, 0, 0]}>
        <TreeParticles config={config} />
      </group>

      {/* Post Processing */}
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0.2}
          mipmapBlur
          intensity={config.bloomIntensity}
          radius={0.6}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene;
