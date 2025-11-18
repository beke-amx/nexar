"use client";

import VerticalCutReveal from "./ui/vertical-cut-reveal";
import { useMediaQuery } from "../hooks/use-media-query";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const services = [
  {
    id: 1,
    title: "WEB APP DEVELOPMENT",
    items: [
      "E-commerce Website",
      "Portfolio Website",
      "Static Website",
      "Dynamic Website",
      "Hotel Booking System",
      "Real Estate Listing Website",
    ],
  },
  {
    id: 2,
    title: "DIGITAL MARKETING",
    items: [
      "Search Engine Optimization (SEO)",
      "Pay Per Click Advertising (PPC)",
      "Social Media Marketing",
      "Email Marketing",
      "Influencer Marketing",
      "Social Media Advertising",
    ],
  },
  {
    id: 3,
    title: "COMPANY BRANDING",
    items: [
      "Brand Strategy",
      "Logo Design",
      "Brand Identity Design",
      "Brand Messaging",
      "Brand Guidelines",
      "Brand Experience Design",
    ],
  },
  {
    id: 4,
    title: "PRODUCTION",
    items: [
      "Photo Production",
      "Video Production",
      "Event Production",
      "Documentary",
      "Commercial Production",
      "Live Streaming Production",
    ],
  },
];

export default function Experience3() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [activeService, setActiveService] = useState(null);
  const [hoveredServiceId, setHoveredServiceId] = useState(null);
  const [openServices, setOpenServices] = useState([]); // mobile: track multiple opened services
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.8);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const requestRef = useRef(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });

  // Cursor movement easing (desktop only)
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;
    const easeAmount = 0.15;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;
    setCursorPosition({ x: newX, y: newY });
    prevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const updateCursorPosition = (e) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDesktop]);

  // Hover for desktop / click for mobile
  const handleServiceHover = useCallback(
    (service) => {
      if (isDesktop) {
        setHoveredServiceId(service.id);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        if (activeService !== service) {
          setActiveService(service);
          setIsVisible(true);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setOpacity(1);
            setScale(1);
          }, 100);
        } else if (!isVisible) {
          setIsVisible(true);
          setOpacity(1);
          setScale(1);
        }
      } else {
        // Mobile: toggle the clicked service independently
        setOpenServices((prev) =>
          prev.includes(service.id)
            ? prev.filter((id) => id !== service.id)
            : [...prev, service.id]
        );
      }
    },
    [activeService, isVisible, isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop) return;

    setHoveredServiceId(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpacity(0);
    setScale(0.8);
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setActiveService(null);
    }, 400);
  }, [isDesktop]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <div className="mx-auto bg-gray-300 w-full shadow-sm py-10 xl:px-0 px-4 min-h-screen">
      <article className="max-w-7xl mx-auto sm:flex justify-between items-end sm:pb-16 pb-6">
        <h1 className="xl:text-[6rem] lg:text-6xl md:text-5xl text-5xl text-gray-700 pt-4 !leading-[100%]">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.05}
            staggerFrom="first"
            transition={{ type: "spring", stiffness: 200, damping: 21 }}
          >
            Services We Offer
          </VerticalCutReveal>
        </h1>
      </article>

      <div
        className="relative w-full max-w-7xl mx-auto"
        onMouseLeave={handleMouseLeave}
      >
        {services.map((service) => {
          const isOpen = isDesktop
            ? hoveredServiceId === service.id
            : openServices.includes(service.id);
          return (
            <div
              key={service.id}
              className="p-4 group cursor-pointer relative sm:flex border-t border-black items-start justify-between transition-all duration-300 ease-out min-h-[100px]"
              onMouseEnter={() => handleServiceHover(service)}
              onClick={() => !isDesktop && handleServiceHover(service)}
            >
              <div className="text-left sm:py-3 py-2 w-full">
                <h2
                  className={`uppercase md:text-3xl sm:text-2xl text-xl font-medium leading-[100%] relative transition-all duration-300 ease-out text-gray-500 ${
                    activeService?.id === service.id && opacity > 0.5
                      ? "mix-blend-difference z-20 px-2 italic"
                      : ""
                  }`}
                >
                  {service.title}
                </h2>

                {/* List with two columns on desktop */}
                <div
                  className={`overflow-hidden mt-2`}
                  style={{
                    maxHeight: isOpen
                      ? `${service.items.length * 28}px`
                      : "0px",
                    transition: "max-height 0.4s ease-out",
                  }}
                >
                  <ul
                    className={`text-sm font-normal space-y-1 text-gray-600 ${
                      isDesktop ? "grid grid-cols-2 gap-x-6" : ""
                    } list-disc list-inside`}
                  >
                    {service.items.map((item, index) => (
                      <li
                        key={index}
                        className={`transform transition-all duration-300 ease-out ${
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {isDesktop && (
                <button
                  className={`sm:block hidden p-4 rounded-full transition-all duration-300 ease-out ${
                    activeService?.id === service.id && opacity > 0.5
                      ? "mix-blend-difference z-20 bg-gray-300 text-gray-700"
                      : ""
                  }`}
                >
                  <ArrowUpRight className="w-12 h-12" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
