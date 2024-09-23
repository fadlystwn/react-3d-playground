import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Text to animate
  const missionText = "Our mission is to make blockchain accessible to everyone";
  const missionWords = missionText.split(" "); // Split the text into words

  // Animation variants for individual words
  const wordAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Delay each word's animation
        duration: 0.6,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section
      id="services"
      className="h-screen flex flex-col items-center justify-center p-2"
      ref={ref}
    >
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 10, y: 50 }}
        animate={isVisible ? { opacity: 1, scale: 1, rotate: 0, y: 0 } : { opacity: 0, scale: 0.8, rotate: -10, y: 50 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="from-purple-700/50 to-purple-900/20 border border-white/90"
      >
        <h1 className="text-lg md:text-2xl lg:text-6xl max-w-4xl font-extrabold text-center p-8 leading-relax text-white uppercase italic relative">
          {missionWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={wordAnimation}
              className="inline-block mr-2" // Adds space between words
            >
              {word}
            </motion.span>
          ))}
          <span className="absolute inset-0 text-white text-stroke"></span>
        </h1>
      </motion.div>

      {/* Animated Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        className="mt-8"
      >
        <a
          href="#learn-more"
          className="text-white bg-purple-700 hover:bg-purple-900 font-bold py-3 px-8 rounded-full uppercase tracking-wide"
        >
          Learn More
        </a>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
