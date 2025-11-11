"use client";
import Image from "next/image";
import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Animate header on mount
  useLayoutEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-40 bg-black/70 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <Image
              src="/photo/nexar.png"
              alt="Nexar Tech Solutions Logo"
              fill
              className="object-contain rounded-full"
            />
          </div>
          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-white font-semibold text-lg sm:text-xl">
              Nexar Tech Solutions
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#about" className="hover:text-white transition">
            About
          </a>
          <a href="#services" className="hover:text-white transition">
            Services
          </a>
          <a href="#portfolio" className="hover:text-white transition">
            Portfolio
          </a>
          <a href="#team" className="hover:text-white transition">
            Team
          </a>
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
          <a
            href="#contact"
            className="ml-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full shadow hover:from-cyan-400 hover:to-blue-500 transition"
          >
            Get in Touch
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 border-t border-white/10">
          <nav className="flex flex-col items-center gap-4 py-4 text-gray-300">
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>
              Portfolio
            </a>
            <a href="#team" onClick={() => setMenuOpen(false)}>
              Team
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
            <a
              href="#contact"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full shadow hover:from-cyan-400 hover:to-blue-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
