"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export default function Portfolio() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "E-Commerce Platform",
    link: "https://www.nexartechsolution.com/projects/ecommerce",
    thumbnail: "https://picsum.photos/600/600?random=1",
  },
  {
    title: "Social Media Campaign",
    link: "https://www.nexartechsolution.com/projects/social-media",
    thumbnail: "https://picsum.photos/600/600?random=2",
  },
  {
    title: "Brand Identity Design",
    link: "https://www.nexartechsolution.com/projects/branding",
    thumbnail: "https://picsum.photos/600/600?random=3",
  },
  {
    title: "Corporate Video Production",
    link: "https://www.nexartechsolution.com/projects/video-production",
    thumbnail: "https://picsum.photos/600/600?random=4",
  },
  {
    title: "Hotel Booking System",
    link: "https://www.nexartechsolution.com/projects/hotel-booking",
    thumbnail: "https://picsum.photos/600/600?random=5",
  },
  {
    title: "SEO Optimization Campaign",
    link: "https://www.nexartechsolution.com/projects/seo",
    thumbnail: "https://picsum.photos/600/600?random=6",
  },
  {
    title: "Real Estate Website",
    link: "https://www.nexartechsolution.com/projects/real-estate",
    thumbnail: "https://picsum.photos/600/600?random=7",
  },
  {
    title: "Mobile App Development",
    link: "https://www.nexartechsolution.com/projects/mobile-app",
    thumbnail: "https://picsum.photos/600/600?random=8",
  },
  {
    title: "Content Marketing Strategy",
    link: "https://www.nexartechsolution.com/projects/content-marketing",
    thumbnail: "https://picsum.photos/600/600?random=9",
  },
  {
    title: "Logo & Brand Guidelines",
    link: "https://www.nexartechsolution.com/projects/logo-design",
    thumbnail: "https://picsum.photos/600/600?random=10",
  },
  {
    title: "Documentary Production",
    link: "https://www.nexartechsolution.com/projects/documentary",
    thumbnail: "https://picsum.photos/600/600?random=11",
  },
  {
    title: "E-Learning Platform",
    link: "https://www.nexartechsolution.com/projects/elearning",
    thumbnail: "https://picsum.photos/600/600?random=12",
  },
  {
    title: "Social Media Management",
    link: "https://www.nexartechsolution.com/projects/social-management",
    thumbnail: "https://picsum.photos/600/600?random=13",
  },
  {
    title: "Package Design",
    link: "https://www.nexartechsolution.com/projects/package-design",
    thumbnail: "https://picsum.photos/600/600?random=14",
  },
  {
    title: "Commercial Video Ads",
    link: "https://www.nexartechsolution.com/projects/commercial-ads",
    thumbnail: "https://picsum.photos/600/600?random=15",
  },
];