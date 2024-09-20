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
  const { size, camera, gl } = useThree(); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  
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
      action.play().paused;
      action.loop = THREE.LoopRepeat;
    } else {
      console.warn("Animation 'Experiment' not found");
    }
  }, [actions]);

  useEffect(() => {
    if (materials) {
      Object.entries(materials).forEach(([key, material]) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          const color = new THREE.Color(0x0000ff);
          material.color.set(color);
        }
      });
    }
  }, [materials]);

  useEffect(() => {
    gl.setClearColor(new THREE.Color(0x000000)); // Set background to black
  }, [gl]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    // Automatically move the mystic_orb
    if (group.current) {
      const radius = 0.25; // Radius of the circular movement
      group.current.position.x = radius * Math.sin(elapsedTime); // Move in X
      group.current.position.z = radius * Math.cos(elapsedTime); // Move in Z

      // Optional: Add a subtle rotation effect
      group.current.rotation.y += 0.01; // Rotate slowly
    }

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

    setVisible(scroll.offset < 0.9);
  });

  return (
    <group ref={group} visible={visible} scale={2.5}>
      <primitive object={scene} />
    </group>
  );
}
