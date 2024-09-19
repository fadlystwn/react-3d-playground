// HorizontalMenu.tsx
import { useState, useEffect } from "react";
import { FaInfoCircle, FaCogs, FaEnvelope } from "react-icons/fa";

const menuItems = [
  { id: "about", icon: <FaInfoCircle size={24} />, label: "About Us" },
  { id: "services", icon: <FaCogs size={24} />, label: "Our Services" },
  { id: "contact", icon: <FaEnvelope size={24} />, label: "Contact Us" },
];

export default function HorizontalMenu() {
  const [activeSection, setActiveSection] = useState(menuItems[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY + window.innerHeight / 2 >= sectionTop && window.scrollY + window.innerHeight / 2 < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 right-0 h-screen flex flex-col items-center justify-center bg-gray-900 text-white w-20">
      <ul className="space-y-4">
        {menuItems.map(item => (
          <li
            key={item.id}
            className={`cursor-pointer ${activeSection === item.id ? 'text-yellow-400' : ''}`}
            title={item.label}
          >
            <a href={`#${item.id}`} aria-label={item.label}>
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
