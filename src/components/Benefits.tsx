
import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, Languages, Euro, Briefcase, Award, Globe, Clock, Users, Shield } from 'lucide-react';

const benefitsData = [
  {
    id: 1,
    icon: <GraduationCap className="h-6 w-6 text-anusha-red" />,
    title: "Top-quality courses",
    description: "Access world-class education with recognized degrees"
  },
  {
    id: 2,
    icon: <Euro className="h-6 w-6 text-anusha-red" />,
    title: "Less tuition cost",
    description: "Affordable education with many free public universities"
  },
  {
    id: 3,
    icon: <Award className="h-6 w-6 text-anusha-red" />,
    title: "Scholarships",
    description: "Various scholarship opportunities for international students"
  },
  {
    id: 4,
    icon: <Languages className="h-6 w-6 text-anusha-red" />,
    title: "English mode of teaching",
    description: "Many programs offered in English for international students"
  },
  {
    id: 5,
    icon: <Users className="h-6 w-6 text-anusha-red" />,
    title: "Diversity",
    description: "Experience a multicultural environment with students worldwide"
  },
  {
    id: 6,
    icon: <Shield className="h-6 w-6 text-anusha-red" />,
    title: "Safety",
    description: "One of the safest countries for international students"
  },
  {
    id: 7,
    icon: <Globe className="h-6 w-6 text-anusha-red" />,
    title: "Travel",
    description: "Easy access to travel throughout Europe during studies"
  },
  {
    id: 8,
    icon: <Briefcase className="h-6 w-6 text-anusha-red" />,
    title: "18 months Work Visa",
    description: "Extended job-seeking period after graduation"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.5
    }
  })
};

const Benefits = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-anusha-yellow/5 rounded-full transform translate-x-1/2 translate-y-[-30%]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-anusha-red/5 rounded-full transform translate-x-[-50%] translate-y-[30%]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-anusha-red/10 text-anusha-red text-sm font-medium mb-4">
              Why Germany?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Studying in Germany
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
              Germany offers numerous advantages for international students seeking quality education and promising career opportunities.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 hover:border-anusha-red/20 border border-transparent transition-all hover:-translate-y-1 hover-scale"
            >
              <div className="flex flex-col h-full">
                <div className="rounded-full bg-anusha-red/10 w-12 h-12 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{benefit.description}</p>
                <div className="flex items-center text-sm text-anusha-red font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Verified benefit</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block glass-card p-6 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-anusha-yellow text-black font-bold text-lg">
                1
              </div>
              <p className="text-gray-800 font-medium">World-class education with "Return of Investment"</p>
              
              <div className="hidden md:block h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-anusha-yellow text-black font-bold text-lg">
                2
              </div>
              <p className="text-gray-800 font-medium">No IELTS or GRE required</p>
              
              <div className="hidden md:block h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-anusha-yellow text-black font-bold text-lg">
                3
              </div>
              <p className="text-gray-800 font-medium">English-taught master's programs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
