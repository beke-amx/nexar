"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import Link from "next/link";

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 80, damping: 25, bounce: 0, mass: 1 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 800]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      id="portfolio"
      className="h-[300vh] py-20 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-black"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="space-y-10 md:space-y-20"
      >
        <DraggableRow products={firstRow} direction="reverse" scrollTranslate={translateXReverse} />
        <DraggableRow products={secondRow} direction="forward" scrollTranslate={translateX} />
        <DraggableRow products={thirdRow} direction="reverse" scrollTranslate={translateXReverse} />
      </motion.div>
    </div>
  );
};

const DraggableRow = ({ products, direction, scrollTranslate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const constraintsRef = useRef(null);
  
  return (
    <motion.div
      ref={constraintsRef}
      drag="x"
      dragConstraints={{ left: -600, right: 600 }}
      dragElastic={0.1}
      dragTransition={{ 
        bounceStiffness: 200, 
        bounceDamping: 25,
        power: 0.3,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        setDragOffset(info.offset.x);
      }}
      style={{ 
        x: useTransform(
          scrollTranslate,
          (value) => value + dragOffset
        )
      }}
      initial={{ opacity: 0, x: direction === 'reverse' ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2 
      }}
      className={`flex ${direction === 'reverse' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-6 md:space-x-10 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } px-4 will-change-transform`}
    >
      {products.map((product, index) => (
        <ProductCard 
          product={product} 
          key={product.title}
          index={index}
          isDragging={isDragging}
        />
      ))}
    </motion.div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-12 md:py-20 lg:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-4 md:mb-6 leading-tight">
        Our Work
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-400 uppercase tracking-wider mb-4 md:mb-6 font-medium">
        Projects We've Worked With
      </p>
      <p className="max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
        Explore our portfolio of successful projects across web development,
        digital marketing, branding, and production. Each project represents
        our commitment to excellence and innovation in building the digital future of Ethiopia.
      </p>
    </div>
  );
};

export const ProductCard = ({ product, index, isDragging }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      whileHover={!isDragging ? {
        y: -20,
        scale: 1.05,
      } : {}}
      onMouseEnter={() => !isDragging && setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      className="group/product h-64 w-80 md:h-96 md:w-[30rem] relative flex-shrink-0 rounded-xl overflow-hidden shadow-2xl will-change-transform"
    >
      <Link
        href={product.link}
        className="block h-full w-full"
        onClick={(e) => {
          if (isDragging) {
            e.preventDefault();
          }
        }}
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-110"
          alt={product.title}
          draggable={false}
        />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover/product:opacity-95 transition-opacity duration-300"></div>
        
        {/* Project Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-2">
              {product.category}
            </span>
          </div>
          <h2 className="text-white text-lg md:text-2xl font-bold mb-2">
            {product.title}
          </h2>
          
          {/* Details that appear on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: showDetails ? 1 : 0, 
              height: showDetails ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-gray-400 text-xs">
              Client: {product.client}
            </p>
            <div className="mt-3 flex items-center gap-2 text-white text-sm font-medium">
              <span>View Project</span>
              <svg className="w-4 h-4 transform group-hover/product:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};