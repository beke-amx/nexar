"use client";

import React from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import VerticalCutReveal from "./ui/vertical-cut-reveal";

const World = dynamic(() => import("./ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function Contact() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#1e40af",
    showAtmosphere: true,
    atmosphereColor: "#60a5fa",
    atmosphereAltitude: 0.2,
    emissive: "#1e3a8a",
    emissiveIntensity: 0.3,
    shininess: 0.9,
    polygonColor: "rgba(96, 165, 250, 0.3)",
    ambientLight: "#60a5fa",
    directionalLeftLight: "#93c5fd",
    directionalTopLight: "#93c5fd",
    pointLight: "#60a5fa",
    arcTime: 1500,
    autoRotate: true,
    autoRotateSpeed: 0.6,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

  const sampleArcs = [
    {
      order: 1,
      startLat: 9.145,
      startLng: 40.4897,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[0],
    },
    {
      order: 2,
      startLat: 9.145,
      startLng: 40.4897,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.4,
      color: colors[1],
    },
    {
      order: 3,
      startLat: 9.145,
      startLng: 40.4897,
      endLat: 25.2048,
      endLng: 55.2708,
      arcAlt: 0.2,
      color: colors[2],
    },
    {
      order: 4,
      startLat: 9.145,
      startLng: 40.4897,
      endLat: -1.2921,
      endLng: 36.8219,
      arcAlt: 0.15,
      color: colors[0],
    },
    {
      order: 5,
      startLat: 9.145,
      startLng: 40.4897,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.5,
      color: colors[1],
    },
    {
      order: 6,
      startLat: 9.145,
      startLng: 40.4897,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.35,
      color: colors[2],
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.05}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 200, damping: 21 }}
            >
              Get In Touch
            </VerticalCutReveal>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            We connect businesses worldwide with innovative digital solutions
          </p>
        </div>

      
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <a
              href="mailto:info@nexartechsolution.com"
              className="text-gray-400 hover:text-white transition-colors text-lg"
            >
              info@nexartechsolution.com
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-all">
              <Phone className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <div className="space-y-1">
              <a
                href="tel:+251978225123"
                className="text-gray-400 hover:text-white transition-colors block text-lg"
              >
                +251 978 225 123
              </a>
              <a
                href="tel:+251961413519"
                className="text-gray-400 hover:text-white transition-colors block text-lg"
              >
                +251 961 413 519
              </a>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-all">
              <MapPin className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p className="text-gray-400 text-lg">
              Bole Japan Area
              <br />
              Addis Ababa, Ethiopia
            </p>
          </motion.div>
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
          <div className="flex justify-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <Facebook className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}