import { useEffect } from "react";
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

// Admin Imports
import AdminLayout from "./pages/admin/AdminLayout";
import Login from "./pages/admin/Login";
import CareersEditor from "./pages/admin/CareersEditor";
import Messages from "./pages/admin/Messages";
import Donations from "./pages/admin/Donations";
import VideosEditor from "./pages/admin/VideosEditor";
import Members from "./pages/admin/Members";
import ProjectsEditor from "./pages/admin/ProjectsEditor";
import LeadershipEditor from "./pages/admin/LeadershipEditor";
import PartnersEditor from "./pages/admin/PartnersEditor";

import AkiVault from "./pages/AkiVault";

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
                  <Route path="/akivault" element={<AkiVault />} />
                  <Route path="/AkiVault.html" element={<AkiVault />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Admin Portal Routes */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<CareersEditor />} />
                    <Route path="careers" element={<CareersEditor />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="donations" element={<Donations />} />
                    <Route path="videos" element={<VideosEditor />} />
                    <Route path="members" element={<Members />} />
                    <Route path="projects" element={<ProjectsEditor />} />
                    <Route path="leadership" element={<LeadershipEditor />} />
                    <Route path="partners" element={<PartnersEditor />} />
                  </Route>

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
