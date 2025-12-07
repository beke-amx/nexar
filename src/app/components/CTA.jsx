"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Let's Build Something Great!
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Let's talk and elevate your brand with our expert team!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              View Our Work
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-400">
                Quick turnaround times without compromising quality
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-2">Expert Team</h3>
              <p className="text-gray-400">
                Skilled professionals dedicated to your success
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-400">
                Always here to help you grow your business
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}