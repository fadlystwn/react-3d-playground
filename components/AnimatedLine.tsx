"use client";
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function AnimatedLine() {
  const lineRef = useRef<THREE.Line>(null);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const time = clock.getElapsedTime();
      if (lineRef.current.rotation) {
        lineRef.current.rotation.z = time * 0.5; // Rotate the line over time
      }
    }
  });

  // Define the positions for the line
  const positions = new Float32Array([
    0, 0, 0, // Start point
    1, 1, 0  // End point
  ]);

  // Create the geometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Create the line material with a neon effect
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('cyan') },
      glowColor: { value: new THREE.Color('cyan') },
      viewVector: { value: new THREE.Vector3(0, 0, 1) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * vec4(vPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform vec3 glowColor;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        float intensity = max(dot(normalize(vNormal), normalize(vPosition)), 0.0);
        vec3 finalColor = mix(color, glowColor, intensity * 0.5);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    side: THREE.DoubleSide
  });

  return (
    <line ref={lineRef} geometry={geometry} material={material} />
  );
}

export default AnimatedLine;
