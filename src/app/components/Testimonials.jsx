"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import VerticalCutReveal from "./ui/vertical-cut-reveal";

const testimonials = [
  {
    id: 1,
    name: "Abebe Kebede",
    role: "CEO, TechStart Ethiopia",
    company: "TechStart Ethiopia",
    content: "Nexar Tech Solutions transformed our online presence completely. Their web development team delivered a stunning e-commerce platform that increased our sales by 300%. Highly professional and innovative!",
    avatar: "https://i.pravatar.cc/150?u=abebe",
    rating: 5,
  },
  {
    id: 2,
    name: "Sara Mohammed",
    role: "Marketing Director, Addis Fashion",
    company: "Addis Fashion",
    content: "The digital marketing campaign they created for us was exceptional. Our social media engagement skyrocketed, and we saw a 250% increase in website traffic within just 3 months. Best investment we've made!",
    avatar: "https://i.pravatar.cc/150?u=sara",
    rating: 5,
  },
  {
    id: 3,
    name: "Daniel Tesfaye",
    role: "Founder, Habesha Hotels",
    company: "Habesha Hotels",
    content: "Their hotel booking system is incredibly user-friendly and efficient. The team understood our needs perfectly and delivered beyond expectations. Our booking rates have doubled since launch!",
    avatar: "https://i.pravatar.cc/150?u=daniel",
    rating: 5,
  },
  {
    id: 4,
    name: "Meron Assefa",
    role: "Brand Manager, Ethiopian Coffee Co.",
    company: "Ethiopian Coffee Co.",
    content: "Nexar created a beautiful brand identity for our coffee company. The logo, packaging design, and brand guidelines they developed perfectly capture our heritage and quality. Outstanding work!",
    avatar: "https://i.pravatar.cc/150?u=meron",
    rating: 5,
  },
  {
    id: 5,
    name: "Yohannes Girma",
    role: "Director, Real Estate Plus",
    company: "Real Estate Plus",
    content: "The real estate listing website they built is phenomenal. It's fast, beautiful, and our clients love the user experience. Property inquiries increased by 400% in the first month!",
    avatar: "https://i.pravatar.cc/150?u=yohannes",
    rating: 5,
  },
  {
    id: 6,
    name: "Tigist Alemayehu",
    role: "Owner, Selam Restaurant",
    company: "Selam Restaurant",
    content: "Their video production team created an amazing commercial for our restaurant. The quality is world-class, and it's helped us attract so many new customers. Truly talented professionals!",
    avatar: "https://i.pravatar.cc/150?u=tigist",
    rating: 5,
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="relative min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-medium mb-4">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.05}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 200, damping: 21 }}
            >
              Client Testimonials
            </VerticalCutReveal>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hear what our clients say about working with us
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full flex flex-col">
                    <Quote className="w-10 h-10 text-white/20 mb-4" />
                    
                    <p className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-white w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}