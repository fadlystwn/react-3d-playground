import { FC, useRef } from 'react';

type CardProps = {
  title: string;
  description: string;
};

const Card: FC<CardProps> = ({ title, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      style={{
        height: '300px',
      }}
      className="p-6 rounded-lg shadow-lg backdrop-blur-lg bg-gradient-to-br from-purple-700/50 to-purple-900/20 border border-white/20 transform transition-all hover:scale-105 hover:-translate-y-2"
    >
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-lg leading-relaxed text-white font-thin">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
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
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
