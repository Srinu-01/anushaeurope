import { ArrowRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5">
            <div className="flex items-center">
              <span className="text-2xl font-display font-bold text-anusha-red">Anusha</span>
              <span className="text-2xl font-display font-bold ml-1 text-white">Europe</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted education partner for study opportunities in Germany. We provide comprehensive guidance from application to accommodation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-anusha-yellow transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-anusha-yellow transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-anusha-yellow transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-anusha-yellow transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Our Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#university-admissions" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  University Admissions
                </Link>
              </li>
              <li>
                <Link to="/services#visa-assistance" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Visa Assistance
                </Link>
              </li>
              <li>
                <Link to="/services#accommodation" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Accommodation
                </Link>
              </li>
              <li>
                <Link to="/services#german-language-training" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  German Language Classes
                </Link>
              </li>
              <li>
                <Link to="/services#part-time-job-assistance" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Job Assistance
                </Link>
              </li>
              <li>
                <Link to="/services#home-to-home-(h2h)-support" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Home-to-Home (H2H) Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <address className="not-italic text-gray-400 space-y-3">
              <p className="flex items-start">
                <span className="mr-2">📍</span>
                1-52/1B, Road No-5, Vakalapudi,<br />
                Kakinada, 533005, India
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                +91 99871 51506
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                +91 99482 73999 
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                +91 96761 38010
              </p>
              <p className="flex items-center">
                <span className="mr-2">✉️</span>
                info@anushaeurope.com
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            &copy; {currentYear} Anusha Europe. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
