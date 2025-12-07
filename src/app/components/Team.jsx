"use client";

import { motion } from "motion/react";
import VerticalCutReveal from "./ui/vertical-cut-reveal";

const teamMembers = [
  {
    name: "Bereket Amare",
    role: "Head of Software Engineering",
    avatar: "https://i.pravatar.cc/200?u=bereket",
  },
  {
    name: "Henos Tefera",
    role: "Head of Infrastructure & DevOps",
    avatar: "https://i.pravatar.cc/200?u=henos",
  },
  {
    name: "Biruh Mitku",
    role: "Head of Cyber Security & Compliance",
    avatar: "https://i.pravatar.cc/200?u=biruh",
  },
  {
    name: "Amen Befetary",
    role: "Head of Quality & Testing (QA)",
    avatar: "https://i.pravatar.cc/200?u=amen",
  },
  {
    name: "Biruk Enyew",
    role: "Creative Director",
    avatar: "https://i.pravatar.cc/200?u=biruk",
  },
  {
    name: "Bersufikad Firew",
    role: "Graphic Designer",
    avatar: "https://i.pravatar.cc/200?u=bersufikad",
  },
  {
    name: "Etsubdink Tesfaye",
    role: "Head of Technical Sales & Support",
    avatar: "https://i.pravatar.cc/200?u=etsubdink",
  },
  {
    name: "Bedomgenet Nega",
    role: "Social Media Manager",
    avatar: "https://i.pravatar.cc/200?u=bedomgenet",
  },
  {
    name: "Esrael Zerfu",
    role: "Production Manager",
    avatar: "https://i.pravatar.cc/200?u=esrael",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative bg-white text-black py-20 px-4">
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
              Our Team
            </VerticalCutReveal>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet the talented professionals behind Nexar Tech Solutions
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-2xl p-6 text-center transition-all duration-300 group-hover:shadow-xl">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/0 to-black/20 group-hover:from-black/10 group-hover:to-black/30 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}