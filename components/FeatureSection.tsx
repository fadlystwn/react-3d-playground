import { FC } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
const Card: FC<{ title: string; description: string; index: number, image: string }> = ({ title, description, index, image }) => (
  <motion.div
    initial={{ opacity: 0, translateY: 20 }}
    whileInView={{ opacity: 1, translateY: 0 }}
    transition={{
      duration: 0.6, // Adjust this for smoother animation
      delay: index * 0.3, // Delay each item based on index
      ease: "easeOut", // Use an easing function for smooth transitions
    }}    
    className="p-6 rounded-lg shadow-lg backdrop-blur-lg bg-gradient-to-br from-purple-700/50 to-purple-900/20 border border-white/20 h-auto"
  >
    {/* Placeholder image at the top */}
    <Image 
      width={184}
      height={184}
      src={image} 
      alt={title} 
    />
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-lg leading-relaxed text-white font-thin">{description}</p>
  </motion.div>
);

const FeaturesSection: FC = () => {
  const features = [
    { 
      title: 'Decentralized Finance (DeFi)', 
      description: 'Participate in lending, borrowing, and yield farming without intermediaries. Take control of your financial future.',
      imageSrc: '/defi.png'
    },
    { 
      title: 'NFT Marketplace', 
      description: 'Buy, sell, and trade unique digital assets. Showcase your NFTs and engage with a global community of creators.',
      imageSrc: '/nft.png'
    },
    { 
      title: 'Social Networking', 
      description: 'Connect with like-minded individuals while maintaining your privacy and ownership of personal data.',
      imageSrc: '/social.png'
    },
    { 
      title: 'Gaming', 
      description: 'Play and earn through decentralized gaming ecosystems, where you truly own your in-game assets.',
      imageSrc: '/gaming.png'
    },
  ];
  

  return (
    <section id="features" className="py-12 px-4 text-white mb-32">
      <motion.div 
        className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature, index) => (
          <Card key={index} title={feature.title} description={feature.description} index={index} image={feature.imageSrc} />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
