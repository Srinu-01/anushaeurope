import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      const element = document.getElementById('contact');
      if (element) {
        // Add a small delay to ensure smooth scrolling after page load
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-anusha-yellow/10 -rotate-12 translate-x-1/4 translate-y-[-10%]" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-anusha-red/10 text-anusha-red text-sm font-medium">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                We'd Love to Hear From You
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
                Have questions about studying in Germany? Our team is here to help you at every step.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-anusha-red/10 w-14 h-14 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-anusha-red" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 mb-3">We're available Monday to Saturday</p>
              <div className="space-y-1">
                <a href="tel:+919987151506" className="block text-anusha-red hover:underline">+91 99871 51506</a>
                <a href="tel:+919948273999" className="block text-anusha-red hover:underline">+91 99482 73999</a>
                <a href="tel:+919676138010" className="block text-anusha-red hover:underline">+91 96761 38010</a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-anusha-red/10 w-14 h-14 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-anusha-red" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-3">We usually respond within 24 hours</p>
              <div className="space-y-1">
                <a href="mailto:info@anushaeurope.com" className="block text-anusha-red hover:underline">info@anushaeurope.com</a>
                <a href="mailto:admissions@anushaeurope.com" className="block text-anusha-red hover:underline">admissions@anushaeurope.com</a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-anusha-red/10 w-14 h-14 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-anusha-red" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Office Address</h3>
              <p className="text-gray-600 mb-3">Visit us at our office in Kakinada</p>
              <address className="not-italic text-gray-700">
                1-52/1B, Road No-5, Vakalapudi,<br />
                Kakinada, 533005,<br />
                Andhra Pradesh, India
              </address>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-anusha-red/10 w-14 h-14 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-anusha-red" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Working Hours</h3>
              <p className="text-gray-600 mb-3">We're available at these times</p>
              <div className="space-y-1 text-gray-700">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Connect With Us</h3>
              <p className="text-gray-600">Follow us on social media for updates and student success stories</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <Facebook className="h-8 w-8 text-[#1877F2] mb-2" />
                <span className="text-gray-700 font-medium">Facebook</span>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>Visit Page</span>
                </div>
              </a>
              
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <Instagram className="h-8 w-8 text-[#E4405F] mb-2" />
                <span className="text-gray-700 font-medium">Instagram</span>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>Visit Profile</span>
                </div>
              </a>
              
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <Linkedin className="h-8 w-8 text-[#0A66C2] mb-2" />
                <span className="text-gray-700 font-medium">LinkedIn</span>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>Connect</span>
                </div>
              </a>
              
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <Youtube className="h-8 w-8 text-[#FF0000] mb-2" />
                <span className="text-gray-700 font-medium">YouTube</span>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>Watch Videos</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h3>
                <p className="text-gray-600 mb-6">
                  Visit our office in Kakinada, or schedule a virtual consultation from anywhere.
                </p>
              </div>
              <div className="h-96 w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60979.88219242653!2d82.19752357431645!3d16.93482940000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a6273f66e2bb%3A0x72ae2468e313c414!2sKakinada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1680689244938!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anusha Europe Office Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <ContactForm />
      
      <Footer />
    </div>
  );
};

export default Contact;
