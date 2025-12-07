"use client";
import { useMediaQuery } from "../hooks/use-media-query";
import { AlignJustify, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Drawer } from "vaul";
import Image from "next/image";

function Header() {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 992px)");
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex gap-4 z-50 text-neutral-900 backdrop-blur-xl items-center justify-between max-w-dvw lg:max-w-6xl m-4 px-4 md:px-6 py-3 lg:mx-auto mx-1 fixed left-0 right-0 top-0 transition-all duration-500 ease-out ${
        showHeader ? "translate-y-0" : "-translate-y-32"
      } ${
        isScrolled 
          ? "bg-white/90 shadow-xl rounded-2xl" 
          : "bg-white/60 shadow-sm rounded-lg"
      }`}
    >
      {!isMobile ? (
        <>
          {/* Logo with animation */}
          <div className="flex items-center gap-3 px-2">
            <div className="relative">
              <Image
                src="/photo/nexar.png"
                alt="Nexar Logo"
                width={isMedium ? 45 : 40}
                height={isMedium ? 45 : 40}
                className="rounded-full transition-all duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold transition-all duration-300 ${
                isMedium ? "text-xl" : "text-lg"
              }`}>
                Nexar
              </span>
              {isMedium && (
                <span className="text-xs text-gray-600 font-medium">
                  Tech Solutions
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation with hover effects */}
          <nav className="flex gap-8 font-medium">
            {[
              { name: "Services", href: "#services" },
              { name: "Portfolio", href: "#portfolio" },
              { name: "Testimonials", href: "#testimonials" },
              { name: "Contact", href: "#contact" },
            ].map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="relative group py-2 transition-colors hover:text-gray-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </>
      ) : (
        // Mobile Drawer
        <Drawer.Root direction="right" open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center gap-3 justify-between w-full">
            <div className="flex items-center gap-2">
              <Image
                src="/photo/nexar.png"
                alt="Nexar Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-lg font-bold">Nexar</span>
            </div>
            <Drawer.Trigger className="px-3 py-2 text-black grid place-content-center bg-neutral-300 hover:bg-neutral-400 w-fit rounded-lg transition-all duration-300 hover:scale-105">
              <AlignJustify className="w-5 h-5" />
            </Drawer.Trigger>
          </div>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content
              className="right-2 top-2 bottom-2 fixed z-50 outline-none w-72 flex"
              style={{ "--initial-transform": "calc(100% + 8px)" }}
            >
              <Drawer.Title></Drawer.Title>
              <div className="bg-gradient-to-t from-neutral-500 via-neutral-300 to-neutral-400 border border-neutral-400 text-white p-2 h-full w-full grow flex flex-col rounded-[16px]">
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-2 px-4">
                    <Image
                      src="/photo/nexar.png"
                      alt="Nexar Logo"
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                    <span className="text-lg font-semibold text-neutral-950">
                      Nexar
                    </span>
                  </div>
                  <button
                    className="rounded-md w-fit bg-neutral-950 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                  </button>
                </div>

                <div className="rounded-b-md py-4 px-3 mt-4">
                  <ul className="space-y-2 text-neutral-950 font-medium">
                    <li>
                      <a href="#services" onClick={() => setIsOpen(false)} className="block hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        Services
                      </a>
                    </li>
                    <li>
                      <a href="#portfolio" onClick={() => setIsOpen(false)} className="block hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        Portfolio
                      </a>
                    </li>
                    <li>
                      <a href="#testimonials" onClick={() => setIsOpen(false)} className="block hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        Testimonials
                      </a>
                    </li>
                    <li>
                      <a href="#contact" onClick={() => setIsOpen(false)} className="block hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </header>
  );
}

export default Header;
