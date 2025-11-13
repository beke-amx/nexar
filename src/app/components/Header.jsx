"use client";
import { useMediaQuery } from "../hooks/use-media-query";
import { AlignJustify, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Drawer } from "vaul";
import Image from "next/image";
import VerticalCutReveal from "./ui/vertical-cut-reveal";

function Header() {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // controls visibility
  const lastScrollY = useRef(0);

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex gap-15 z-50 text-neutral-900 backdrop-blur-lg bg-white/60 rounded-lg items-center justify-between max-w-5xl m-4 px-5 py-2 lg:mx-auto mx-1 fixed left-0 right-0 top-4 transition-transform duration-300 shadow-sm
        ${showHeader || "hidden"} 
      `}
    >
      {!isMobile ? (
        <>
          {/* Logo */}
          <div className="flex items-center gap-2 px-4">
            <Image
              src="/photo/nexar.png"
              alt="Nexar Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-semibold">Nexar</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex gap-4 font-medium">
            <a href="#">Features</a>
            <a href="#">Services</a>
            <a href="#">Portfolio</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </>
      ) : (
        // Mobile Drawer
        <Drawer.Root direction="right" open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center gap-3 justify-between w-full">
            <Image
              src="/photo/nexar.png"
              alt="Nexar Logo"
              width={35}
              height={35}
              className="rounded-full"
            />
            <Drawer.Trigger className="px-2 text-black h-9 grid place-content-center bg-neutral-300 w-fit rounded-lg">
              <AlignJustify />
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
                      <li className="hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        Features
                      </li>
                      <li className="hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        Services
                      </li>
                      <li className="hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        Portfolio
                      </li>
                      <li className="hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        About
                      </li>
                      <li className="hover:bg-neutral-200 cursor-pointer p-2 rounded-md">
                        Contact
                      </li>
                    </VerticalCutReveal>
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
