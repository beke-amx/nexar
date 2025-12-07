"use client";

import VerticalCutReveal from "./ui/vertical-cut-reveal";
import { useMediaQuery } from "../hooks/use-media-query";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tooltip } from "./ui/tooltip-card";

const services = [
  {
    id: 1,
    title: "WEB APP DEVELOPMENT",
    items: [
      {
        name: "E-commerce Website",
        detail: "Full-featured online stores with payment integration, inventory management, and customer analytics. Built with modern frameworks for optimal performance.",
      },
      {
        name: "Portfolio Website",
        detail: "Stunning portfolio sites that showcase your work beautifully. Responsive design with smooth animations and fast loading times.",
      },
      {
        name: "Static Website",
        detail: "Lightning-fast static websites perfect for landing pages, company profiles, and informational sites. SEO-optimized and highly secure.",
      },
      {
        name: "Dynamic Website",
        detail: "Interactive web applications with real-time data, user authentication, and complex business logic. Scalable and maintainable architecture.",
      },
      {
        name: "Hotel Booking System",
        detail: "Complete booking solutions with room management, availability calendars, payment processing, and customer management systems.",
      },
      {
        name: "Real Estate Listing Website",
        detail: "Property listing platforms with advanced search filters, virtual tours, agent dashboards, and lead management tools.",
      },
    ],
  },
  {
    id: 2,
    title: "DIGITAL MARKETING",
    items: [
      {
        name: "Search Engine Optimization (SEO)",
        detail: "Comprehensive SEO strategies to improve your search rankings. Technical SEO, content optimization, and link building for sustainable growth.",
      },
      {
        name: "Pay Per Click Advertising (PPC)",
        detail: "Targeted ad campaigns on Google, Facebook, and other platforms. Data-driven approach to maximize ROI and reduce cost per acquisition.",
      },
      {
        name: "Social Media Marketing",
        detail: "Strategic social media campaigns across all major platforms. Content creation, community management, and performance analytics.",
      },
      {
        name: "Email Marketing",
        detail: "Personalized email campaigns that convert. Automated workflows, A/B testing, and detailed analytics to optimize engagement.",
      },
      {
        name: "Influencer Marketing",
        detail: "Connect with the right influencers to amplify your brand message. Campaign management from outreach to performance tracking.",
      },
      {
        name: "Social Media Advertising",
        detail: "Paid social campaigns designed to reach your target audience. Creative ad design, precise targeting, and continuous optimization.",
      },
    ],
  },
  {
    id: 3,
    title: "COMPANY BRANDING",
    items: [
      {
        name: "Brand Strategy",
        detail: "Comprehensive brand positioning and strategy development. Market research, competitive analysis, and unique value proposition creation.",
      },
      {
        name: "Logo Design",
        detail: "Memorable logo designs that capture your brand essence. Multiple concepts, unlimited revisions, and full brand identity guidelines.",
      },
      {
        name: "Brand Identity Design",
        detail: "Complete visual identity systems including color palettes, typography, imagery style, and design elements for consistent branding.",
      },
      {
        name: "Brand Messaging",
        detail: "Compelling brand voice and messaging framework. Taglines, mission statements, and communication guidelines that resonate with your audience.",
      },
      {
        name: "Brand Guidelines",
        detail: "Detailed brand books documenting all visual and verbal brand elements. Ensures consistency across all touchpoints and teams.",
      },
      {
        name: "Brand Experience Design",
        detail: "Holistic brand experiences across digital and physical touchpoints. Customer journey mapping and experience optimization.",
      },
    ],
  },
  {
    id: 4,
    title: "PRODUCTION",
    items: [
      {
        name: "Photo Production",
        detail: "Professional photography services for products, events, corporate, and marketing materials. High-quality images that tell your story.",
      },
      {
        name: "Video Production",
        detail: "End-to-end video production from concept to final edit. Corporate videos, explainers, testimonials, and promotional content.",
      },
      {
        name: "Event Production",
        detail: "Complete event coverage and live production services. Multi-camera setups, live streaming, and post-event highlight reels.",
      },
      {
        name: "Documentary",
        detail: "Compelling documentary storytelling that captures authentic narratives. Research, filming, and post-production for impactful stories.",
      },
      {
        name: "Commercial Production",
        detail: "High-impact commercial videos for TV, digital, and social media. Creative concepts, professional production, and strategic distribution.",
      },
      {
        name: "Live Streaming Production",
        detail: "Professional live streaming services for events, webinars, and broadcasts. Multi-platform streaming with interactive features.",
      },
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
    <div id="services" className="mx-auto bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 w-full shadow-sm py-20 xl:px-0 px-4 min-h-screen">
      <article className="max-w-7xl mx-auto text-center sm:pb-16 pb-6">
        <h1 className="xl:text-[6rem] lg:text-6xl md:text-5xl text-5xl text-gray-800 pt-4 !leading-[100%] mb-4">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.05}
            staggerFrom="first"
            transition={{ type: "spring", stiffness: 200, damping: 21 }}
          >
            Services We Offer
          </VerticalCutReveal>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Comprehensive digital solutions to transform your business
        </p>
      </article>

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const isOpen = isDesktop
            ? hoveredServiceId === service.id
            : openServices.includes(service.id);
          
          // Calculate grid span based on number of items
          const itemCount = service.items.length;
          const shouldSpanTwo = itemCount > 4 && index % 3 === 0;
          
          return (
            <div
              key={service.id}
              className={`group cursor-pointer relative bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-transparent hover:border-gray-400 transition-all duration-500 ease-out shadow-lg hover:shadow-2xl transform hover:-translate-y-2 ${
                shouldSpanTwo ? "md:col-span-2" : ""
              }`}
              onMouseEnter={() => handleServiceHover(service)}
              onClick={() => !isDesktop && handleServiceHover(service)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`uppercase md:text-2xl lg:text-3xl text-xl font-bold leading-[100%] transition-all duration-300 ease-out ${
                      isOpen ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {service.title}
                  </h2>
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isOpen
                        ? "bg-gray-900 text-white rotate-45 scale-110"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>

                {/* Animated gradient line */}
                <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ${
                      isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                  />
                </div>

                {/* List with animation */}
                <div
                  className="overflow-hidden flex-grow"
                  style={{
                    maxHeight: isOpen ? `${service.items.length * 45}px` : "0px",
                    transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <ul
                    className={`space-y-2 ${
                      shouldSpanTwo && isDesktop
                        ? "grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3"
                        : itemCount > 3 && isDesktop
                        ? "grid grid-cols-2 gap-x-4 gap-y-3"
                        : "space-y-3"
                    }`}
                  >
                    {service.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className={`flex items-start gap-2 text-sm md:text-base font-medium text-gray-700 transform transition-all duration-500 ease-out ${
                          isOpen
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-4 opacity-0"
                        }`}
                        style={{ transitionDelay: `${itemIndex * 50}ms` }}
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                        <Tooltip
                          content={item.detail}
                          containerClassName="leading-tight cursor-help hover:text-gray-900 transition-colors"
                        >
                          <span className="leading-tight border-b border-dotted border-gray-400">
                            {item.name}
                          </span>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 transition-opacity duration-500 pointer-events-none ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
