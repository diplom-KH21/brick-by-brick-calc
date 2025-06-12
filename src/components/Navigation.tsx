
import React from "react";
import { Building2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">brick-by-brick</h1>
          </div>
          <nav className="flex space-x-4 md:space-x-8">
            <a 
              href="/" 
              className={`font-medium text-sm md:text-base transition-colors ${
                isActive("/") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Калькулятор
            </a>
            <a 
              href="/about" 
              className={`font-medium text-sm md:text-base transition-colors ${
                isActive("/about") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Про проект
            </a>
            <a 
              href="/contacts" 
              className={`font-medium text-sm md:text-base transition-colors ${
                isActive("/contacts") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Контакти
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
