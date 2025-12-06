"use client";

import { useState } from "react";
import Intro from "./components/Intro";
import SmoothFollower from "./components/Cursor";
import Hero from "./components/Hero";
import { ReactLenis } from "lenis/react";
import AboutUs from "./components/Aboutus";
import Header from "./components/Header";
import Motivation from "./components/Motivation";
<<<<<<< HEAD
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
=======
>>>>>>> 764d7959d32ee2c6b8097327ff1a306096ccb445

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <ReactLenis root>
      <main className="relative min-h-screen bg-black text-white ">
        <SmoothFollower />

        {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

        {introComplete && (
          <>
            <Header />
            <Hero />
            <Motivation />
            <AboutUs />
<<<<<<< HEAD
            <Portfolio />
            <Contact />
            <Footer />
=======
>>>>>>> 764d7959d32ee2c6b8097327ff1a306096ccb445
          </>
        )}
      </main>
    </ReactLenis>
  );
}
