import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();

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

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Classes', path: '/classes' },
    { name: 'Therapy Services', path: '/therapy-services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-12 w-12"
          >
            <img 
              src="/images/Purple & Green Playful Children's Logo.png" 
              alt="Learn by Sensory Logo" 
              className="h-full w-full object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-bold text-xl md:text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-purple-700' : 'text-purple-800'
            }`}
          >
            <span className="text-green-600">Learn</span>
            <span className="text-purple-600">&nbsp;by&nbsp;</span>
            <span className="text-green-600">Sensory</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center ml-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium transition-colors duration-300 hover:text-purple-600 ${
                location.pathname === item.path
                  ? 'text-purple-600 font-semibold'
                  : isScrolled ? 'text-gray-800' : 'text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/classes" className="btn-primary">
            Book a Class
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-lg absolute w-full"
          >
            <div className="container-custom py-4 flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium py-2 transition-colors ${
                    location.pathname === item.path
                      ? 'text-purple-600 font-semibold'
                      : 'text-gray-800 hover:text-purple-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/classes" className="btn-primary w-full text-center">
                Book a Class
              </Link>
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-700 py-2 border-t">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors border border-red-200 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 border-t pt-3">
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors border border-gray-300 rounded-lg"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;