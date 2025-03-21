import { motion } from 'framer-motion';
import { Check, Home, Clock, Award, Plane, Landmark, Building, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const reasonsData = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "Mentors, Not Just Consultants",
    description: "We guide you through the entire journey, not just admission"
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "First-hand Experience",
    description: "Our directors have studied in Germany and know the system"
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "University Contracts",
    description: "We have direct agreements with German universities"
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Inter-cultural Training",
    description: "We prepare you for life in Germany while you're still in India"
  },
  {
    icon: <Building className="h-5 w-5" />,
    title: "Local Support",
    description: "We're based in Kakinada but have global reach"
  },
  {
    icon: <Home className="h-5 w-5" />,
    title: "Home-to-Home Support",
    description: "Complete assistance from India to Germany"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-anusha-red/5 rotate-12 translate-x-[30%] translate-y-[20%]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="relative">
              <img 
                src="https://storage-prtl-co.imgix.net/mp/7ec319f2.jpg?max-w=660&max-h=532&fit=crop&auto=format,compress&q=40" 
                alt="Why Choose Anusha Europe" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              
              <div className="absolute top-4 left-4 md:-top-6 md:-left-6 bg-white p-5 rounded-lg shadow-lg german-flag-border">
                <h3 className="text-lg font-bold mb-2">We Specialize In</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>Shifting Support from India to Germany</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>Accommodation in Germany</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>Assured Part-time Job in Germany</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-0.5" />
                    <span>German Classes in India</span>
                  </li>
                </ul>
              </div>
              
              {/* Removed years of experience floating card */}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 space-y-6"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-anusha-yellow/20 text-anusha-black text-sm font-medium">
              Our Advantage
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose <span className="text-anusha-red">Anusha Europe</span>
            </h2>
            
            <p className="text-lg text-gray-600 text-balance">
              We are not just consultants, we are your mentors who guide you at every step of your journey to Germany. Our unique approach ensures a seamless transition from India to Germany.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {reasonsData.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="rounded-full bg-anusha-red/10 p-2 text-anusha-red mr-3 flex-shrink-0 mt-1">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-4">
              <Link 
                to="/services" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-anusha-black text-white font-medium shadow-sm hover:bg-gray-800 transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
