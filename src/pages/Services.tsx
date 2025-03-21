import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Check, GraduationCap, FileText, Plane, Building, Book, Briefcase, CreditCard, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const serviceData = [
  {
    icon: <GraduationCap className="h-8 w-8 text-anusha-red" />,
    title: "University Admissions",
    description: "We help you identify the right university and program based on your academic background, career goals, and budget. Our team assists with the complete application process.",
    features: [
      "University selection guidance",
      "Application preparation and submission",
      "Direct contracts with German universities",
      "Application fee waiver for partner universities"
    ]
  },
  {
    icon: <FileText className="h-8 w-8 text-anusha-red" />,
    title: "Visa Assistance",
    description: "Our visa experts guide you through the entire German student visa application process, helping you prepare all necessary documents and for the visa interview.",
    features: [
      "Document preparation and verification",
      "Visa application assistance",
      "Mock interview preparation",
      "Blocked account guidance"
    ]
  },
  {
    icon: <Building className="h-8 w-8 text-anusha-red" />,
    title: "Accommodation",
    description: "Finding accommodation in Germany can be challenging. We help you secure suitable housing before you arrive, ensuring a smooth transition.",
    features: [
      "Student dormitory applications",
      "Private accommodation options",
      "Pre-arrival accommodation booking",
      "Guidance on rental contracts and legal aspects"
    ]
  },
  {
    icon: <Book className="h-8 w-8 text-anusha-red" />,
    title: "German Language Training",
    description: "We offer German language courses in India to help you prepare for your studies and life in Germany, even if your program is taught in English.",
    features: [
      "Basic to advanced German courses",
      "TestDaF and DSH exam preparation",
      "Conversational German for daily life",
      "Cultural orientation sessions"
    ]
  },
  {
    icon: <Briefcase className="h-8 w-8 text-anusha-red" />,
    title: "Part-time Job Assistance",
    description: "We help you find part-time employment opportunities in Germany to support your studies and gain valuable work experience.",
    features: [
      "CV and cover letter preparation",
      "Job search strategy training",
      "Interview coaching",
      "Network of employment connections"
    ]
  },
  {
    icon: <Plane className="h-8 w-8 text-anusha-red" />,
    title: "Home-to-Home (H2H) Support",
    description: "Our comprehensive H2H program takes care of every aspect of your transition from India to Germany, providing peace of mind for you and your family.",
    features: [
      "Flight booking assistance",
      "Airport pickup on arrival",
      "SIM card and bank account setup",
      "City registration and orientation"
    ]
  }
];

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
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
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Comprehensive Support for Your
                <span className="text-anusha-red block"> German Education Journey</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
                From university selection to settling in Germany, we provide complete assistance at every step.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceData.map((service, index) => (
              <motion.div
                key={index}
                id={service.title.toLowerCase().replace(/\s+/g, '-')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300"
              >
                <div className="rounded-full bg-anusha-red/10 w-16 h-16 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-anusha-red mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center text-anusha-red font-medium hover:text-anusha-red/90 transition-colors group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-anusha-red/5 transform skew-y-3" />
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
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Journey to Germany
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
                A step-by-step approach to make your German education dream a reality.
              </p>
            </motion.div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 w-0.5 h-full bg-anusha-red/20 transform -translate-x-1/2 md:translate-x-0"></div>
              
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative mb-12 ml-12 md:ml-0"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="absolute left-[-40px] md:left-1/2 w-8 h-8 bg-anusha-red rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 md:-translate-x-4 z-10">
                    1
                  </div>
                  
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation & Profile Assessment</h3>
                    <p className="text-gray-600">
                      We evaluate your academic background, career goals, and budget to develop a personalized education plan for Germany.
                    </p>
                  </div>
                  
                  <div className="hidden md:block w-8 order-2"></div>
                  
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-3">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 md:mb-0">
                      <Users className="h-6 w-6 text-anusha-red mb-2" />
                      <p className="text-sm text-gray-600">
                        Our experts analyze your profile to identify the best opportunities for you in Germany.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative mb-12 ml-12 md:ml-0"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="absolute left-[-40px] md:left-1/2 w-8 h-8 bg-anusha-red rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 md:-translate-x-4 z-10">
                    2
                  </div>
                  
                  <div className="md:w-1/2 md:pr-12 order-2">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 md:mb-0">
                      <GraduationCap className="h-6 w-6 text-anusha-red mb-2" />
                      <p className="text-sm text-gray-600">
                        We help you select universities that match your profile and prepare strong applications.
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-8 order-2"></div>
                  
                  <div className="md:w-1/2 md:pl-12 md:text-left order-1 md:order-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">University Selection & Application</h3>
                    <p className="text-gray-600">
                      We identify suitable universities and programs, and assist with application preparation and submission.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative mb-12 ml-12 md:ml-0"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="absolute left-[-40px] md:left-1/2 w-8 h-8 bg-anusha-red rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 md:-translate-x-4 z-10">
                    3
                  </div>
                  
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Admission & Visa Processing</h3>
                    <p className="text-gray-600">
                      Once you receive admission offers, we guide you through the visa application process and interview preparation.
                    </p>
                  </div>
                  
                  <div className="hidden md:block w-8 order-2"></div>
                  
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-3">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 md:mb-0">
                      <FileText className="h-6 w-6 text-anusha-red mb-2" />
                      <p className="text-sm text-gray-600">
                        Our visa experts ensure your application is complete and your interview preparation is thorough.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative mb-12 ml-12 md:ml-0"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="absolute left-[-40px] md:left-1/2 w-8 h-8 bg-anusha-red rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 md:-translate-x-4 z-10">
                    4
                  </div>
                  
                  <div className="md:w-1/2 md:pr-12 order-2">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 md:mb-0">
                      <Book className="h-6 w-6 text-anusha-red mb-2" />
                      <p className="text-sm text-gray-600">
                        While waiting for your visa, we provide cultural training and German language classes to prepare you for life in Germany.
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-8 order-2"></div>
                  
                  <div className="md:w-1/2 md:pl-12 md:text-left order-1 md:order-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pre-departure Preparation</h3>
                    <p className="text-gray-600">
                      We offer language training, cultural orientation, and accommodation arrangements before you leave India.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative ml-12 md:ml-0"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="absolute left-[-40px] md:left-1/2 w-8 h-8 bg-anusha-red rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 md:-translate-x-4 z-10">
                    5
                  </div>
                  
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Arrival & Settlement in Germany</h3>
                    <p className="text-gray-600">
                      Our H2H support ensures a smooth transition with airport pickup, accommodation setup, and initial orientation in Germany.
                    </p>
                  </div>
                  
                  <div className="hidden md:block w-8 order-2"></div>
                  
                  <div className="md:w-1/2 md:pl-12 order-1 md:order-3">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 md:mb-0">
                      <Plane className="h-6 w-6 text-anusha-red mb-2" />
                      <p className="text-sm text-gray-600">
                        Our representatives in Germany help you settle in and start your academic journey with confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
              Start Your Journey Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
