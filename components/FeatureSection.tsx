import { FC, useRef, useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  title: string;
  description: string;
  isVisible: boolean;
  delay: number; // New delay prop
};

const Card = forwardRef<HTMLDivElement, CardProps>(({ title, description, isVisible, delay }, ref) => {
  return (
    <motion.div
      ref={ref}
      style={{ height: '300px' }}
      className="p-6 rounded-lg shadow-lg backdrop-blur-lg bg-gradient-to-br from-purple-700/50 to-purple-900/20 border border-white/20 transform transition-all"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.9, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ 
        duration: 0.8,
        delay: isVisible ? delay : 0, // Use the delay prop
        ease: [0.6, -0.05, 0.01, 0.99], // Custom easing function
      }}
    >
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-lg leading-relaxed text-white font-thin">{description}</p>
    </motion.div>
  );
});

const FeaturesSection: FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleStates, setVisibleStates] = useState<boolean[]>(new Array(4).fill(false));

  useEffect(() => {
    const observers = cardRefs.current.map((cardRef, index) => {
      if (!cardRef) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleStates((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(cardRef);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && cardRefs.current[index]) {
          observer.unobserve(cardRefs.current[index]!);
        }
      });
    };
  }, []);

  const features = [
    {
      title: 'Decentralized Finance (DeFi)',
      description: 'Participate in lending, borrowing, and yield farming without intermediaries. Take control of your financial future.',
    },
    {
      title: 'NFT Marketplace',
      description: 'Buy, sell, and trade unique digital assets. Showcase your NFTs and engage with a global community of creators.',
    },
    {
      title: 'Social Networking',
      description: 'Connect with like-minded individuals while maintaining your privacy and ownership of personal data.',
    },
    {
      title: 'Gaming',
      description: 'Play and earn through decentralized gaming ecosystems, where you truly own your in-game assets.',
    },
  ];

  return (
    <section id="features" className="py-12 px-4 text-white">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="transition duration-300"
          >
            <Card
              title={feature.title}
              description={feature.description}
              isVisible={visibleStates[index]}
              delay={index * 0.2} // Stagger delay based on index
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
