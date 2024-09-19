import * as THREE from 'three';
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

useGLTF.preload("/mystic_orb.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF("/mystic_orb.glb");
  const { actions } = useAnimations(animations, scene);
  const scroll = useScroll();
  const { size, camera } = useThree(); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true); // State to manage visibility

  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / size.width) * 2 - 1;
    const y = -(event.clientY / size.height) * 2 + 1;
    setMousePos({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size]);

  useEffect(() => {
    if (actions && actions["Experiment"]) {
      const action = actions["Experiment"];
      action.play();
      action.loop = THREE.LoopRepeat;
    } else {
      console.warn("Animation 'Experiment' not found");
    }
  }, [actions]);

  const colors = [ 0x0000ff]; // Array of colors (red, green, blue)
  
  useEffect(() => {
    if (materials) {
      Object.entries(materials).forEach(([key, material], index) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          const color = new THREE.Color(colors[index % colors.length]); // Cycle through colors
          material.color.set(color); // Apply the color
        }
      });
    }
  }, [materials]);

  useFrame(() => {
    if (actions && actions["Experiment"]) {
      const action = actions["Experiment"];
      const clipDuration = action.getClip()?.duration;
      if (clipDuration) {
        action.time = (clipDuration * scroll.offset) / 4;
      }
    }

    if (group.current) {
      const rotationFactor = 0.5; 
      group.current.rotation.x = mousePos.y * rotationFactor;
      group.current.rotation.y = mousePos.x * rotationFactor;
    }

    const zoomFactor = 10; 
    camera.position.z = 10 - scroll.offset * zoomFactor;

    // Set visibility based on scroll offset
    setVisible(scroll.offset < 0.9); // Hide when scrolled to 90% or more of the page
  });

  return (
    <>
      <group ref={group} visible={visible}>
        <primitive object={scene} />
      </group>
    </>
  );
}
