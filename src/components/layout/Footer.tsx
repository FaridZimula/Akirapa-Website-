import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#76248a] text-white pt-16 pb-8 border-t-4 border-[#40ddd3]">
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#40ddd3] flex items-center justify-center text-[#76248a] shadow-md">
                <i className="fa-solid fa-heart-pulse text-2xl text-[#76248a]"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  AKIRAPA
                </span>
                <span className="text-xs font-bold tracking-widest text-[#40ddd3] uppercase -mt-1">
                  HOME CARE
                </span>
              </div>
            </Link>
            <p className="text-white/80 text-base leading-relaxed">
              Providing compassionate, high-quality, and personalized home care services designed around your schedule. Care Your Way.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#40ddd3] bg-white/10 px-3 py-1.5 rounded-lg w-fit">
              <i className="fa-solid fa-shield-halved text-sm"></i>
              <span>Licensed & Certified Caregivers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#40ddd3] uppercase tracking-wider text-sm">
              Quick Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Care Services", path: "/services" },
                { label: "Our Blog", path: "/blog" },
                { label: "Contact Us", path: "/contact" },
                { label: "Free Care Assessment", path: "/contact" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-[#40ddd3] transition-colors text-base flex items-center gap-2"
                  >
                    <span className="text-[#40ddd3] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
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
                    className="text-white/80 hover:text-[#40ddd3] transition-colors text-base flex items-center gap-2"
                  >
                    <span className="text-[#40ddd3] text-xs">›</span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#40ddd3] uppercase tracking-wider text-sm">
              Contact & Location
            </h4>
            <ul className="space-y-4 text-base text-white/90">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-[#40ddd3] text-lg shrink-0 mt-1"></i>
                <span>83 Cambridge Street, Burlington, MA 01803</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-phone text-[#40ddd3] text-lg shrink-0 mt-1"></i>
                <div>
                  <p className="font-bold text-white">339 970 1214 <span className="text-[#40ddd3] text-xs font-normal">(24/7 Service)</span></p>
                  <p className="text-white/80 text-sm">781 472 9375</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-envelope text-[#40ddd3] text-lg shrink-0 mt-1"></i>
                <div className="space-y-0.5 text-sm">
                  <p>info@akirapahomecareus.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70 text-center md:text-left">
          <p>© {new Date().getFullYear()} Akirapa Home Care. All rights reserved.</p>
          <div className="flex items-center gap-6">
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
