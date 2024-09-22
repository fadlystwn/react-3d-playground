import { useEffect, useRef, useState, FC, MouseEvent } from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  title: string;
  description: string;
  isVisible: boolean;
};

const Card: FC<CardProps> = ({ title, description, isVisible }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const getRotation = () => {
    const { x, y } = mousePosition;
    const rotationX = (y / 300 - 0.5) * 15; // height is fixed at 300px
    const rotationY = (x / 300 - 0.5) * -15; // assuming width of 300px
    return { rotateX: rotationX, rotateY: rotationY };
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, scale: 0.8, rotate: 15, skewY: 10 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1, rotate: 0, skewY: 0 }
          : { opacity: 0, y: 100, scale: 0.8, rotate: 15, skewY: 10 }
      }
      transition={{
        duration: 1.2,
        ease: 'anticipate',
        type: 'spring',
        damping: 10,
        stiffness: 100,
      }}
      style={{
        height: '300px',
        perspective: '1000px', // Adding perspective for 3D effect
        transformStyle: 'preserve-3d',
        transform: `rotateX(${getRotation().rotateX}deg) rotateY(${getRotation().rotateY}deg)`,
      }}
      className="p-6 rounded-lg shadow-lg backdrop-blur-lg bg-gradient-to-br from-purple-700/50 to-purple-900/20 border border-white/20 transform transition-all hover:scale-105 hover:-translate-y-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-lg leading-relaxed text-white font-thin">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [visibleCards, setVisibleCards] = useState([false, false, false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          const isVisible = entry.isIntersecting;
          setVisibleCards((prev) => {
            const newVisibleCards = [...prev];
            newVisibleCards[index] = isVisible;
            return newVisibleCards;
          });
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

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
              isVisible={visibleCards[index]}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
