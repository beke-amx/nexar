"use client";
import React from "react";
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

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1500]),
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
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -1000, right: 1000 }}
      dragElastic={0.1}
      style={{ x: scrollTranslate }}
      className={`flex ${direction === 'reverse' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-6 md:space-x-10 cursor-grab active:cursor-grabbing px-4`}
    >
      {products.map((product) => (
        <ProductCard product={product} key={product.title} />
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

export const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{
        y: -20,
        scale: 1.05,
      }}
      transition={{ duration: 0.3 }}
      className="group/product h-64 w-80 md:h-96 md:w-[30rem] relative flex-shrink-0 rounded-lg overflow-hidden shadow-2xl"
    >
      <Link
        href={product.link}
        className="block h-full w-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-110"
          alt={product.title}
          draggable={false}
        />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/product:opacity-90 transition-opacity duration-300"></div>
        <h2 className="absolute bottom-6 left-6 right-6 text-white text-lg md:text-2xl font-semibold">
          {product.title}
        </h2>
      </Link>
    </motion.div>
  );
};