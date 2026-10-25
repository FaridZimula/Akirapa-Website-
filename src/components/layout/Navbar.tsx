import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Care Services", path: "/services" },
  { name: "Our Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact Us", path: "/contact" },
  { name: "AkiVault", path: "/akivault" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-[#76248a] text-white py-2 px-4 sm:px-6 lg:px-8 hidden md:block border-b border-white/10">
        <div className="container-narrow mx-auto flex justify-between items-center text-xs sm:text-sm font-medium whitespace-nowrap">
          <div className="flex items-center gap-6 flex-nowrap">
            <div className="flex items-center gap-2 shrink-0">
              <i className="fa-solid fa-location-dot text-[#40ddd3]"></i>
              <span>281 Cambridge Street, Burlington, MA 01803</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40ddd3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#40ddd3]"></span>
              </span>
              <i className="fa-solid fa-phone text-[#40ddd3]"></i>
              <a href="tel:+17812269910" className="font-bold text-[#40ddd3] hover:underline">
                24/7 Helpline: +1 781-226-9910
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-nowrap shrink-0">
            <div className="flex items-center gap-2 shrink-0">
              <i className="fa-solid fa-envelope text-[#40ddd3]"></i>
              <span>info@akirapahomecareus.com</span>
            </div>
            
            {/* Social Media Links Header */}
            <div className="flex items-center gap-2 pl-3 border-l border-white/20 shrink-0">
              <span className="text-[11px] text-white/70">Follow:</span>
              <a
                href="https://www.instagram.com/akirapahomecare/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @akirapahomecare"
                title="Follow Akirapa on Instagram"
                className="w-6 h-6 rounded-md bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fa-brands fa-instagram text-xs"></i>
              </a>
              <a
                href="https://x.com/akirapahomecare"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X @akirapahomecare"
                title="Follow Akirapa on X"
                className="w-6 h-6 rounded-md bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fa-brands fa-x-twitter text-xs"></i>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61593927368567"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Akirapa Home Care"
                title="Follow Akirapa on Facebook"
                className="w-6 h-6 rounded-md bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
            </div>

            <div className="flex items-center gap-1.5 bg-[#40ddd3] text-gray-950 px-2.5 py-0.5 rounded-full font-bold text-xs shrink-0 shadow-sm">
              <i className="fa-solid fa-award text-xs text-[#76248a]"></i>
              <span>#1 in Massachusetts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-shadow duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center py-2 shrink-0 pr-3 xl:pr-6 group">
              <img
                src="/akirapa-logo.png"
                alt="Akirapa Home Care - #1 Home Care in Massachusetts"
                className="h-14 sm:h-16 xl:h-18 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isAkiVault = link.name === "AkiVault";
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 xl:px-3.5 py-2 rounded-xl text-sm xl:text-[15px] font-bold transition-all duration-300 ease-out whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#76248a] text-white shadow-md scale-105"
                        : isAkiVault
                        ? "text-[#76248a] bg-purple-50/90 hover:bg-[#76248a] hover:text-white border border-[#76248a]/20 shadow-xs"
                        : "text-gray-700 hover:text-[#76248a] hover:bg-gray-100 hover:scale-105 active:scale-95"
                    }`}
                  >
                    {isAkiVault && <i className="fa-solid fa-shield-halved text-xs text-[#40ddd3]"></i>}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              <Button variant="outline" asChild className="border-2 border-[#76248a] text-[#76248a] hover:bg-[#76248a] hover:text-white font-bold h-11 px-4 xl:px-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md text-xs xl:text-sm">
                <Link to="/services">Get a Quote</Link>
              </Button>
              <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-black h-11 px-4 xl:px-5 rounded-xl shadow-md button-shimmer hover:scale-105 transition-all text-xs xl:text-sm">
                <Link to="/contact">Free Assessment</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-transform active:scale-90"
            >
              {isOpen ? (
                <i className="fa-solid fa-xmark text-2xl transition-transform rotate-90 duration-300"></i>
              ) : (
                <i className="fa-solid fa-bars text-2xl transition-transform duration-300"></i>
              )}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 animate-tab-slide bg-white">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? "bg-[#76248a] text-white"
                        : "text-gray-700 hover:text-[#76248a] hover:bg-[#40ddd3]/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="px-4 py-3 border-t border-gray-100 mt-2 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2 font-semibold text-[#76248a]">
                    <i className="fa-solid fa-phone text-[#40ddd3]"></i>
                    <a href="tel:+17812269910" className="hover:underline">
                      24/7 Hotline: +1 781-226-9910
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-envelope text-[#40ddd3]"></i>
                    <span>info@akirapahomecareus.com</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-bold text-gray-700">Follow Us:</span>
                    <a
                      href="https://www.instagram.com/akirapahomecare/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-8 h-8 rounded-lg bg-[#76248a]/10 hover:bg-[#76248a] text-[#76248a] hover:text-white flex items-center justify-center transition-all"
                    >
                      <i className="fa-brands fa-instagram text-sm"></i>
                    </a>
                    <a
                      href="https://x.com/akirapahomecare"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                      className="w-8 h-8 rounded-lg bg-[#76248a]/10 hover:bg-[#76248a] text-[#76248a] hover:text-white flex items-center justify-center transition-all"
                    >
                      <i className="fa-brands fa-x-twitter text-sm"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61593927368567"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-8 h-8 rounded-lg bg-[#76248a]/10 hover:bg-[#76248a] text-[#76248a] hover:text-white flex items-center justify-center transition-all"
                    >
                      <i className="fa-brands fa-facebook-f text-sm"></i>
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-4 pt-2">
                  <Button variant="outline" asChild className="w-full border-[#76248a] text-[#76248a] transition-transform active:scale-95">
                    <Link to="/services" onClick={() => setIsOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-[#76248a] text-white transition-transform active:scale-95">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      Free Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
