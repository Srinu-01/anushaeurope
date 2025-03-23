import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitInquiry } from '@/lib/api';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  course: z.string().min(1, 'Please select a course'),
  message: z.string().min(10, 'Message is too short'),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    try {
      inquirySchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // First, verify network connectivity
      if (!navigator.onLine) {
        toast({
          title: "No internet connection",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      const result = await submitInquiry(formData);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Your inquiry has been submitted successfully.",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: '',
          message: ''
        });
        
        setIsSubmitted(true);
      } else {
        // Handle specific error cases
        if (result.code === 'permission-denied') {
          toast({
            title: "Permission Error",
            description: "You don't have permission to submit inquiries.",
            variant: "destructive",
          });
        } else if (result.code === 'unavailable' || result.error?.includes('network')) {
          toast({
            title: "Network Error",
            description: "We're having trouble connecting to our servers. Please try again later.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: `Failed to submit inquiry: ${result.error}`,
            variant: "destructive",
          });
        }
        
        // Log to console for debugging
        console.error("Form submission error:", result);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="contact">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-anusha-yellow/5 rounded-full transform translate-x-[30%] translate-y-[30%]" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-anusha-red/5 transform -skew-y-3" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-anusha-red/10 text-anusha-red text-sm font-medium mb-4">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Start Your German Education Journey Today
              </h2>
              <p className="text-gray-600 mb-8 text-balance">
                Have questions about studying in Germany? Fill out the form and our education experts will guide you through the process.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="rounded-full bg-anusha-yellow/20 p-3 text-anusha-black mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">+91 99871 51506</p>
                    <p className="text-gray-600">+91 99482 73999</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-anusha-yellow/20 p-3 text-anusha-black mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">info@anushaeurope.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full bg-anusha-yellow/20 p-3 text-anusha-black mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600">
                      1-52/1B, Road No-5, Vakalapudi,<br />
                      Kakinada, 533005, India
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Inquire Now</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-anusha-red/30 focus:border-anusha-red outline-none transition-all"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-anusha-red/30 focus:border-anusha-red outline-none transition-all"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-anusha-red/30 focus:border-anusha-red outline-none transition-all"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                    Interested Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-anusha-red/30 focus:border-anusha-red outline-none transition-all"
                  >
                    <option value="" disabled>Select a course</option>
                    <option value="MS in Computer Science">MS in Computer Science</option>
                    <option value="MS in Mechanical Engineering">MS in Mechanical Engineering</option>
                    <option value="MS in Electrical Engineering">MS in Electrical Engineering</option>
                    <option value="MBA">MBA</option>
                    <option value="MS in Data Science">MS in Data Science</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your education goals..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-anusha-red/30 focus:border-anusha-red outline-none transition-all"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-all ${
                    isSubmitted
                      ? 'bg-green-600 text-white'
                      : 'bg-anusha-red hover:bg-opacity-90 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : isSubmitted ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Inquiry Sent
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
