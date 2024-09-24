import { motion } from "framer-motion";
import React from "react";

const text = "The Forefront of Digital Transformation";
const textArray = text.split("");

// Corrected easing configuration
const letterAnimation = {
  initial: { opacity: 0, y: "120%" },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.5, 0.01, 0.3, 1] // Adjusted to valid cubic-bezier values
    }
  }
};

const containerAnimation = {
  animate: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.1
    }
  }
};

const InnovationSection = () => {
  return (
    <section id="innovation" className="min-h-screen flex flex-col items-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }} // Ensures animation happens once when it enters the viewport
        className="w-full max-w-7xl px-4"
      >
        {/* Grid layout with responsive behavior */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column (Title) */}
          <div className="flex flex-col justify-center">
            <h3 className="text-sm md:text-2xl font-light uppercase text-purple-600 mb-2">
              Innovation
            </h3>
          </div>
          
          {/* Right Column (Description) */}
          <div className="flex flex-col justify-center">
            <motion.h3 
              className="text-lg md:text-2xl lg:text-5xl mb-4"
              variants={containerAnimation}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {textArray.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterAnimation}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h3>
            <p className="text-base md:text-lg lg:text-4xl font-thin text-white leading-10">
              We harness cutting-edge technologies to drive innovation. Our team explores new paradigms in blockchain, AI, and decentralized applications to create solutions that not only meet today’s needs but also anticipate tomorrow's challenges.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InnovationSection;
