"use client";
import { ReactLenis } from "lenis/react";

export default function AboutUs() {
  return (
    <ReactLenis root>
      <main>
        <article>
          {/* Section 1: Company Introduction */}
          <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-6xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              Welcome to Nexar Tech Solutions
              <br />
              Building the Digital Future of Ethiopia 🚀
            </h1>
          </section>

          {/* Section 2: Mission & Vision */}
          <section className="bg-gray-300 text-black grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-4xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              Our Mission:
              <br />
              Deliver innovative, reliable, and future-ready digital solutions
              <br />
              for businesses of all sizes.
            </h1>
          </section>

          {/* Section 3: Vision */}
          <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              Our Vision:
              <br />
              Leading Ethiopia into a new digital age defined by innovation,
              intelligence, and inclusion 🌐
            </h1>
          </section>

          {/* Section 4: Services */}
          <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              Services We Offer:
              <br />
              Web & App Development | Digital Marketing | Branding | Production
            </h1>
          </section>

          {/* Section 5: Team */}
          <section className="bg-gray-300 text-black grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-4xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              Meet Our Team:
              <br />
              Experts in Software, Infrastructure, Design, Sales, Security, &
              Production
            </h1>
          </section>

          {/* Section 6: Contact */}
          <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              Contact Us:
              <br />
              Addis Ababa, Bole Japan Area
              <br />
              +251 978 225 123 | +251 961 413 519
              <br />
              www.nexartechsolution.com
            </h1>
          </section>
        </article>
      </main>
    </ReactLenis>
  );
}
