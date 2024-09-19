import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody, BallCollider, Physics } from '@react-three/rapier';

interface PointerProps {
  vec?: THREE.Vector3;
}

export default function Pointer({ vec = new THREE.Vector3() }: PointerProps) {
  // Use 'any' for ref type
  const ref = useRef<any>(null);

  useFrame(({ mouse, viewport }) => {
    if (ref.current) {
      // Set the kinematic translation of the RigidBody based on the mouse position
      ref.current.setNextKinematicTranslation(
        vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
      );
    }
  });

  return (
   <Physics /*debug*/ gravity={[0, 0, 0]}>
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
    </Physics>
  );
}
