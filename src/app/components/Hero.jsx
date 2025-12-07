"use client";
import { TimelineContent } from "./ui/timeline-animation";
import VerticalBarsNoise from "./ui/vertical-bars";
import VerticalCutReveal from "./ui/vertical-cut-reveal";

import { useRef } from "react";

function Hero() {
  const heroRef = useRef(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.65]">
        <VerticalBarsNoise className="w-full h-full" />
      </div>

      {/* Hero Text */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-4 text-black">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl capitalize font-medium leading-[120%]">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            containerClassName="justify-center"
            reverse={true}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0.4,
            }}
          >
            Building the Digital Future of Ethiopia
          </VerticalCutReveal>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mt-6">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            containerClassName="justify-center"
            reverse={true}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0.5,
            }}
          >
            Nexar Tech Solutions is committed to delivering innovative digital
            products and services that empower businesses, enhance productivity,
            and transform operations across Ethiopia and beyond.
          </VerticalCutReveal>
        </p>

        <div className="flex gap-3 mt-8">
          <a href="#services"> <button className="text-lg h-12 px-6 rounded-lg text-white flex items-center gap-2 bg-neutral-800 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-2 before:bg-gradient-to-t before:from-neutral-800 before:to-neutral-300 before:rounded-t-lg transition-all group">
            Explore Services
          </button></a>
         
        </div>
      </div>
    </section>
  );
}

export default Hero;
