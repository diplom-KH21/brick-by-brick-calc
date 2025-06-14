
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Calculator, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">brick-by-brick</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Головна
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Про нас
            </Link>
            <Link to="/contacts" className="text-gray-700 hover:text-blue-600 transition-colors">
              Контакти
            </Link>
            {user ? (
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <User className="h-4 w-4 mr-1" />
                Кабінет
              </Link>
            ) : (
              <Link to="/auth" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <User className="h-4 w-4 mr-1" />
                Увійти
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Головна
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Про нас
              </Link>
              <Link
                to="/contacts"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Контакти
              </Link>
              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  <User className="h-4 w-4 mr-2" />
                  Особистий кабінет
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  <User className="h-4 w-4 mr-2" />
                  Увійти
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
