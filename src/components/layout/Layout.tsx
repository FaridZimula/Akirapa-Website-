import { ReactNode, useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "../ChatBot";
import CookieConsent from "../CookieConsent";

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
    <div className="min-h-screen flex flex-col overflow-x-clip w-full">
      <Navbar />
      <main className="flex-1 pt-20 md:pt-32 w-full overflow-x-clip">{children}</main>
      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-40 p-3 sm:p-4 rounded-full bg-primary text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] min-w-[44px] flex items-center justify-center ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Floating 24/7 AI / Live Chat Widget */}
      <ChatBot />

      {/* Interactive Cookie, Privacy & HIPAA Compliance Banner */}
      <CookieConsent />
    </div>
  );
};

export default Layout;
