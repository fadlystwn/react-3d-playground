"use client";

import { useFrame,useThree  } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useProgress, Html, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)}% loaded</Html>;
}

// Text animation component
export default function AnimatedText() {
  const groupRef = useRef<Group>(null);
  const scroll = useScroll(); // To track the scroll position
  const { viewport } = useThree(); // Access the viewport to scale text based on screen size
  const [textMaterial] = useState(() => new THREE.MeshStandardMaterial({ color: new THREE.Color(0xffffff) }));

  useFrame(() => {
    if (groupRef.current) {
      // Animate the position of the text based on the scroll progress
      const scrollOffset = scroll.offset; // This gives us a value between 0 and 1 as we scroll
      groupRef.current.position.y = THREE.MathUtils.lerp(0, -viewport.height * 1.5, scrollOffset);
      groupRef.current.rotation.x = scrollOffset * Math.PI; // Adding some rotation animation
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <TextGeometry attach="geometry" args={["Unlock the Future", { font: undefined, size: 1.5, height: 0.2 }]} />
        <primitive attach="material" object={textMaterial} />
      </mesh>
    </group>
  );
}
