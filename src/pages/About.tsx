import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Check, Star, Award, Users, Building, Map, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
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
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Your Mentors for Study in Germany
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
                We are not just consultants, we are your mentors who guide you at every step of your journey to Germany.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#000000] via-[#DE0000] to-[#FFCC00]" />
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" 
                  alt="Team of Anusha Europe" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-anusha-yellow/20 text-anusha-black text-sm font-medium">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                How We Started
              </h2>
              <p className="text-gray-600 text-balance">
                Anusha Europe was founded by education experts who studied in Germany themselves and experienced firsthand the challenges that international students face. This personal experience inspired us to create a comprehensive support system for Indian students aspiring to study in Germany.
              </p>
              <p className="text-gray-600 text-balance">
                What sets us apart is our unique Home-to-Home (H2H) support system, where we take responsibility for the student's journey from India to Germany, including flight tickets, airport pickup, accommodation, and more.
              </p>

              {/* Removed years of experience counter section */}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-anusha-red/10 text-anusha-red text-sm font-medium mb-4">
                Our Purpose
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Mission & Vision
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
                We are committed to transforming the international education experience for Indian students.
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-8 german-flag-border"
            >
              <BookOpen className="h-10 w-10 text-anusha-red mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To empower Indian students with accessible, high-quality German education opportunities and comprehensive support services that ensure their successful academic and professional journey.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">Provide transparent and honest guidance</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">Offer personalized mentorship throughout the journey</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">Ensure successful integration into German education system</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-8 german-flag-border"
            >
              <Map className="h-10 w-10 text-anusha-red mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                To be the most trusted education mentor for Indian students aspiring to study in Germany, creating a global network of successful professionals who contribute to both German and Indian societies.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">Build strong German-Indian educational bridges</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">Foster cross-cultural exchange and understanding</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">Create a network of successful Indian professionals in Germany</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-anusha-yellow/20 text-anusha-black text-sm font-medium mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Experts
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
                Our team consists of education experts with firsthand experience in the German education system.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover-scale"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                  alt="Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Rahul Sharma</h3>
                <p className="text-anusha-red font-medium mb-3">Director</p>
                <p className="text-gray-600 text-sm mb-4">
                  MS graduate from TU Munich with extensive experience in international education consulting.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-anusha-red transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 5.47l-8.513 8.98-8.974-8.98h17.487zM1.513 7.238v11.29h20.974v-11.29l-10.487 10.467-10.487-10.467z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-anusha-red transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9.429 8.969h3.714v1.85c.535-1.064 1.907-2.02 3.968-2.02 3.951 0 4.889 2.118 4.889 6.004v7.457h-3.998v-6.479c0-2.293-.593-3.749-2.101-3.749-2.144 0-2.986 1.37-2.986 3.749v6.479h-3.486v-13.291z" />
                      <path d="M5.954 21h-3.999v-13.291h3.999v13.291z" />
                      <path d="M5.906 3.5c1.481 0 2.646 1.21 2.646 2.724 0 1.5-1.183 2.725-2.667 2.725-1.462 0-2.646-1.212-2.646-2.725 0-1.501 1.169-2.724 2.652-2.724h.015z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover-scale"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80" 
                  alt="Academic Counselor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Priya Patel</h3>
                <p className="text-anusha-red font-medium mb-3">Academic Counselor</p>
                <p className="text-gray-600 text-sm mb-4">
                  Former student at Heidelberg University specialized in guiding engineering aspirants.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-anusha-red transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 5.47l-8.513 8.98-8.974-8.98h17.487zM1.513 7.238v11.29h20.974v-11.29l-10.487 10.467-10.487-10.467z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-anusha-red transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9.429 8.969h3.714v1.85c.535-1.064 1.907-2.02 3.968-2.02 3.951 0 4.889 2.118 4.889 6.004v7.457h-3.998v-6.479c0-2.293-.593-3.749-2.101-3.749-2.144 0-2.986 1.37-2.986 3.749v6.479h-3.486v-13.291z" />
                      <path d="M5.954 21h-3.999v-13.291h3.999v13.291z" />
                      <path d="M5.906 3.5c1.481 0 2.646 1.21 2.646 2.724 0 1.5-1.183 2.725-2.667 2.725-1.462 0-2.646-1.212-2.646-2.725 0-1.501 1.169-2.724 2.652-2.724h.015z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover-scale"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" 
                  alt="Visa Specialist" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Arjun Mehta</h3>
                <p className="text-anusha-red font-medium mb-3">Visa Specialist</p>
                <p className="text-gray-600 text-sm mb-4">
                  Expert in German visa regulations with over 8 years of experience in immigration services.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-anusha-red transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 5.47l-8.513 8.98-8.974-8.98h17.487zM1.513 7.238v11.29h20.974v-11.29l-10.487 10.467-10.487-10.467z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-anusha-red transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9.429 8.969h3.714v1.85c.535-1.064 1.907-2.02 3.968-2.02 3.951 0 4.889 2.118 4.889 6.004v7.457h-3.998v-6.479c0-2.293-.593-3.749-2.101-3.749-2.144 0-2.986 1.37-2.986 3.749v6.479h-3.486v-13.291z" />
                      <path d="M5.954 21h-3.999v-13.291h3.999v13.291z" />
                      <path d="M5.906 3.5c1.481 0 2.646 1.21 2.646 2.724 0 1.5-1.183 2.725-2.667 2.725-1.462 0-2.646-1.212-2.646-2.725 0-1.501 1.169-2.724 2.652-2.724h.015z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-anusha-red text-white font-medium shadow-sm hover:shadow-md hover:bg-opacity-90 transition-all group"
            >
              Get in Touch With Our Team
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
