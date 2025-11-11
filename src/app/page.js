"use client";
import { useState } from "react";
import Intro from "./components/Intro";
import Header from "./components/Header";

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Show Intro only until animation finishes */}
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      {/* Wait until Intro finishes before showing Header */}
      {introComplete && (
        <>
          <Header />
          <section className="pt-24">
            {/* Your main page content goes here */}
            <div className="text-center mt-20">
              <h1 className="text-4xl font-bold">
                Welcome to Nexar Tech Solutions
              </h1>
              <p className="text-gray-400 mt-3">
                Building the Digital Future of Ethiopia
              </p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
