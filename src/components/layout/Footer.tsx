import { Link } from "react-router-dom";

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
              Providing compassionate, high-quality, and personalized in-home senior care services tailored to your schedule. Headquartered at 209 Burlington Rd, Bedford, MA.
            </p>
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
                { label: "Care Services Overview", path: "/services" },
                { label: "Bedford Location Hub", path: "/locations/bedford-ma" },
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

          {/* Core Services Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-bold text-lg mb-6 text-[#40ddd3] uppercase tracking-wider text-sm">
              Featured Care Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Companion Care", slug: "companion-care" },
                { label: "Personal Care", slug: "personal-care" },
                { label: "Dementia Care", slug: "dementia-care" },
                { label: "Alzheimer's Care", slug: "alzheimers-care" },
                { label: "Respite Care", slug: "respite-care" },
                { label: "Skilled Nursing", slug: "skilled-nursing" },
                { label: "24-Hour Home Care", slug: "24-hour-home-care" },
                { label: "Post-Hospital Care", slug: "post-hospitalization-care" }
              ].map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-white/80 hover:text-[#40ddd3] transition-colors text-base flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span className="text-[#40ddd3] text-xs">›</span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-bold text-lg mb-6 text-[#40ddd3] uppercase tracking-wider text-sm">
              Bedford Headquarters
            </h4>
            <ul className="space-y-4 text-base text-white/90">
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-3">
                <i className="fa-solid fa-location-dot text-[#40ddd3] text-lg shrink-0 mt-1"></i>
                <div className="text-center sm:text-left">
                  <span className="font-bold text-white block">209 Burlington Road</span>
                  <span className="text-white/80 text-sm">Bedford, MA 01730</span>
                </div>
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
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link to="/about" className="hover:text-[#40ddd3] transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-[#40ddd3] transition-colors">Terms of Service</Link>
            <Link to="/locations/bedford-ma" className="hover:text-[#40ddd3] transition-colors">Bedford Service Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
