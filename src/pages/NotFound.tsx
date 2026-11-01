import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 Page Not Found | Akirapa Home Care"
        description="The page you are looking for does not exist on Akirapa Home Care. Return to our homepage to explore senior care services across Massachusetts."
        noindex={true}
      />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md w-full bg-white p-6 sm:p-10 rounded-3xl shadow-lg border border-gray-100 space-y-4">
          <h1 className="text-5xl font-black text-[#76248a]">404</h1>
          <p className="text-xl font-bold text-gray-900">Oops! Page not found</p>
          <p className="text-sm text-gray-600">
            The page you are looking for might have been moved or does not exist.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-[#76248a] hover:bg-[#561868] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
