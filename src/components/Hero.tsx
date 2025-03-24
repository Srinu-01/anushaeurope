import { motion } from 'framer-motion';
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video end event to reset play state
  useEffect(() => {
    const videoElement = videoRef.current;
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    if (videoElement) {
      videoElement.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent this from triggering the play/pause
    
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-anusha-yellow/10 -rotate-12 translate-x-1/4 translate-y-[-10%]" />
        <div className="absolute left-0 bottom-0 w-1/2 h-full bg-anusha-red/5 rotate-12 translate-x-[-30%] translate-y-[20%]" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      <div className="container mx-auto px-4 pt-16 md:pt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
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
            {/* Video Showcase Section */}
            <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#000000] via-[#DE0000] to-[#FFCC00]" />
              
              {/* HdWM University Video */}
              <div 
                className="relative aspect-video w-full overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="https://res.cloudinary.com/dmunsmu40/video/upload/v1742836194/xuuaqfpbp7hbuomgygoo.mp4"
                  poster="https://www.uni-mannheim.de/media/_processed_/7/c/csm_MA_Schloss_Ehrenhofleer_Staatliche_Schloesser_und_Gaerten_BadenWuerttemberg_dcc1e001f1.jpg"
                  muted
                  playsInline
                  preload="metadata"
                  onClick={togglePlay}
                />
                
                {/* Video Controls Overlay - Show on hover or when paused */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isPlaying && !isHovering ? 'opacity-0' : 'opacity-100 bg-black/30'
                  } flex items-center justify-center`}
                  onClick={togglePlay}
                >
                  <motion.button 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full bg-anusha-red text-white flex items-center justify-center transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" fill="white" />
                    )}
                  </motion.button>
                </div>
                
                {/* Video Badge and Controls */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                  isPlaying && !isHovering ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-anusha-red text-white text-xs font-medium mb-2">
                        Featured Insights
                      </span>
                      <h3 className="text-white text-sm md:text-base font-medium">
                        Prof. Dr. Dolores Sanchez Bengoa on Student Life in Germany
                      </h3>
                    </div>
                    <button 
                      onClick={toggleMute} 
                      className="bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Video Description */}
              <div className="p-5 space-y-3">
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-anusha-yellow/20 text-anusha-black text-xs">HdWM University</span>
                  <span className="inline-block px-3 py-1 rounded-full bg-anusha-red/10 text-anusha-red text-xs">Exclusive Interview</span>
                  <span className="inline-block px-3 py-1 rounded-full bg-anusha-darkblue/10 text-anusha-darkblue text-xs">Study in Germany</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Vice-president of HdWM, Prof. Dr. Dolores Sanchez Bengoa shares insights about German university education, student lifestyle, and the opportunities that await international students.
                </p>
              </div>
            </div>
            
            {/* Floating card elements */}
            <div className="absolute -top-5 -right-10 bg-white p-4 rounded-lg shadow-lg font-display transform rotate-6 hidden md:block">
              <div className="text-2xl font-bold text-anusha-red">18+</div>
              <div className="text-sm text-gray-600">Months Work Visa</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
