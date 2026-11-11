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
      {/* Mobile Purple Header (Visible on screens < lg) */}
      <div className="bg-[#76248a] text-white py-3 px-3.5 block lg:hidden border-b border-white/10 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Circular White Bordered Logo & Akirapa Home Care text */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" title="Akirapa Home Care">
            <div className="w-11 h-11 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center p-1 overflow-hidden shrink-0">
              <img src="/akirapa-logo.png" alt="Akirapa" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="block text-xs font-black text-white uppercase tracking-wider leading-tight">
                Akirapa
              </span>
              <span className="block text-[10px] font-extrabold text-[#40ddd3] uppercase">
                Home Care
              </span>
            </div>
          </Link>

          {/* Center: 1-Tap Helpline */}
          <div className="text-center">
            <a
              href="tel:+17812269910"
              className="text-base sm:text-lg font-black text-[#40ddd3] block tracking-tight leading-none active:scale-95 transition-transform"
              title="Call 24/7 Helpline"
            >
              781-226-9910
            </a>
            <span className="text-[10px] text-white/80 block mt-0.5 font-medium">24/7 Helpline</span>
          </div>

          {/* Right: Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90 min-h-[42px] min-w-[42px] flex items-center justify-center border border-white/15"
          >
            {isOpen ? (
              <i className="fa-solid fa-xmark text-xl transition-transform rotate-90 duration-300"></i>
            ) : (
              <i className="fa-solid fa-bars text-xl transition-transform duration-300"></i>
            )}
          </button>
        </div>
      </div>

      {/* Prominent Desktop Purple Header Bar (Expanded Height to Reach Image) */}
      <div className="bg-[#76248a] text-white hidden lg:block border-b border-white/15 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-7 xl:py-8 min-h-[120px] lg:min-h-[132px] xl:min-h-[140px] flex items-center justify-between gap-6 whitespace-nowrap">
          {/* Left: Akirapa Logo in White Circle Border with "Akirapa Home Care" text underneath */}
          <Link to="/" className="flex flex-col items-center group shrink-0" title="Akirapa Home Care - Massachusetts">
            <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-white border-2 xl:border-[3px] border-white shadow-md flex items-center justify-center p-1.5 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
              <img
                src="/akirapa-logo.png"
                alt="Akirapa Home Care"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="mt-1 text-[11px] xl:text-xs font-black text-white tracking-wider uppercase text-center whitespace-nowrap drop-shadow-xs">
              Akirapa Home Care
            </span>
          </Link>

          {/* Center: 4x Bigger Phone Number with Email directly underneath */}
          <div className="flex flex-col items-center justify-center text-center shrink-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40ddd3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#40ddd3]"></span>
              </span>
              <span className="text-[10px] xl:text-xs font-extrabold uppercase tracking-widest text-[#40ddd3]">
                24/7 Massachusetts Helpline
              </span>
            </div>

            {/* Phone Number: 4x bigger than standard text, bold and prominent */}
            <a
              href="tel:+17812269910"
              className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-black text-white hover:text-[#40ddd3] tracking-tight transition-colors duration-200 leading-none drop-shadow-xs flex items-center gap-2.5 group"
              title="Call 24/7 Helpline +1 781-226-9910"
            >
              <i className="fa-solid fa-phone text-xl sm:text-2xl lg:text-3xl text-[#40ddd3] group-hover:scale-110 transition-transform"></i>
              <span className="text-white group-hover:text-[#40ddd3] transition-colors">+1 781-226-9910</span>
            </a>

            {/* Immediate bottom: Email in original size + office address */}
            <div className="flex items-center gap-3 mt-1.5 text-xs xl:text-[13px] text-white/90">
              <a
                href="mailto:info@akirapahomecareus.com"
                className="flex items-center gap-1.5 font-semibold hover:text-[#40ddd3] transition-colors"
              >
                <i className="fa-solid fa-envelope text-[#40ddd3] text-xs"></i>
                <span>info@akirapahomecareus.com</span>
              </a>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1.5 text-white/80 font-medium">
                <i className="fa-solid fa-location-dot text-[#40ddd3] text-xs"></i>
                <span>281 Cambridge St, Burlington, MA</span>
              </div>
            </div>
          </div>

          {/* Right: Socials/Badge & 1.5x Sized CTA Buttons */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {/* Badge & Social Media */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#40ddd3] text-gray-950 px-2.5 py-0.5 rounded-full font-bold text-[11px] shadow-xs">
                <i className="fa-solid fa-award text-xs text-[#76248a]"></i>
                <span>#1 in Massachusetts</span>
              </div>
              <div className="flex items-center gap-1.5 pl-2 border-l border-white/20">
                <a
                  href="https://www.instagram.com/akirapahomecare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @akirapahomecare"
                  title="Follow Akirapa on Instagram"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                >
                  <i className="fa-brands fa-instagram text-xs"></i>
                </a>
                <a
                  href="https://x.com/akirapahomecare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X @akirapahomecare"
                  title="Follow Akirapa on X"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                >
                  <i className="fa-brands fa-x-twitter text-xs"></i>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61593883607014"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Akirapa Home Care"
                  title="Follow Akirapa on Facebook"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#40ddd3] text-white hover:text-gray-950 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                >
                  <i className="fa-brands fa-facebook-f text-xs"></i>
                </a>
              </div>
            </div>

            {/* Buttons reduced by half (compact, sleek & elegant) */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                asChild
                className="border border-[#40ddd3] text-white hover:bg-[#40ddd3] hover:text-gray-950 font-bold h-8 px-3 xl:px-3.5 rounded-lg transition-all duration-300 hover:scale-105 shadow-xs text-[11px] xl:text-xs bg-transparent"
              >
                <Link to="/pricing">Pricing &amp; Rates</Link>
              </Button>
              <Button
                asChild
                className="bg-[#40ddd3] hover:bg-white text-gray-950 hover:text-[#76248a] font-extrabold h-8 px-3.5 xl:px-4 rounded-lg shadow-xs button-shimmer hover:scale-105 transition-all text-[11px] xl:text-xs"
              >
                <Link to="/contact">Free Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Floating Nav Dock (Spans only up to where tabs end, rounded bottom corners, premium shadow) */}
      <div className="hidden lg:flex justify-center w-full px-4 pointer-events-none">
        <nav className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-b-2xl xl:rounded-b-3xl border border-t-0 border-gray-200/90 shadow-[0_14px_36px_rgba(0,0,0,0.14),0_4px_12px_rgba(118,36,138,0.08)] px-3.5 xl:px-5 py-2 inline-flex items-center justify-center gap-1 xl:gap-2 transition-all duration-300 hover:shadow-[0_18px_44px_rgba(0,0,0,0.18),0_6px_16px_rgba(118,36,138,0.12)]">
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
                    className={`px-3 xl:px-3.5 py-1.5 rounded-xl text-xs xl:text-[13.5px] font-bold transition-all duration-300 ease-out whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
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
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 z-50 transition-all duration-200 ease-out ${
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
                className={`px-3 xl:px-3.5 py-1.5 rounded-xl text-xs xl:text-[13.5px] font-bold transition-all duration-300 ease-out whitespace-nowrap flex items-center gap-1.5 ${
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
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden py-4 border-t border-gray-100 animate-tab-slide bg-white max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain shadow-2xl px-3">
          <div className="flex flex-col gap-1.5">
            {/* Quick 1.5x CTA Buttons in Drawer */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button variant="outline" asChild className="w-full h-11 border-2 border-[#76248a] text-[#76248a] font-bold rounded-xl text-xs active:scale-95">
                <Link to="/pricing" onClick={() => setIsOpen(false)}>
                  Pricing &amp; Rates
                </Link>
              </Button>
              <Button asChild className="w-full h-11 bg-[#76248a] text-white font-black rounded-xl shadow-md text-xs active:scale-95 button-shimmer">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Free Assessment
                </Link>
              </Button>
            </div>

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

            <div className="px-4 py-3 border-t border-gray-100 mt-2 space-y-2.5 text-sm text-gray-600 bg-gray-50/70 rounded-2xl">
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
            <div className="grid grid-cols-2 gap-2 pt-2">
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
                Case Studies &amp; Videos
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

