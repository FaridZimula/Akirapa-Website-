import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Care Services", path: "/services" },
  { name: "Bedford Office", path: "/locations/bedford-ma" },
  { name: "Our Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-[#76248a] text-white py-2 px-4 sm:px-6 lg:px-8 hidden md:block border-b border-white/10">
        <div className="container-narrow mx-auto flex justify-between items-center text-xs sm:text-sm font-medium whitespace-nowrap">
          <div className="flex items-center gap-6 flex-nowrap">
            <div className="flex items-center gap-2 shrink-0">
              <i className="fa-solid fa-location-dot text-[#40ddd3]"></i>
              <span>209 Burlington Road, Bedford, MA 01730</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <i className="fa-solid fa-phone text-[#40ddd3]"></i>
              <span className="font-bold text-[#40ddd3]">24/7 Helpline: 339 970 1214</span>
              <span className="text-white/70">/ 781 472 9375</span>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-nowrap shrink-0">
            <div className="flex items-center gap-2 shrink-0">
              <i className="fa-solid fa-envelope text-[#40ddd3]"></i>
              <span>info@akirapahomecareus.com</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#40ddd3] text-white px-2.5 py-0.5 rounded-full font-semibold shrink-0 shadow-sm">
              <i className="fa-solid fa-clock text-xs text-white"></i>
              <span>Care Your Way</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 sm:h-28">
            {/* Brand Logo */}
<<<<<<< HEAD
            <Link to="/" className="flex items-center overflow-visible py-2 pl-3 mr-12 sm:mr-20 lg:mr-24 xl:mr-32">
=======
            <Link to="/" className="flex items-center overflow-visible py-2 pl-3">
>>>>>>> parent of 3cd984b (feat: implement responsive Navbar component with branding, navigation links, and contact information)
              <img
                src="/akirapa-logo.png"
                alt="Akirapa Home Care"
                className="h-14 sm:h-16 w-auto object-contain scale-[2.2] sm:scale-[2.6] origin-left transition-transform hover:scale-[2.3] sm:hover:scale-[2.7]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.path === "/services") {
                  return (
                    <div
                      key={link.path}
                      className="relative group"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <Link
                        to="/services"
                        className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-1.5 ${
                          location.pathname.startsWith("/services")
                            ? "bg-[#76248a] text-white shadow-sm"
                            : "text-gray-700 hover:text-[#76248a] hover:bg-[#40ddd3]/10"
                        }`}
                      >
                        <span>{link.name}</span>
                        <i className="fa-solid fa-chevron-down text-xs opacity-70"></i>
                      </Link>

                      {/* Dropdown Menu */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 grid gap-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <Link
                            to="/services"
                            className="p-2.5 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-[#76248a] border-b border-gray-100 uppercase tracking-wider block"
                          >
                            All Care Services Overview →
                          </Link>
                          {[
                            { title: "Companion Care", slug: "companion-care" },
                            { title: "Personal Care", slug: "personal-care" },
                            { title: "Dementia Care", slug: "dementia-care" },
                            { title: "Alzheimer's Care", slug: "alzheimers-care" },
                            { title: "Respite Care", slug: "respite-care" },
                            { title: "Skilled Nursing", slug: "skilled-nursing" },
                            { title: "24-Hour Home Care", slug: "24-hour-home-care" },
                            { title: "Live-In Care", slug: "live-in-care" },
                            { title: "Post-Hospitalization Care", slug: "post-hospitalization-care" },
                          ].map((item) => (
                            <Link
                              key={item.slug}
                              to={`/services/${item.slug}`}
                              className="px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 hover:text-[#76248a] hover:bg-[#76248a]/5 transition-colors block"
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                      location.pathname === link.path
                        ? "bg-[#76248a] text-white shadow-sm"
                        : "text-gray-700 hover:text-[#76248a] hover:bg-[#40ddd3]/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" asChild className="border-[#76248a] text-[#76248a] hover:bg-[#76248a] hover:text-white font-bold text-xs">
                <Link to="/services">Care Services</Link>
              </Button>
              <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs shadow-md">
                <Link to="/contact">Free Assessment</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? (
                <i className="fa-solid fa-xmark text-2xl"></i>
              ) : (
                <i className="fa-solid fa-bars text-2xl"></i>
              )}
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
                    <i className="fa-solid fa-phone text-[#40ddd3]"></i>
                    <span>24/7 Hotline: 339 970 1214</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-[#40ddd3]"></i>
                    <span>209 Burlington Rd, Bedford, MA</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-4 pt-2">
                  <Button variant="outline" asChild className="w-full border-[#76248a] text-[#76248a]">
                    <Link to="/services" onClick={() => setIsOpen(false)}>
                      Care Services
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
