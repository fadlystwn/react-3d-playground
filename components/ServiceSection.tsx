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
      { threshold: 0.5 } // Trigger when 10% of the section is visible
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

  return (
    <section
      id="services"
      className="h-screen flex flex-col items-center justify-center p-2"
      ref={ref}
    >
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 10, y: 50 }}
      animate={isVisible ? { opacity: 1, scale: 1, rotate: 0, y: 0 } : { opacity: 0, scale: 0.8, rotate: -10, y: 50 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className=" from-purple-700/50 to-purple-900/20 border border-white/90"
    >
    <h1 className="text-lg md:text-2xl lg:text-6xl max-w-4xl font-extrabold text-center p-8 leading-relax text-white uppercase italic relative">
      Our mission is to make blockchain accessible to everyone
      <span className="absolute inset-0 text-white text-stroke"></span>
    </h1>

    </motion.div>


    </section>
  );
};

export default ServicesSection;
