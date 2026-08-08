import React from "react";

interface AdminSplashScreenProps {
  message?: string;
}

const AdminSplashScreen: React.FC<AdminSplashScreenProps> = ({
  message = "Loading Akirapa Admin Dashboard...",
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 space-y-6 transition-opacity duration-300">
      {/* Centered Brand Logo */}
      <div className="relative flex items-center justify-center">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white p-4 shadow-xl border border-gray-100 flex items-center justify-center animate-pulse">
          <img
            src="/akirapa-logo.png"
            alt="Akirapa Home Care Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Loading Title & Message */}
      <div className="text-center space-y-2 max-w-sm">
        <h2 className="text-2xl font-extrabold text-[#76248a] tracking-tight">
          Akirapa Admin Workspace
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm font-medium">
          {message}
        </p>
      </div>

      {/* Theme Purple Loading Spinner */}
      <div className="flex items-center gap-2 text-[#76248a] pt-2">
        <i className="fa-solid fa-circle-notch fa-spin text-2xl"></i>
      </div>
    </div>
  );
};

export default AdminSplashScreen;
