import * as THREE from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';

// Extend the Three.js namespace to include CircleBufferGeometry
extend({ CircleBufferGeometry: THREE.CircleGeometry });

const Ripple = ({ mousePosition }) => {
  const rippleRef = useRef<THREE.Mesh>(null);
  const rippleSize = 1; // Size of the ripple

  useFrame(() => {
    if (rippleRef.current) {
      // Update ripple position based on mousePosition
      rippleRef.current.position.set(mousePosition.x, mousePosition.y, 0);
      rippleRef.current.scale.set(rippleSize, rippleSize, 1);
      rippleRef.current.material.opacity = 1 - rippleSize / 2; // Fade out effect
    }
  });

  return (
    <mesh ref={rippleRef} position={[0, 0, 0]}>
      <circleBufferGeometry args={[1, 32]} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={1}
      />
    </mesh>
  );
};

export default function Cursor({ mousePosition }) {
  return (
    <>
      <Ripple mousePosition={mousePosition} />
    </>
  );
}
