import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Classes', path: '/classes' },
    { name: 'Locations', path: '/locations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="bg-secondary-500 text-white rounded-full p-2"
          >
            <Play className="h-6 w-6" />
          </motion.div>
          <span className={`font-bold text-xl md:text-2xl transition-colors duration-300 ${
            isScrolled ? 'text-secondary-700' : 'text-secondary-800'
          }`}>
            Sensory & ME
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium transition-colors duration-300 hover:text-secondary-600 ${
                location.pathname === item.path 
                  ? 'text-secondary-600 font-semibold' 
                  : isScrolled ? 'text-gray-800' : 'text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/classes" className="btn-primary ml-4">
            Book a Class
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg absolute w-full"
        >
          <div className="container-custom py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium py-2 transition-colors ${
                  location.pathname === item.path 
                    ? 'text-secondary-600 font-semibold' 
                    : 'text-gray-800 hover:text-secondary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/classes" className="btn-primary w-full text-center mt-4">
              Book a Class
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;