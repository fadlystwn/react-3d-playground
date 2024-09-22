"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useRef, useEffect } from "react";
import { useProgress, Html, ScrollControls, Scroll } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import AboutSection from "./AboutSection";  // Ensure this is the updated version with Framer Motion
import Particles from "./Particles";
import ServicesSection from "./ServiceSection";
import FeaturesSection from "./FeatureSection";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)}% loaded</Html>;
}

export default function Scene() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const mouse = useRef<number[]>([0, 0]);

  const handleMouseMove = (event: MouseEvent) => {
    mouse.current = [event.clientX, event.clientY];
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas
      gl={{ antialias: true }}
      shadows
      dpr={[1, 1.5]}
      className="fixed top-0 left-0 w-full h-screen"
      style={{ background: "#000" }} // Set dark background color here
    >
      <ambientLight intensity={8} color={"#9333EA"} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Suspense fallback={<Loader />}>
        <ScrollControls damping={0.5} pages={4}>
          <Model />
          <Particles count={100} mouse={mouse} />

          {/* Scrollable HTML Content */}
          <Scroll html style={{ width: "100%" }}>
            <AboutSection /> 

           <ServicesSection/>
           <FeaturesSection/>
            
            <section
              id="why-us"
              className="h-screen flex flex-col items-center justify-center p-8"
            >
              <div className="p-10">
                <p className="text-lg md:text-xl lg:text-3xl text-white max-w-4xl font-thin text-center">
                  Trusted. Transparent. Decentralized.
                  <br />
                  "Our DApp platform is designed for users who demand more control over their digital interactions. We offer secure, transparent solutions that guarantee true ownership and trustless transactions, with no middlemen."
                </p>
              </div>
            </section>
          </Scroll>
        </ScrollControls>
      </Suspense>

      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={1}
          luminanceThreshold={5}
          luminanceSmoothing={1}
        />
       
      </EffectComposer>
    </Canvas>
  );
}
