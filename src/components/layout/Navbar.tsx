import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Phone, Mail, HeartPulse, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Care Services", path: "/services" },
  { name: "Our Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-[#76248a] text-white py-2 px-4 sm:px-6 lg:px-8 hidden md:block border-b border-white/10">
        <div className="container-narrow mx-auto flex justify-between items-center text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#40ddd3]" />
              <span>83 Cambridge Street, Burlington, MA 01803</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#40ddd3]" />
              <span className="font-bold text-[#40ddd3]">24/7 Helpline: 339 970 1214</span>
              <span className="text-white/70">/ 781 472 9375</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#40ddd3]" />
              <span>care@akirapahomecare.com</span>
            </div>
            <div className="flex items-center gap-1 bg-[#40ddd3]/20 text-[#40ddd3] px-2.5 py-0.5 rounded-full font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Care Your Way</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#76248a] to-[#561868] flex items-center justify-center text-white shadow-md border border-[#40ddd3]/30">
                <HeartPulse className="w-7 h-7 text-[#40ddd3]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#76248a]">
                  AKIRAPA
                </span>
                <span className="text-xs font-bold tracking-widest text-[#40ddd3] uppercase -mt-1">
                  HOME CARE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-base font-semibold transition-colors ${
                    location.pathname === link.path
                      ? "bg-[#76248a] text-white shadow-sm"
                      : "text-gray-700 hover:text-[#76248a] hover:bg-[#40ddd3]/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" asChild className="border-[#76248a] text-[#76248a] hover:bg-[#76248a] hover:text-white font-semibold">
                <Link to="/services">Get a Quote</Link>
              </Button>
              <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-bold shadow-md">
                <Link to="/contact">Free Assessment</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 animate-fade-in bg-white">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
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
                    <Phone className="w-4 h-4 text-[#40ddd3]" />
                    <span>24/7 Hotline: 339 970 1214 / 781 472 9375</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#40ddd3]" />
                    <span>care@akirapahomecare.com</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-4 pt-2">
                  <Button variant="outline" asChild className="w-full border-[#76248a] text-[#76248a]">
                    <Link to="/services" onClick={() => setIsOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-[#76248a] text-white">
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
