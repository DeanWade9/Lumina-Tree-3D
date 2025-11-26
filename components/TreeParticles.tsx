import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TreeConfig } from '../types';

interface TreeParticlesProps {
  config: TreeConfig;
}

const TreeParticles: React.FC<TreeParticlesProps> = ({ config }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate particle positions and random attributes
  const { positions, randoms, colors } = useMemo(() => {
    const pos = new Float32Array(config.particleCount * 3);
    const rnd = new Float32Array(config.particleCount);
    const col = new Float32Array(config.particleCount * 3);
    
    const baseColor = new THREE.Color(config.treeColor);
    const tipColor = new THREE.Color('#ffffff'); // Tips are whiter

    for (let i = 0; i < config.particleCount; i++) {
      // Y position (height), linear distribution
      // Map i to a value between 0 and 1, but biased slightly towards bottom for volume
      const progress = i / config.particleCount;
      const y = (progress * config.treeHeight) - (config.treeHeight / 2);
      
      // Normalized height (0 at bottom, 1 at top)
      const hNorm = (y + config.treeHeight / 2) / config.treeHeight;
      
      // Cone radius at this height
      const currentRadius = config.baseRadius * (1 - hNorm);

      // Spiral angle
      const angle = progress * Math.PI * 2 * config.spiralTurns;

      // Add randomness to spread particles out from the perfect spiral line
      // We use sqrt(random) for uniform circle distribution if we were doing volume,
      // but here we want a fuzzy spiral.
      const randomRadiusOffset = (Math.random() - 0.5) * config.randomness * currentRadius;
      const randomAngleOffset = (Math.random() - 0.5) * config.randomness * 2;
      const randomYOffset = (Math.random() - 0.5) * config.randomness * 0.5;

      const r = Math.max(0.1, currentRadius + randomRadiusOffset); // Ensure min width at top
      const theta = angle + randomAngleOffset;

      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const finalY = y + randomYOffset;

      pos[i * 3] = x;
      pos[i * 3 + 1] = finalY;
      pos[i * 3 + 2] = z;

      rnd[i] = Math.random(); // Used for sparkle phase

      // Color Mixing: Mix base color with white at the top/tips
      const mixedColor = baseColor.clone().lerp(tipColor, Math.pow(hNorm, 3) * 0.5);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return {
      positions: pos,
      randoms: rnd,
      colors: col
    };
  }, [config]);

  // Custom shader for round, sparkling particles
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: config.particleSize * 50 }, // Scale for visibility
    uColor: { value: new THREE.Color(config.treeColor) }
  }), [config.particleSize, config.treeColor]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * config.sparkleSpeed;
      // materialRef.current.uniforms.uColor.value.set(config.treeColor);
    }
    if (pointsRef.current) {
      // Slow rotation of the entire tree
      pointsRef.current.rotation.y += 0.002;
    }
  });

  // GLSL Shaders
  const vertexShader = `
    uniform float uTime;
    uniform float uSize;
    attribute float aRandom;
    attribute vec3 aColor;
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vColor = aColor;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size attenuation based on depth
      gl_PointSize = uSize * (20.0 / -mvPosition.z);

      // Sparkle effect
      float sparkle = sin(uTime * 3.0 + aRandom * 10.0);
      sparkle = smoothstep(0.4, 1.0, sparkle);
      vAlpha = 0.5 + 0.5 * sparkle;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      // Make points round
      vec2 coord = gl_PointCoord - vec2(0.5);
      if(length(coord) > 0.5) discard;

      // Soft edge
      float strength = 1.0 - (length(coord) * 2.0);
      strength = pow(strength, 1.5);

      gl_FragColor = vec4(vColor, vAlpha * strength);
    }
  `;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={randoms.length}
          array={randoms}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </points>
  );
};

export default TreeParticles;
