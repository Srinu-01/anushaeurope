import { motion } from 'framer-motion';

const Locations = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-anusha-yellow/5 rounded-full transform translate-x-[-50%] translate-y-[-30%]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-anusha-yellow/20 text-anusha-black text-sm font-medium mb-4">
              Destinations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Study in Beautiful German Cities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
              Experience the perfect blend of historical charm and modern innovation in Germany's top student cities.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-2xl overflow-hidden h-80 shadow-lg hover-scale"
          >
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWihwtdHlo0AsJaht6g53HMv-Oe4mkmwU8rQ&s" 
              alt="Mannheim, Germany" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Mannheim</h3>
              <p className="text-gray-200 max-w-md mb-4">
                A vibrant university city with excellent industrial connections
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur-sm">
                  Top Universities
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur-sm">
                  Industrial Hub
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-2xl overflow-hidden h-80 shadow-lg hover-scale"
          >
            <img 
              src="https://cdn.britannica.com/49/179449-138-9F4EC401/Overview-Berlin.jpg?w=800&h=450&c=crop" 
              alt="Berlin, Germany" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Berlin</h3>
              <p className="text-gray-200 max-w-md mb-4">
                The capital city with rich history and thriving startup scene
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur-sm">
                  Cultural Center
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur-sm">
                  Tech Hub
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative rounded-2xl overflow-hidden h-80 shadow-lg hover-scale"
          >
            <img 
              src="https://images.unsplash.com/photo-1585211969224-3e992986159d?auto=format&fit=crop&q=80" 
              alt="Munich, Germany" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Munich</h3>
              <p className="text-gray-200 max-w-md mb-4">
                Bavaria's capital combining tradition with innovation
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur-sm">
                  Research Excellence
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur-sm">
                  Business Center
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-white rounded-2xl shadow-sm p-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Campus Environments</h3>
            <p className="text-gray-600 mb-8">
              Experience modern facilities and conducive learning spaces at top German universities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yWcVdzZqhY_K8KkWt-PCCR21MOlH2a4caA&s" 
                alt="University Library" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold text-gray-900">State-of-the-art Libraries</h4>
                <p className="text-sm text-gray-600">Access to vast research resources</p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80" 
                alt="University Classroom" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold text-gray-900">Modern Classrooms</h4>
                <p className="text-sm text-gray-600">Equipped with latest teaching technology</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
