
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Heart, Baby, Book, Sparkles, User, Settings } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-semibold tracking-tight text-primary"
          >
            <span className="animate-fade-in">NameMuse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/boy-names" 
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              Boy Names
            </Link>
            <Link 
              to="/girl-names" 
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              Girl Names
            </Link>
            <Link 
              to="/unique-names" 
              className="text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center"
            >
              <Sparkles size={14} className="mr-1" /> Unique Names
            </Link>
            <Link 
              to="/name-meanings" 
              className="text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center"
            >
              <Book size={14} className="mr-1" /> Name Meanings
            </Link>
            <Link 
              to="/love-calculator" 
              className="text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center"
            >
              <Heart size={14} className="mr-1" /> Love Calculator
            </Link>
            <Link 
              to="/baby-name-matcher" 
              className="text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center"
            >
              <Baby size={14} className="mr-1" /> Baby Name Matcher
            </Link>
            <Link 
              to="/famous-personalities" 
              className="text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center"
            >
              <User size={14} className="mr-1" /> Famous Names
            </Link>
            <Link 
              to="/admin" 
              className="text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center"
            >
              <Settings size={14} className="mr-1" /> Admin
            </Link>
            <button 
              className="text-sm font-medium flex items-center hover:text-primary transition-colors duration-200"
            >
              <Search size={16} className="mr-1" /> Search
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-4 animate-fade-in">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/boy-names" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Boy Names
              </Link>
              <Link 
                to="/girl-names" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Girl Names
              </Link>
              <Link 
                to="/unique-names" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles size={14} className="mr-1" /> Unique Names
              </Link>
              <Link 
                to="/name-meanings" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Book size={14} className="mr-1" /> Name Meanings
              </Link>
              <Link 
                to="/love-calculator" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={14} className="mr-1" /> Love Calculator
              </Link>
              <Link 
                to="/baby-name-matcher" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Baby size={14} className="mr-1" /> Baby Name Matcher
              </Link>
              <Link 
                to="/famous-personalities" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={14} className="mr-1" /> Famous Names
              </Link>
              <Link 
                to="/admin" 
                className="text-sm font-medium hover:text-primary transition-colors duration-200 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={14} className="mr-1" /> Admin Panel
              </Link>
              <Link 
                to="/search" 
                className="text-sm font-medium flex items-center hover:text-primary transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search size={16} className="mr-1" /> Search
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
