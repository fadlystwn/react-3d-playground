"use client"

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense } from "react";
import { useProgress, Html, ScrollControls, Scroll } from "@react-three/drei";
import Stars from "./Stars";

import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)}% loaded</Html>;
}

export default function Scene() {
  return (
    <Canvas 
      gl={{ antialias: true }} 
      shadows 
      dpr={[1, 1.5]} 
      className="fixed top-0 left-0 w-full h-screen"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Suspense fallback={<Loader />}>
        <ScrollControls damping={0.5} pages={3}>
          <Model />
          <Stars />
          
          {/* Scrollable Content */}
          <Scroll html style={{ width: "100%" }}>
            {/* First Section */}
            <section className="flex items-center justify-center h-screen text-center">
              <h1 className="text-5xl font-thin">
                Digital Solution for Your Web3 Project
              </h1>
            </section>

            {/* Second Section (About Us) */}
            <section id="about" className="w-full h-screen flex flex-row justify-between items-end p-8">
              <div className="flex flex-col">
                <p className="text-lg md:text-xl lg:text-4xl text-white max-w-4xl font-thin">
                  Web3 <br />
                  DeFi <br />
                  Apps
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lg md:text-xl lg:text-4xl text-white max-w-4xl font-thin">
                  Innovative <br />
                  Blockchain <br />
                  Solutions
                </p>
              </div>
            </section>

            {/* Third Section (Our Services) */}
            <section id="services" className="h-screen flex flex-col items-start justify-end p-8">
              <p className="text-lg md:text-xl lg:text-2xl text-white max-w-4xl font-thin">
                We offer a wide range of services from web development to 3D modeling
                and animation. Explore how we can bring your vision to life.
              </p>
            </section>

            {/* Fourth Section (Contact Us) */}
            <section id="contact" className="h-screen flex flex-col items-start justify-end p-8">
              <p className="text-lg md:text-xl lg:text-2xl text-white max-w-4xl font-thin">
                Get in touch with us to start your project today. We would love to hear
                from you!
              </p>
            </section>
          </Scroll>
        </ScrollControls>
      </Suspense>
      <EffectComposer>
        <Bloom mipmapBlur intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
