import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting); // Set visibility based on intersection
        });
      },
      { threshold: 0.5 } // Adjust threshold to trigger animation at 50% visibility
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
    <section id="about" className="w-full h-screen flex flex-row justify-between items-end p-8">
      <div className="flex flex-col">
        <p className="text-lg md:text-xl lg:text-5xl text-white max-w-4xl uppercase">
          <motion.span
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }} // Animate opacity based on visibility
            transition={{ duration: 1 }}
          >
            Empowering
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.2 }} // Add a slight delay for each span
          >
            the Future
          </motion.span>
          <br />
          <motion.span
            className="italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            with Decentralized Solutions
          </motion.span>
        </p>
      </div>
      <div className="flex flex-col">
        <p className="text-lg md:text-xl lg:text-5xl text-white max-w-4xl font-thin">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            Innovative
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Blockchain
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Solutions
          </motion.span>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
