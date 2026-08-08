import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Leadership from "./pages/Leadership"; // About Us
import Projects from "./pages/Projects"; // Care Services
import Blog from "./pages/Blog"; // Our Blog
import Contact from "./pages/Contact"; // Contact Us
import Careers from "./pages/Careers"; // Careers
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    try {
      AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-out-cubic",
        offset: 100,
      });
    } catch (e) {
      console.warn("AOS initialization failed", e);
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <DataProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  {/* Primary Akirapa Home Care Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<Leadership />} />
                  <Route path="/services" element={<Projects />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Backward Compatibility Aliases */}
                  <Route path="/profile" element={<Leadership />} />
                  <Route path="/leadership" element={<Leadership />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/donate" element={<Contact />} />
                  <Route path="/register" element={<Contact />} />

                  {/* Catch-All Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </DataProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
