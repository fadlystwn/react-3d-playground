import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer
      style={{height: 980}}
      id="footer"
      className="flex flex-col items-center justify-center text-white py-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full max-w-7xl"
      >
        <div className="flex justify-between w-full">
          <div className="w-1/2 text-left">
            <h2 className="text-lg md:text-2xl lg:text-3xl mb-4">
              Get in Touch
            </h2>
          </div>
          <div className="w-1/2">
            <p className="text-lg md:text-2xl lg:text-3xl mb-4">
              Ready to step into the future of digital with Web3? Let’s build something revolutionary together.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between w-full mt-6">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="font-semibold">Contact Us</h3>
            <p>Email: info@youragency.com</p>
            <p>Phone: +123 456 7890</p>
            <p>123 Web3 Avenue, Digital City, Metaverse</p>
          </div>

          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="font-semibold">Follow Us</h3>
            <p>Twitter | LinkedIn | Discord | Instagram</p>
          </div>
        </div>

        <p className="text-sm mt-8 text-center">
          © 2024 Web3. All rights reserved. Privacy Policy | Terms of Service
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
