import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'glass-card py-3' : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="relative overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <span className="text-xl md:text-2xl font-display font-bold text-anusha-red">Anusha</span>
                <span className="text-xl md:text-2xl font-display font-bold ml-1 text-anusha-black">Europe</span>
              </motion.div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-medium relative custom-transition',
                  location.pathname === item.path
                    ? 'text-anusha-red'
                    : 'text-gray-700 hover:text-anusha-red',
                  'after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-anusha-red after:origin-left',
                  location.pathname === item.path
                    ? 'after:scale-x-100'
                    : 'after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact#contact"
            className="hidden md:flex items-center px-5 py-2 bg-anusha-red text-white rounded-md shadow-sm hover:shadow-md hover:bg-opacity-90 transition-all"
          >
            <span className="font-medium">Inquire Now</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center text-gray-700"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full glass-card shadow-lg z-40"
          >
            <div className="p-5 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'block py-2 px-4 rounded-md transition-colors',
                    location.pathname === item.path
                      ? 'bg-anusha-yellow/20 text-anusha-black font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact#contact"
                className="block py-2 px-4 mt-3 bg-anusha-red text-white rounded-md text-center font-medium"
              >
                Inquire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
