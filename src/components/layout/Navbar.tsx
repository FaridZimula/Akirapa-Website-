import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SubLink {
  name: string;
  path: string;
  description: string;
  icon: string;
}

interface NavLinkItem {
  name: string;
  path: string;
  subLinks?: SubLink[];
}

const navLinks: NavLinkItem[] = [
  { name: "Home", path: "/" },
  { name: "Care Services", path: "/services" },
  {
    name: "About",
    path: "/about",
    subLinks: [
      {
        name: "About Us",
        path: "/about",
        description: "Our mission, leadership & story",
        icon: "fa-solid fa-users",
      },
      {
        name: "Price",
        path: "/pricing",
        description: "Transparent hourly & 24/7 care rates",
        icon: "fa-solid fa-tag",
      },
      {
        name: "Shift Report",
        path: "/sample-shift-report",
        description: "Realistic dummy AkiVault™ shift report",
        icon: "fa-solid fa-file-waveform",
      },
      {
        name: "Standards",
        path: "/standards",
        description: "CNA vetting & 8-point welfare checks",
        icon: "fa-solid fa-clipboard-check",
      },
    ],
  },
  { name: "Locations", path: "/locations" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
  { name: "AkiVault", path: "/akivault" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const isPathActive = (targetPath: string) => {
    if (location.pathname === targetPath) return true;
    if (targetPath === "/sample-shift-report" && location.pathname === "/shift-report") return true;
    if (targetPath === "/standards" && (location.pathname === "/our-standards" || location.pathname === "/standards")) return true;
    if (targetPath === "/pricing" && (location.pathname === "/pricing-guide" || location.pathname === "/pricing")) return true;
    return false;
  };

  const isItemActive = (link: NavLinkItem) => {
    if (isPathActive(link.path)) return true;
    if (link.subLinks && link.subLinks.some((sub) => isPathActive(sub.path))) {
      return true;
    }
    return false;
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 180);
  };

  // Close desktop dropdown on route change
  useEffect(() => {
    setAboutDropdownOpen(false);
  }, [location.pathname]);

  // Keep mobile About accordion expanded if an inner route is active
  useEffect(() => {
    const isAboutActive = navLinks
      .find((l) => l.name === "About")
      ?.subLinks?.some((sub) => isPathActive(sub.path));
    if (isAboutActive) {
      setMobileAboutOpen(true);
    }
  }, [location.pathname]);

  // Close desktop dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Mobile Top Bar (Sleek Helpline & Award) */}
      <div className="bg-[#76248a] text-white py-2 px-3 block md:hidden border-b border-white/10 shadow-xs">
        <div className="flex justify-between items-center text-xs">
          <a href="tel:+17812269910" className="flex items-center gap-1.5 font-bold text-[#40ddd3] active:scale-95 transition-transform">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40ddd3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#40ddd3]"></span>
            </span>
            <i className="fa-solid fa-phone text-xs"></i>
            <span>24/7 Helpline: +1 781-226-9910</span>
          </a>
          <span className="bg-[#40ddd3] text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
            #1 in MA
          </span>
        </div>
      </div>

      {/* Prominent Desktop Purple Header Bar (Generous Size with Contacts & Socials) */}
      <div className="bg-[#76248a] text-white hidden md:block border-b border-white/15 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 lg:py-4 flex justify-between items-center whitespace-nowrap min-h-[64px] lg:min-h-[70px]">
          {/* Left: Office Address & 24/7 Helpline */}
          <div className="flex items-center gap-5 lg:gap-7 flex-nowrap">
            <div className="flex items-center gap-2.5 shrink-0 text-xs sm:text-[13px] font-medium text-white/95">
              <span className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-xs">
                <i className="fa-solid fa-location-dot text-[#40ddd3] text-sm"></i>
              </span>
              <span className="font-semibold tracking-tight">281 Cambridge Street, Burlington, MA 01803</span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-xl border border-white/20 transition-all shadow-xs group">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40ddd3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#40ddd3]"></span>
              </span>
              <i className="fa-solid fa-phone text-[#40ddd3] text-sm group-hover:scale-110 transition-transform"></i>
              <a href="tel:+17812269910" className="font-extrabold text-[#40ddd3] text-xs sm:text-[13px] tracking-wide hover:underline">
                24/7 Helpline: +1 781-226-9910
              </a>
            </div>
          </div>

          {/* Right: Email, Social Media & Award Badge */}
          <div className="flex items-center gap-4 lg:gap-5 flex-nowrap shrink-0">
            <div className="flex items-center gap-2.5 shrink-0 text-xs sm:text-[13px] text-white/95">
              <span className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-xs">
                <i className="fa-solid fa-envelope text-[#40ddd3] text-sm"></i>
              </span>
              <a href="mailto:info@akirapahomecareus.com" className="font-semibold hover:text-[#40ddd3] transition-colors">
                info@akirapahomecareus.com
              </a>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-2 pl-3 border-l border-white/20 shrink-0">
              <span className="text-xs font-semibold text-white/80 hidden xl:inline">Follow:</span>
              <a
                href="https://www.instagram.com/akirapahomecare/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @akirapahomecare"
                title="Follow Akirapa on Instagram"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a
                href="https://x.com/akirapahomecare"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X @akirapahomecare"
                title="Follow Akirapa on X"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <i className="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61593883607014"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Akirapa Home Care"
                title="Follow Akirapa on Facebook"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
            </div>

            {/* Official Accreditation / Ranking Badge */}
            <div className="flex items-center gap-1.5 bg-[#40ddd3] text-gray-950 px-3 py-1.5 rounded-full font-black text-xs shrink-0 shadow-sm hover:scale-105 transition-transform">
              <i className="fa-solid fa-award text-xs text-[#76248a]"></i>
              <span>#1 in Massachusetts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar (Compact & Streamlined — Sized Not to Exceed the Purple Header) */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-shadow duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-[58px] lg:h-[60px]">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center py-1.5 shrink-0 pr-3 xl:pr-6 group">
              <img
                src="/akirapa-logo.png"
                alt="Akirapa Home Care - #1 Home Care in Massachusetts"
                className="h-9 sm:h-10 xl:h-11 w-auto max-w-[150px] sm:max-w-[185px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
              {navLinks.map((link) => {
                const isActive = isItemActive(link);
                const isAkiVault = link.name === "AkiVault";

                if (link.subLinks && link.subLinks.length > 0) {
                  return (
                    <div
                      key={link.name}
                      ref={aboutDropdownRef}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setAboutDropdownOpen((prev) => !prev)}
                        aria-expanded={aboutDropdownOpen}
                        aria-haspopup="true"
                        className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13.5px] font-bold transition-all duration-300 ease-out whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? "bg-[#76248a] text-white shadow-xs scale-105"
                            : "text-gray-700 hover:text-[#76248a] hover:bg-gray-100 hover:scale-105 active:scale-95"
                        }`}
                      >
                        <span>{link.name}</span>
                        <i
                          className={`fa-solid fa-chevron-down text-[9px] transition-transform duration-200 ${
                            aboutDropdownOpen ? "rotate-180" : ""
                          } ${isActive ? "text-white" : "text-gray-400 group-hover:text-[#76248a]"}`}
                        ></i>
                      </button>

                      {/* Dropdown Menu Card */}
                      <div
                        className={`absolute top-full left-0 pt-2 w-80 z-50 transition-all duration-200 ease-out ${
                          aboutDropdownOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto visible"
                            : "opacity-0 -translate-y-2 pointer-events-none invisible"
                        }`}
                      >
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2.5 overflow-hidden ring-1 ring-black/5">
                          <div className="px-3 py-2 mb-1 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#76248a]">
                              About Akirapa
                            </span>
                            <span className="text-[10px] bg-[#40ddd3]/20 text-[#0f5c56] font-bold px-2 py-0.5 rounded-full">
                              Proof &amp; Standards
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            {link.subLinks.map((sub) => {
                              const isSubActive = isPathActive(sub.path);
                              return (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={() => setAboutDropdownOpen(false)}
                                  className={`group/sub flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                                    isSubActive
                                      ? "bg-purple-50 text-[#76248a] font-bold"
                                      : "text-gray-700 hover:text-[#76248a] hover:bg-gray-50"
                                  }`}
                                >
                                  <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                                      isSubActive
                                        ? "bg-[#76248a] text-white shadow-sm"
                                        : "bg-purple-50 text-[#76248a] group-hover/sub:bg-[#76248a] group-hover/sub:text-white"
                                    }`}
                                  >
                                    <i className={`${sub.icon} text-sm`}></i>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-bold block leading-tight">
                                        {sub.name}
                                      </span>
                                      {isSubActive && (
                                        <i className="fa-solid fa-check text-xs text-[#76248a]"></i>
                                      )}
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-normal leading-snug line-clamp-1 group-hover/sub:text-gray-600">
                                      {sub.description}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-[13.5px] font-bold transition-all duration-300 ease-out whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#76248a] text-white shadow-xs scale-105"
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
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
              <Button variant="outline" asChild className="border-2 border-[#76248a] text-[#76248a] hover:bg-[#76248a] hover:text-white font-bold h-9 px-3 xl:px-3.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xs text-xs">
                <Link to="/pricing">Pricing & Rates</Link>
              </Button>
              <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-black h-9 px-3.5 xl:px-4 rounded-lg shadow-xs button-shimmer hover:scale-105 transition-all text-xs">
                <Link to="/contact">Free Assessment</Link>
              </Button>
            </div>

            {/* Mobile Actions: 1-Tap Helpline + Menu Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="tel:+17812269910"
                className="flex items-center gap-1.5 bg-[#76248a] hover:bg-[#561868] text-white px-2.5 py-1.5 rounded-lg text-xs font-black shadow-xs transition-all active:scale-95"
                aria-label="Call 24/7 Helpline +1 781-226-9910"
                title="Call 24/7 Helpline"
              >
                <i className="fa-solid fa-phone text-xs text-[#40ddd3] animate-pulse"></i>
                <span className="hidden xs:inline">Call 24/7</span>
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                className="p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-[#76248a] transition-all active:scale-90 min-h-[44px] min-w-[44px] flex items-center justify-center border border-gray-100"
              >
                {isOpen ? (
                  <i className="fa-solid fa-xmark text-2xl transition-transform rotate-90 duration-300"></i>
                ) : (
                  <i className="fa-solid fa-bars text-2xl transition-transform duration-300"></i>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 animate-tab-slide bg-white max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain shadow-2xl px-1">
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = isItemActive(link);
                  const isAkiVault = link.name === "AkiVault";

                  if (link.subLinks && link.subLinks.length > 0) {
                    return (
                      <div key={link.name} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setMobileAboutOpen((prev) => !prev)}
                          className={`px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 flex items-center justify-between ${
                            isActive
                              ? "bg-[#76248a] text-white shadow-sm"
                              : "text-gray-700 hover:text-[#76248a] hover:bg-gray-100"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{link.name}</span>
                            {isActive && (
                              <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                                Active
                              </span>
                            )}
                          </span>
                          <i
                            className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                              mobileAboutOpen ? "rotate-180" : ""
                            } ${isActive ? "text-[#40ddd3]" : "text-gray-400"}`}
                          ></i>
                        </button>

                        {/* Collapsible Sub-menu for Mobile */}
                        {mobileAboutOpen && (
                          <div className="pl-3 pr-1 pt-1.5 pb-2 flex flex-col gap-1 bg-purple-50/50 rounded-xl mt-1 border border-[#76248a]/10">
                            {link.subLinks.map((sub) => {
                              const isSubActive = isPathActive(sub.path);
                              return (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setMobileAboutOpen(false);
                                  }}
                                  className={`px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 flex items-center justify-between ${
                                    isSubActive
                                      ? "bg-[#76248a] text-white shadow-xs"
                                      : "text-gray-700 hover:text-[#76248a] hover:bg-white"
                                  }`}
                                >
                                  <span className="flex items-center gap-2.5">
                                    <i
                                      className={`${sub.icon} text-xs ${
                                        isSubActive ? "text-[#40ddd3]" : "text-[#76248a]"
                                      }`}
                                    ></i>
                                    <span>{sub.name}</span>
                                  </span>
                                  {isSubActive && <i className="fa-solid fa-check text-xs text-[#40ddd3]"></i>}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 flex items-center justify-between ${
                        isActive
                          ? "bg-[#76248a] text-white shadow-sm"
                          : isAkiVault
                          ? "text-[#76248a] bg-purple-50 hover:bg-[#76248a] hover:text-white border border-[#76248a]/20"
                          : "text-gray-700 hover:text-[#76248a] hover:bg-gray-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isAkiVault && <i className="fa-solid fa-shield-halved text-sm text-[#40ddd3]"></i>}
                        {link.name}
                      </span>
                      {isActive && <i className="fa-solid fa-check text-xs text-[#40ddd3]"></i>}
                    </Link>
                  );
                })}

                <div className="px-4 py-3 border-t border-gray-100 mt-2 space-y-2.5 text-sm text-gray-600 bg-gray-50/70 rounded-2xl mx-1">
                  <div className="flex items-center gap-2 font-bold text-[#76248a]">
                    <i className="fa-solid fa-phone text-[#40ddd3]"></i>
                    <a href="tel:+17812269910" className="hover:underline">
                      24/7 Helpline: +1 781-226-9910
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <i className="fa-solid fa-envelope text-[#40ddd3]"></i>
                    <span>info@akirapahomecareus.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <i className="fa-solid fa-location-dot text-[#40ddd3]"></i>
                    <span>281 Cambridge Street, Burlington, MA</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-bold text-gray-700">Follow:</span>
                    <a
                      href="https://www.instagram.com/akirapahomecare/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-xl bg-white shadow-xs border border-gray-200 hover:bg-[#76248a] text-[#76248a] hover:text-white flex items-center justify-center transition-all"
                    >
                      <i className="fa-brands fa-instagram text-sm"></i>
                    </a>
                    <a
                      href="https://x.com/akirapahomecare"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                      className="w-9 h-9 rounded-xl bg-white shadow-xs border border-gray-200 hover:bg-[#76248a] text-[#76248a] hover:text-white flex items-center justify-center transition-all"
                    >
                      <i className="fa-brands fa-x-twitter text-sm"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61593883607014"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-xl bg-white shadow-xs border border-gray-200 hover:bg-[#76248a] text-[#76248a] hover:text-white flex items-center justify-center transition-all"
                    >
                      <i className="fa-brands fa-facebook-f text-sm"></i>
                    </a>
                  </div>
                </div>

                {/* Quick Strategy Links for Families */}
                <div className="grid grid-cols-2 gap-2 px-2 pt-2">
                  <Link
                    to="/questions-to-ask-a-home-care-agency"
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-xl bg-purple-50 hover:bg-[#76248a] text-[#76248a] hover:text-white font-bold text-xs text-center border border-[#76248a]/20 transition-all"
                  >
                    <i className="fa-solid fa-list-check block mb-1 text-sm text-[#40ddd3]"></i>
                    10 Questions to Ask
                  </Link>
                  <Link
                    to="/case-studies"
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-xl bg-purple-50 hover:bg-[#76248a] text-[#76248a] hover:text-white font-bold text-xs text-center border border-[#76248a]/20 transition-all"
                  >
                    <i className="fa-solid fa-video block mb-1 text-sm text-[#40ddd3]"></i>
                    Case Studies & Videos
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 px-2 pt-2">
                  <Button variant="outline" asChild className="w-full h-11 border-2 border-[#76248a] text-[#76248a] font-bold rounded-xl transition-transform active:scale-95">
                    <Link to="/pricing" onClick={() => setIsOpen(false)}>
                      Pricing & Rates
                    </Link>
                  </Button>
                  <Button asChild className="w-full h-11 bg-[#76248a] text-white font-extrabold rounded-xl shadow-md transition-transform active:scale-95 button-shimmer">
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

