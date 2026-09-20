import { ReactNode, useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SEO from "../SEO";
import ChatBot from "../ChatBot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <Navbar />
      <main className="flex-1 pt-20 md:pt-32">{children}</main>
      <Footer />

      {/* Premium Direct Contact - Replaces ChatBot for High-End Leads */}
      <div className="fixed bottom-8 right-8 z-50 bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-[#76248a] max-w-xs">
        <div className="bg-[#76248a] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-phone text-[#40ddd3] text-xl"></i>
            <span className="font-bold text-sm">Akirapa Care Director</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-gray-700 text-sm font-medium">Speak directly with our clinical team:</p>
          <a
            href="tel:3399701214"
            className="block w-full bg-[#40ddd3] hover:bg-[#34c4ba] text-white font-bold py-3 px-4 rounded-lg text-center transition-all hover:shadow-md"
          >
            339 970 1214
          </a>
          <p className="text-gray-600 text-xs text-center">Available 24/7 for Premium Consultations</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
          }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Layout;
