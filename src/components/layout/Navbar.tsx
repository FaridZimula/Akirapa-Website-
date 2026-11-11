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
                href="https://www.facebook.com/profile.php?id=61593883607014"
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
                        className={`px-3 xl:px-3.5 py-2 rounded-xl text-sm xl:text-[15px] font-bold transition-all duration-300 ease-out whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? "bg-[#76248a] text-white shadow-md scale-105"
                            : "text-gray-700 hover:text-[#76248a] hover:bg-gray-100 hover:scale-105 active:scale-95"
                        }`}
                      >
                        <span>{link.name}</span>
                        <i
                          className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${
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
              <Button variant="outline" asChild className="border-2 border-[#76248a] text-[#76248a] hover:bg-[#76248a] hover:text-white font-bold h-11 px-3.5 xl:px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md text-xs xl:text-sm">
                <Link to="/pricing">Pricing & Rates</Link>
              </Button>
              <Button asChild className="bg-[#76248a] hover:bg-[#561868] text-white font-black h-11 px-4 xl:px-5 rounded-xl shadow-md button-shimmer hover:scale-105 transition-all text-xs xl:text-sm">
                <Link to="/contact">Free Assessment</Link>
              </Button>
            </div>

            {/* Mobile Actions: 1-Tap Helpline + Menu Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="tel:+17812269910"
                className="flex items-center gap-1.5 bg-[#76248a] hover:bg-[#561868] text-white px-3 py-2 rounded-xl text-xs font-black shadow-sm transition-all active:scale-95"
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

