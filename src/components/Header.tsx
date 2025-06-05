import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Play, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    
    setIsAdmin(data?.role === 'admin');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

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
        <Link to="/" className="flex items-center space-x-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-12 w-12"
          >
            <img 
              src="/images/Purple & Green Playful Children's Logo.png" 
              alt="Sensory & ME Logo" 
              className="h-full w-full object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-bold text-xl md:text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-secondary-700' : 'text-secondary-800'
            }`}
          >
            <span className="text-primary-600">Sensory</span>
            <span className="text-secondary-600">&nbsp;&&nbsp;</span>
            <span className="text-accent-600">ME</span>
          </motion.div>
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
          {user ? (
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="font-medium text-gray-800 hover:text-secondary-600"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="font-medium text-gray-800 hover:text-secondary-600"
              >
                Sign Out
              </button>
              <Link to="/classes" className="btn-primary">
                Book a Class
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="font-medium text-gray-800 hover:text-secondary-600">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
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
                      ? 'text-secondary-600 font-semibold' 
                      : 'text-gray-800 hover:text-secondary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Link 
                      to="/admin"
                      className="font-medium py-2 text-gray-800 hover:text-secondary-600"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="font-medium py-2 text-gray-800 hover:text-secondary-600 text-left"
                  >
                    Sign Out
                  </button>
                  <Link to="/classes" className="btn-primary w-full text-center">
                    Book a Class
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="font-medium py-2 text-gray-800 hover:text-secondary-600">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-primary w-full text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;