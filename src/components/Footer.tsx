"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Actualizar el año cada minuto (solo por demostración)
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000);
    
    // Efecto de aparición para elementos animados
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>

      
      <footer className="bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contenido principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
            {/* Columna 1: Logo y descripción */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src="/LOGO PARCIAL.png"
                    alt="Logo SST A SU ALCANCE"
                    width={80}
                    height={80}
                    className="object-contain animate-pulse"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-20"></div>
                </div>
                <span className="text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                  SST A SU ALCANCE
                </span>
              </div>
              
              <p className="text-cyan-100 leading-relaxed">
                Expertos en Seguridad y Salud en el Trabajo. Ofrecemos soluciones integrales para proteger a tus colaboradores y cumplir con la normativa vigente.
              </p>
              
              <div className="flex space-x-4">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-2 rounded-lg shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-cyan-300">Llámanos ahora</p>
                  <p className="font-bold text-lg">+1 (123) 456-7890</p>
                </div>
              </div>
            </div>
            
          
            
   
            {/* Columna 4: Newsletter y redes sociales */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-gradient-to-r from-cyan-400 to-blue-400">
                  Suscríbete
                </h3>
                <p className="text-cyan-100 mb-4">
                  Recibe las últimas novedades en seguridad y salud en el trabajo.
                </p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-800"
                  />
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-4 py-2 rounded-r-lg transition-all duration-300 transform hover:scale-105">
                    Enviar
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-gradient-to-r from-cyan-400 to-blue-400">
                  Síguenos
                </h3>
                <div className="flex space-x-4">
                  {[
                    {name: 'Facebook', color: '#3b5998', icon: 'M22.675 0h-21.35C.593 0 0 .592 0 1.325v21.351C0 23.408.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.243l-1.918.001c-1.504 0-1.794.716-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.676V1.325C24 .592 23.406 0 22.675 0z'},
                    {name: 'Twitter', color: '#1da1f2', icon: 'M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.608 1.794-1.574 2.163-2.724-.95.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.164-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.734.2-1.51.232-2.224.084.626 1.956 2.444 3.377 4.6 3.417-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633.962-.695 1.8-1.562 2.46-2.549z'},
                    {name: 'LinkedIn', color: '#0077b5', icon: 'M20.447 20.452H17.2v-5.569c0-1.328-.026-3.038-1.852-3.038-1.853 0-2.136 1.446-2.136 2.941v5.666h-3.248V9h3.123v1.561h.045c.435-.824 1.498-1.693 3.084-1.693 3.296 0 3.903 2.169 3.903 4.987v6.597zM5.337 7.433c-1.044 0-1.889-.846-1.889-1.89 0-1.045.845-1.89 1.889-1.89s1.89.845 1.89 1.89c0 1.044-.846 1.89-1.89 1.89zm1.624 13.019H3.712V9h3.249v11.452zM22.225 0H1.771C.792 0 0 .775 0 1.732v20.535C0 23.222.792 24 1.771 24h20.451C23.204 24 24 23.222 24 22.267V1.732C24 .775 23.204 0 22.225 0z'},
                    {name: 'Instagram', color: '#e1306c', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'}
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={`https://${social.name.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="relative group p-3 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      style={{ backgroundColor: social.color }}
                    >
                      <svg
                        className="w-6 h-6 fill-current text-white"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={social.icon} />
                      </svg>
                      <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-blue-700 my-6"></div>
          
          {/* Bottom footer */}
          <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
            <p className="text-sm md:text-base select-none">
              &copy; {currentYear} SST A SU ALCANCE. Todos los derechos reservados.
            </p>
            
            <div className="flex space-x-6">
              {['Términos', 'Privacidad', 'Cookies', 'FAQ'].map((item, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-cyan-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Botón flotante para volver arriba */}
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Volver arriba"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </footer>
    </>
  );
};