import React from "react";
import { BarChart3, Zap, TrendingUp } from "lucide-react";

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MapUp</h1>
              <p className="text-sm text-gray-500">EV Analytics Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("dashboard")}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => scrollToSection("analytics")}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => scrollToSection("insights")}
              className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Insights
            </button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">EV Analytics</p>
              <p className="text-xs text-gray-500">Real-time Data</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
