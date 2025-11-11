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
          // Ensure loader is visible when animation starts
          setIsVisible(true);
        },
      });

      // Start animation immediately on page load
      // fade + scale background
      t1.from("#loader-bg", {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out",
      })
        // loading progress
        .fromTo(
          {},
          { percent: 0 },
          {
            percent: 100,
            duration: 2.5,
            ease: "power2.out",
            onUpdate() {
              setLoadingPercent(Math.floor(this.targets()[0].percent));
            },
          },
          "-=0.4"
        )
        // logo entrance
        .from(
          "#logo",
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=1.2"
        )
        // Exit animation - slide up and fade out
        .to("#loader-content", {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        })
        // Background exit animation
        .to(
          "#loader-bg",
          {
            scale: 1.2,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        // Final cleanup and callback
        .to(comp.current, {
          opacity: 0,
          duration: 0.3,
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
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
      >
        {/* Subtle moving background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-40 md:w-64 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-48 md:w-72 bg-blue-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-28 h-28 sm:w-48 md:w-80 bg-purple-500/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "15px 15px",
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
          {/* Logo */}
          <div id="logo" className="mb-4 flex justify-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px] shadow-lg">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-1">
                <Image
                  src="/photo/nexar.png"
                  alt="Nexar Tech Solution"
                  width={64}
                  height={64}
                  className="rounded-full object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Geez numeral */}
          <div className="text-[clamp(2rem,6vw,4rem)] font-bold text-white mb-4 drop-shadow-lg">
            {ethiopicNumerals[Math.floor(loadingPercent / 10)] || "፼"}
          </div>

          {/* Progress bar */}
          <div className="w-40 sm:w-52 md:w-64 h-1 sm:h-1.5 md:h-2 bg-gray-800 rounded-full overflow-hidden mb-3 mx-auto shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100 ease-out"
              style={{ width: `${loadingPercent}%` }}
            ></div>
          </div>

          {/* Labels */}
          <div className="text-gray-300 text-xs sm:text-sm md:text-base tracking-widest">
            NEXAR TECH SOLUTION
          </div>
          <div className="text-cyan-400 text-[10px] sm:text-xs mt-1 opacity-80">
            Innovating Tomorrow
          </div>
        </div>
      </div>
    </div>
  );
}
