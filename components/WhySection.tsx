import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const WhyUsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 }
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
      id="why-us"
      className="h-screen flex flex-col items-start justify-center p-8" // Change items-center to items-start for left alignment
      ref={ref}
    >
      <motion.div
        className="p-10 w-full h-fit"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <p className="p-10 w-full text-2xl md:text-4xl lg:text-6xl text-white max-w-4xl font-thin text-left"> {/* Updated text size and alignment */}
          Trusted. Transparent. Decentralized.
          "Our DApp platform is designed for users who demand more control over their digital interactions. We offer secure, transparent solutions that guarantee true ownership and trustless transactions, with no middlemen."
        </p>
      </motion.div>
    </section>
  );
};

export default WhyUsSection;
