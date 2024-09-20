"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useRef, useEffect } from "react";
import { useProgress, Html, ScrollControls, Scroll } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import AboutSection from "./AboutSection";  // Ensure this is the updated version with Framer Motion

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
      <ambientLight intensity={0.6} color={"#ffffff"} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Suspense fallback={<Loader />}>
        <ScrollControls damping={0.5} pages={3}>
          <Model />

          {/* Scrollable HTML Content */}
          <Scroll html style={{ width: "100%" }}>
            <AboutSection />  {/* This section will now have Framer Motion animations */}

            {/* Third Section (Our Services) */}
            <section
              id="services"
              className="h-screen flex flex-col items-center justify-center p-2"
            >
              <div
                className="bg-black text-white"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 50 }} // Start slightly lower and hidden
                  animate={{ opacity: 1, y: 0 }} // Animate to visible and centered
                  transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition
                  className="text-lg md:text-xl lg:text-2xl max-w-4xl font-thin text-center p-8"
                >
                  "We believe in a decentralized world where users have complete control over their data, assets, 
                  and digital interactions. Our mission is to make blockchain accessible to everyone, offering seamless, 
                  secure, and transparent decentralized applications."
                </motion.p>
              </div>
            </section>

            {/* Contact Section */}
            <section
              id="contact"
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
          intensity={1.5}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.7}
        />
      </EffectComposer>
    </Canvas>
  );
}
