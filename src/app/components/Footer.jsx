"use client";

import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Web App Development", href: "#services" },
    { name: "Digital Marketing", href: "#services" },
    { name: "Company Branding", href: "#services" },
    { name: "Production Services", href: "#services" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Nexar Tech Solutions
            </h3>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Building the Digital Future of Ethiopia. We design and deliver innovative, reliable, and future-ready digital solutions for businesses and institutions of all sizes.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400 group">
                <Mail className="w-5 h-5 flex-shrink-0 mt-1 group-hover:text-white transition-colors" />
                <div>
                  <a href="mailto:info@nexartechsolution.com" className="hover:text-white transition-colors block">
                    info@nexartechsolution.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400 group">
                <Phone className="w-5 h-5 flex-shrink-0 mt-1 group-hover:text-white transition-colors" />
                <div className="space-y-1">
                  <a href="tel:+251978225123" className="hover:text-white transition-colors block">
                    +251 978 225 123
                  </a>
                  <a href="tel:+251961413519" className="hover:text-white transition-colors block">
                    +251 961 413 519
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400 group">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1 group-hover:text-white transition-colors" />
                <span>Bole Japan Area, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors inline-block relative group"
                  >
                    {service.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
              <p className="text-center md:text-left">
                © {currentYear} Nexar Tech Solutions. All Rights Reserved.
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}