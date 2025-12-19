import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import martialBg from '@assets/martial-loop.mp4';
import SEO from '../common/SEO';

const ContactSection = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const formBg = isDarkMode ? 'bg-black/70 text-white' : 'bg-white/90 text-black';
  const placeholderColor = isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-600';
  const iconColor = isDarkMode ? 'text-white hover:text-yellow-400' : 'text-black hover:text-yellow-500';

  return (
    <>
      <SEO
        title="Contact Us - Martial Verse"
        description="Get in touch with the Martial Verse team."
        keywords="contact, martial arts"
        image="/logo.png"
        url={`${window.location.origin}/contact`}
      />

    <section className="relative w-full min-h-screen overflow-hidden font-[Inter] py-10">
  
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src={martialBg}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={`absolute inset-0 z-10 ${isDarkMode ? "bg-black/60" : "bg-black/20"}`} />
      </div>

      {/* Contact Form */}
      <div className="relative z-20 flex items-center justify-center w-full min-h-screen px-4 py-10 md:px-10">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full ${formBg} backdrop-blur-lg`}
        >
          <h2 className="text-3xl font-bold text-center mb-6 font-[Cinzel]">
            Contact the <span className='text-red-400'>Dojo</span>
          </h2>

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={`w-full p-3 rounded-md bg-white/10 ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={`w-full p-3 rounded-md bg-white/10 ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              placeholder="Enter your email"
            />
          </div>

    
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className={`w-full p-3 rounded-md bg-white/10 ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              placeholder="Type your message here..."
            ></textarea>
          </div>

      
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-transform transform hover:scale-105 shadow-lg"
          >
            Send Message
          </button>

         
          <div className="flex justify-center gap-6 mt-6 text-xl">
            <a href="#" className={`${iconColor} transition-colors`}><FaFacebookF /></a>
            <a href="#" className={`${iconColor} transition-colors`}><FaTwitter /></a>
            <a href="#" className={`${iconColor} transition-colors`}><FaInstagram /></a>
            <a href="#" className={`${iconColor} transition-colors`}><FaYoutube /></a>
          </div>
        </motion.form>
      </div>
    </section>
        </>
  );
};

export default ContactSection;
