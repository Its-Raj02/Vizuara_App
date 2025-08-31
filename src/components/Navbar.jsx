/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home",  path: "/" },
    { name: "Learn",  path: "/learn" },
    { name: "Games",  path: "/games" },
    { name: "Stories",  path: "/stories" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 z-30 transition-all font-['Fredoka_One'] ${
        scrolled ? "bg-white/70 backdrop-blur-md shadow-md" : ""
      }`}
    >
      {/* Logo */}
      <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
        MoodVerse
      </h2>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 text-lg">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="font-semibold text-gray-700 hover:text-purple-600 transition-all hover:scale-110 flex items-center gap-1"
          >
            <span>{item.icon}</span> {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Slide-in */}
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-2/3 bg-gradient-to-b from-purple-400 via-pink-200 to-yellow-300 shadow-lg flex flex-col items-start p-6 space-y-6 z-40"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="font-bold text-lg text-gray-800 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
