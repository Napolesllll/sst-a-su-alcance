'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export const Contacto = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight - 100);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="contacto"
      className="relative py-20 bg-gradient-to-br from-cyan-900 via-blue-800 to-indigo-900 text-white overflow-hidden"
      style={{ scrollMarginTop: "6rem" }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-soft-light opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-indigo-500 rounded-full mix-blend-soft-light opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-cyan-400 rounded-full mix-blend-soft-light opacity-40 animate-ping"></div>
      </div>
      
      {/* Botón flotante de WhatsApp */}
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: 0.5
          }}
        >
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 group"
          >
            <FaWhatsapp className="text-3xl" />
            <span className="absolute -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              ¡Chatea con nosotros!
            </span>
          </a>
        </motion.div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Contáctanos
          </motion.h2>
          <motion.div
            className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <motion.p
            className="mt-6 text-xl max-w-2xl mx-auto text-blue-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Estamos aquí para ayudarte. Envíanos un mensaje o contáctanos a través de nuestras redes sociales.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          {/* Formulario de contacto */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.form
              className="space-y-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white border-opacity-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("¡Formulario enviado! Te contactaremos pronto."); 
              }}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  required
                  className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-blue-200 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 transition border border-white border-opacity-10"
                />
                <input
                  type="email"
                  placeholder="Correo"
                  required
                  className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-blue-200 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 transition border border-white border-opacity-10"
                />
                <textarea
                  placeholder="Mensaje"
                  rows={5}
                  required
                  className="w-full p-4 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-blue-200 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 transition resize-none border border-white border-opacity-10"
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Enviar Mensaje</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Información de contacto y redes sociales */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-indigo-900 to-blue-800 rounded-2xl p-8 h-full shadow-xl border border-indigo-400 border-opacity-30">
              <h3 className="text-2xl font-bold mb-6 text-cyan-200 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Información de Contacto
              </h3>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start">
                  <FaPhone className="text-cyan-400 mt-1 mr-3" />
                  <div>
                    <p className="text-blue-100">Teléfono</p>
                    <p className="text-white font-medium">+1 (234) 567-890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaEnvelope className="text-cyan-400 mt-1 mr-3" />
                  <div>
                    <p className="text-blue-100">Correo Electrónico</p>
                    <p className="text-white font-medium">contacto@empresa.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-cyan-400 mt-1 mr-3" />
                  <div>
                    <p className="text-blue-100">Dirección</p>
                    <p className="text-white font-medium">Av. Principal 123, Ciudad, País</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-200">Síguenos en Redes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { icon: <FaInstagram />, color: "from-pink-500 to-purple-600", name: "Instagram" },
                    { icon: <FaFacebook />, color: "from-blue-500 to-blue-700", name: "Facebook" },
                    { icon: <FaTwitter />, color: "from-sky-400 to-sky-600", name: "Twitter" },
                    { icon: <FaLinkedin />, color: "from-blue-600 to-blue-800", name: "LinkedIn" },
                    { icon: <FaWhatsapp />, color: "from-green-500 to-green-600", name: "WhatsApp" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className={`flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br ${social.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
                      whileHover={{ y: -5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="text-2xl mb-2">{social.icon}</div>
                      <span className="text-xs opacity-80 group-hover:opacity-100 transition-opacity">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="mt-8 pt-6 border-t border-blue-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <h3 className="text-xl font-bold mb-4 text-cyan-200">Horario de Atención</h3>
                <p className="text-blue-100">Lunes a Viernes: 7:00 AM - 5:00 PM</p>
                <p className="text-blue-100">Sábados: 7:00 AM - 10:00 AM</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Ola decorativa al final */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          className="w-full"
          preserveAspectRatio="none"
        >
          <path 
            fill="#0e7490" 
            fillOpacity="0.2" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};