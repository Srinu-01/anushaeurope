import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-anusha-yellow/10 -rotate-12 translate-x-1/4 translate-y-[-10%]" />
        <div className="absolute left-0 bottom-0 w-1/2 h-full bg-anusha-red/5 rotate-12 translate-x-[-30%] translate-y-[20%]" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      <div className="container mx-auto px-4 pt-16 md:pt-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-anusha-yellow/20 text-anusha-black text-sm font-medium">
              Education Consultancy
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Your Journey to{' '}
              <span className="relative text-anusha-red">
                Germany
                <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-anusha-yellow/50 rounded-full transform -rotate-1" />
              </span>{' '}
              Begins Here
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg text-balance">
              We guide Indian students through every step of pursuing higher education in Germany, from application to accommodation and beyond.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/contact#contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-anusha-red text-white font-medium shadow-sm hover:shadow-md hover:bg-opacity-90 transition-all group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden hover-scale">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#000000] via-[#DE0000] to-[#FFCC00]" />
              <img src='https://www.uni-mannheim.de/media/_processed_/7/c/csm_MA_Schloss_Ehrenhofleer_Staatliche_Schloesser_und_Gaerten_BadenWuerttemberg_dcc1e001f1.jpg'
              

                alt="Students in Germany" 
                className="w-full h-auto object-cover"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold">Study in Germany</h3>
                <p className="text-gray-600">Admissions open for 2024-2025 academic year</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="inline-block px-3 py-1 rounded-full bg-anusha-yellow/20 text-anusha-black text-xs">No IELTS Required</span>
                  <span className="inline-block px-3 py-1 rounded-full bg-anusha-red/10 text-anusha-red text-xs">Low Tuition Cost</span>
                  <span className="inline-block px-3 py-1 rounded-full bg-anusha-darkblue/10 text-anusha-darkblue text-xs">Work While Studying</span>
                </div>
              </div>
            </div>
            
            {/* Floating card elements */}
            <div className="absolute -top-5 -right-10 bg-white p-4 rounded-lg shadow-lg font-display transform rotate-6 hidden md:block">
              <div className="text-2xl font-bold text-anusha-red">18+</div>
              <div className="text-sm text-gray-600">Months Work Visa</div>
            </div>
            
            {/* Removed the bottom-left floating card */}
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
