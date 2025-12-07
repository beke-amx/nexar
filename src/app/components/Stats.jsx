"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import VerticalCutReveal from "./ui/vertical-cut-reveal";

const stats = [
  {
    id: 1,
    value: 300,
    suffix: "+",
    label: "Companies",
    description: "Partnered with over 300 Ethiopian businesses",
  },
  {
    id: 2,
    value: 500,
    suffix: "+",
    label: "Projects",
    description: "Successfully completed projects",
  },
  {
    id: 3,
    value: 3,
    suffix: "x",
    label: "Leads",
    description: "Average increase in client leads",
  },
  {
    id: 4,
    value: 98,
    suffix: "%",
    label: "Satisfaction",
    description: "Client satisfaction rate",
  },
];

function Counter({ value, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(value * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-white text-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-medium mb-4">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.05}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 200, damping: 21 }}
            >
              Success Belongs to You
            </VerticalCutReveal>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Scale Your Business, Lead the Industry, and Dominate the Digital World
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                {stat.label}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            In today's fast-moving tech landscape, success belongs to the bold. Your business needs more than just a website—a powerful digital engine that drives growth, attracts customers, and cements your place as an industry leader. We craft high-performance websites to elevate your brand, outshine the competition, and fuel unstoppable success. Let's build something extraordinary together! 🚀🔥
          </p>
        </motion.div>
      </div>
    </section>
  );
}