"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Intro({ onComplete }) {
  const comp = useRef(null);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Ethiopic numerals mapping (1–10, etc.)
  const ethiopicNumerals = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲"];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        onStart: () => {
          setIsVisible(true);
        },
      });

      // Animated background entrance
      t1.from("#loader-bg", {
        opacity: 0,
        scale: 1.2,
        duration: 0.6,
        ease: "power3.out",
      })
        // Particles entrance
        .from(
          ".particle",
          {
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(2)",
          },
          "-=0.3"
        )
        // Logo entrance with bounce
        .from(
          "#logo",
          {
            scale: 0,
            rotation: -360,
            opacity: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.8"
        )
        // Company name fade in
        .from(
          "#company-name",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // Progress bar container
        .from(
          "#progress-container",
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // Loading progress with counter
        .fromTo(
          {},
          { percent: 0 },
          {
            percent: 100,
            duration: 2.2,
            ease: "power1.inOut",
            onUpdate() {
              setLoadingPercent(Math.floor(this.targets()[0].percent));
            },
          },
          "-=0.2"
        )
        // Pause briefly at 100%
        .to({}, { duration: 0.4 })
        // Exit: content slides up and fades
        .to("#loader-content", {
          y: -80,
          opacity: 0,
          duration: 0.7,
          ease: "power3.in",
        })
        // Particles exit
        .to(
          ".particle",
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.in",
          },
          "-=0.6"
        )
        // Background zoom and fade
        .to(
          "#loader-bg",
          {
            scale: 1.5,
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.5"
        )
        // Final cleanup
        .to(comp.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setIsVisible(false);
            if (onComplete) onComplete();
          },
        });
    }, comp);

    return () => ctx.revert();
  }, [onComplete]);

  // Don't render if not visible (after animation completes)
  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={comp}
      className="fixed inset-0 h-screen w-screen overflow-hidden bg-black z-50"
    >
      {/* Background */}
      <div
        id="loader-bg"
        className="fixed inset-0 bg-black"
      >
        {/* Enhanced moving background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 md:w-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="particle absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 md:w-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="particle absolute top-1/2 left-1/2 w-36 h-36 sm:w-52 md:w-96 bg-white/3 rounded-full blur-3xl"></div>
          <div className="particle absolute top-3/4 left-1/3 w-28 h-28 sm:w-44 md:w-64 bg-white/3 rounded-full blur-2xl"></div>

          {/* Animated grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              animation: "gridMove 20s linear infinite",
            }}
          ></div>
        </div>
      </div>

      {/* Loader Content */}
      <div
        id="loader"
        className="fixed inset-0 flex flex-col items-center justify-center px-4"
      >
        <div
          id="loader-content"
          className="text-center w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          {/* Logo with glow effect */}
          <div id="logo" className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-white/30 via-white/20 to-white/10 p-[3px] shadow-2xl">
                <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center p-1.5">
                  <Image
                    src="/photo/nexar.png"
                    alt="Nexar Tech Solution"
                    width={96}
                    height={96}
                    className="rounded-full object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company name */}
          <div id="company-name" className="mb-6">
            <div className="text-white text-base sm:text-lg md:text-xl tracking-[0.3em] font-light mb-1">
              NEXAR
            </div>
            <div className="text-gray-400 text-xs sm:text-sm tracking-widest font-medium">
              TECH SOLUTIONS
            </div>
          </div>

          {/* Geez numeral with gradient */}
          <div className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-white mb-6 drop-shadow-2xl">
            {ethiopicNumerals[Math.floor(loadingPercent / 10)] || "፼"}
          </div>

          {/* Progress bar with glow */}
          <div
            id="progress-container"
            className="w-48 sm:w-60 md:w-72 h-2 sm:h-2.5 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden mb-4 mx-auto shadow-lg border border-white/20"
          >
            <div
              className="h-full bg-white transition-all duration-150 ease-out relative"
              style={{ width: `${loadingPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Loading percentage */}
          <div className="text-gray-400 text-sm sm:text-base font-mono">
            {loadingPercent}%
          </div>

          {/* Tagline */}
          <div className="text-gray-500 text-[10px] sm:text-xs mt-4 tracking-wider">
            Building the Digital Future of Ethiopia
          </div>
        </div>
      </div>
    </div>
  );
}
