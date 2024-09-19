"use client"

import { Canvas } from "@react-three/fiber"
import Model from "./Model"
import { Suspense } from "react"
import { useProgress, Html, ScrollControls, Scroll } from "@react-three/drei"
import Stars from "./Stars"

function Loader() {
  const { progress } = useProgress()

  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

export default function Scene() {
  return (
    <>
      {/* 3D Canvas background */}
      <Canvas gl={{ antialias: true }} shadows dpr={[1, 1.5]} className="fixed top-0 left-0 w-full h-screen">
        <directionalLight position={[1, -10, 20]} intensity={1} castShadow />
        <ambientLight intensity={0.5} />
        <Suspense fallback={<Loader />} >
          <ScrollControls damping={0.5} pages={3}> {/* 3 pages for 3 sections */}
            <Model />
            <Stars />
            <Scroll html>
              {/* First Section (About Us) */}
              <section id="about" className="h-screen flex flex-col items-start justify-end p-8">
                <p className="text-lg md:text-xl lg:text-2xl text-white max-w-4xl font-thin">
                  We are <br/>
                  a team of passionate<br/>
                  developers 
                </p>
              </section>

              {/* Second Section (Our Services) */}
              <section id="services" className="h-screen flex flex-col items-start justify-end p-8">
                <p className="text-lg md:text-xl lg:text-2xl text-white max-w-4xl font-thin">
                  We offer a wide range of services from web development to 3D modeling
                  and animation. Explore how we can bring your vision to life.
                </p>
              </section>

              {/* Third Section (Contact Us) */}
              <section id="contact" className="h-screen flex flex-col items-start justify-end p-8">
                <p className="text-lg md:text-xl lg:text-2xl text-white max-w-4xl font-thin">
                  Get in touch with us to start your project today. We would love to hear
                  from you!
                </p>
              </section>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  )
}
