import { Link } from "react-router-dom";

export const socialMediaLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/akirapahomecare/",
    icon: "fa-brands fa-instagram",
    hoverClass: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent",
    label: "@akirapahomecare on Instagram",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/akirapahomecare",
    icon: "fa-brands fa-x-twitter",
    hoverClass: "hover:bg-black hover:text-white hover:border-black",
    label: "@akirapahomecare on X",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61593927368567",
    icon: "fa-brands fa-facebook-f",
    hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    label: "Akirapa Home Care on Facebook",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#76248a] text-white pt-16 pb-8 border-t-4 border-[#40ddd3]">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 text-center sm:text-left">
          {/* Brand Column */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <Link to="/" className="inline-block overflow-visible py-2">
              <img
                src="/footer-logo.png"
                alt="Akirapa Home Care"
                className="h-16 sm:h-18 w-auto object-contain scale-[2] sm:scale-[2.4] origin-center sm:origin-left transition-transform hover:scale-[2.1] sm:hover:scale-[2.5]"
              />
            </Link>
            <p className="text-white/80 text-base leading-relaxed max-w-sm">
              Providing compassionate, high-quality, and personalized home care services designed around your schedule. Care Your Way.
            </p>

            {/* Social Media Links */}
            <div className="pt-2 w-full flex flex-col items-center sm:items-start">
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#40ddd3] block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {socialMediaLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md border border-white/15 ${social.hoverClass}`}
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-bold text-lg mb-6 text-[#40ddd3] uppercase tracking-wider text-sm">
              Quick Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Care Services", path: "/services" },
                { label: "AkiVault Platform", path: "/akivault" },
                { label: "Our Blog", path: "/blog" },
                { label: "Careers", path: "/careers" },
                { label: "Contact Us", path: "/contact" },
                { label: "Free Care Assessment", path: "/contact" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-[#40ddd3] transition-colors text-base flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span className="text-[#40ddd3] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-bold text-lg mb-6 text-[#40ddd3] uppercase tracking-wider text-sm">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Hourly Home Care",
                "Daily & 24/7 Home Care",
                "Hospital to Home Care",
                "Respite Care Services",
                "Alzheimer's & Dementia Care",
                "Parkinson's & Stroke Support"
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white/80 hover:text-[#40ddd3] transition-colors text-base flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span className="text-[#40ddd3] text-xs">›</span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-bold text-lg mb-6 text-[#40ddd3] uppercase tracking-wider text-sm">
              Contact & Location
            </h4>
            <ul className="space-y-4 text-base text-white/90">
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-3">
                <i className="fa-solid fa-location-dot text-[#40ddd3] text-lg shrink-0 mt-1"></i>
                <span className="text-center sm:text-left">281 Cambridge Street, Burlington, MA 01803</span>
              </li>
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-3">
                <i className="fa-solid fa-phone text-[#40ddd3] text-lg shrink-0 mt-1"></i>
                <div className="text-center sm:text-left">
                  <p className="font-bold text-white">339 970 1214 <span className="text-[#40ddd3] text-xs font-normal">(24/7 Service)</span></p>
                  <p className="text-white/80 text-sm">781 472 9375</p>
                </div>
              </li>
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-3">
                <i className="fa-solid fa-envelope text-[#40ddd3] text-lg shrink-0 mt-1"></i>
                <div className="space-y-0.5 text-sm text-center sm:text-left">
                  <p>info@akirapahomecareus.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70 text-center md:text-left">
          <p>© {new Date().getFullYear()} Akirapa Home Care. All rights reserved.</p>
          
          {/* Quick Social Connect Links */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/60 hidden sm:inline">Follow Us:</span>
            {socialMediaLinks.map((social) => (
              <a
                key={`bottom-${social.name}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#40ddd3] text-white hover:text-gray-950 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className={`${social.icon} text-sm`}></i>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link to="/about" className="hover:text-[#40ddd3] transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-[#40ddd3] transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#40ddd3] transition-colors">Consumer Rights</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
