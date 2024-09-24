import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="w-full h-screen flex flex-row justify-between items-end p-8">
      <div className="flex flex-col">
        <p className="text-lg md:text-xl lg:text-5xl text-white max-w-4xl uppercase">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Empowering
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            the Future
          </motion.span>
          <br />
          <motion.span
            className="italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Innovative
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Blockchain
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
