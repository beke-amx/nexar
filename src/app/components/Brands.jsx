"use client";

import { motion } from "motion/react";

const brands = [
  { name: "TechStart Ethiopia", logo: "https://via.placeholder.com/150x60/1a1a1a/ffffff?text=TechStart" },
  { name: "Addis Fashion", logo: "https://via.placeholder.com/150x60/1a1a1a/ffffff?text=Addis+Fashion" },
  { name: "Habesha Hotels", logo: "https://via.placeholder.com/150x60/1a1a1a/ffffff?text=Habesha+Hotels" },
  { name: "Ethiopian Coffee Co.", logo: "https://via.placeholder.com/150x60/1a1a1a/ffffff?text=Coffee+Co" },
  { name: "Real Estate Plus", logo: "https://via.placeholder.com/150x60/1a1a1a/ffffff?text=Real+Estate" },
  { name: "Selam Restaurant", logo: "https://via.placeholder.com/150x60/1a1a1a/ffffff?text=Selam" },
  { name: "Addis Bank", logo: "https://via.placeholder.com/150x60/1a1a1a/ffffff?text=Addis+Bank" },
  { name: "Ethiopian Airlines", logo: "https://via.placeholder.com/150x60/1a1a1a/ffffff?text=Airlines" },
];

export default function Brands() {
  return (
    <section className="relative bg-gray-50 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-2">
            We Worked With Global Largest 300+ Brands
          </h2>
          <p className="text-gray-600">
            Trusted by leading Ethiopian businesses
          </p>
        </motion.div>

        {/* Infinite Scroll Animation */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, -1200],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}