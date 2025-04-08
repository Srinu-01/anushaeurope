import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryGrid from '@/components/GalleryGrid';

const GalleryPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-anusha-yellow/10 rotate-12 translate-x-[-30%] translate-y-[-20%]" />
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
                Our Gallery
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Visual Journey Through German Education
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
                Explore our collection of images showcasing student experiences, university campuses, and life in Germany.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <GalleryGrid />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GalleryPage;
