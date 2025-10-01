"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const SobreNosotros = () => {
  const [activeTab, setActiveTab] = useState("mision");
  
  return (
    <section 
      id="sobre-nosotros" 
      className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Encabezado con animación */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Sobre Nosotros
          </h2>
          <div className="w-32 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen decorativa */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden border-4 border-cyan-500/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-600/10 backdrop-blur-sm z-10"></div>
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center text-gray-500">
                  Imagen de equipo
                </div>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <motion.div
              animate={{ 
                rotate: [0, 5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-400/30 z-20"
            ></motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-400/30 z-20"
            ></motion.div>
          </motion.div>

          {/* Texto y pestañas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Transformando la Seguridad y Salud en el Trabajo
            </h3>
            
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              En <span className="text-cyan-400 font-semibold">SST A SU ALCANCE</span>, llevamos más de una década comprometidos con la excelencia en Seguridad y Salud en el Trabajo. Nuestro equipo multidisciplinario de expertos combina conocimiento técnico, experiencia práctica y pasión por crear entornos laborales más seguros y saludables.
            </p>
            
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              Creemos que la prevención es la clave para un futuro laboral sostenible. Nuestro enfoque integrado abarca desde la evaluación de riesgos hasta la implementación de soluciones innovadoras, adaptadas a las necesidades específicas de cada organización.
            </p>
            
            {/* Pestañas de Misión y Visión */}
            <div className="bg-[#1e293b]/70 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden shadow-2xl">
              {/* Encabezado de pestañas */}
              <div className="flex border-b border-cyan-500/30">
                <button
                  onClick={() => setActiveTab("mision")}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                    activeTab === "mision"
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-gray-400 hover:text-cyan-300"
                  }`}
                >
                  Misión
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                    activeTab === "vision"
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-gray-400 hover:text-cyan-300"
                  }`}
                >
                  Visión
                </button>
              </div>
              
              {/* Contenido de pestañas */}
              <div className="p-6">
                {activeTab === "mision" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start mb-4">
                      <div className="text-cyan-400 mr-3 text-2xl">🎯</div>
                      <h4 className="text-xl font-bold text-white">Nuestra Misión</h4>
                    </div>
                    <p className="text-gray-300 pl-9">
                      Proporcionar soluciones integrales de Seguridad y Salud en el Trabajo que protejan a los trabajadores, optimicen los procesos empresariales y cumplan con la normativa vigente. Nos comprometemos a desarrollar estrategias preventivas personalizadas que generen valor sostenible para nuestros clientes y contribuyan al bienestar de sus equipos.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start mb-4">
                      <div className="text-cyan-400 mr-3 text-2xl">🔭</div>
                      <h4 className="text-xl font-bold text-white">Nuestra Visión</h4>
                    </div>
                    <p className="text-gray-300 pl-9">
                      Ser reconocidos como el referente nacional en transformación cultural de seguridad laboral para 2030. Aspiramos a crear un ecosistema donde la prevención sea el núcleo de todas las operaciones empresariales, reduciendo los accidentes laborales en un 70% y estableciendo nuevos estándares de excelencia en salud ocupacional.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Valores */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-cyan-400 mr-2">✨</span> Nuestros Valores Fundamentales
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Excelencia", desc: "Calidad en cada solución" },
                  { title: "Integridad", desc: "Transparencia y ética" },
                  { title: "Innovación", desc: "Soluciones de vanguardia" },
                  { title: "Compromiso", desc: "Con nuestros clientes" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-[#1e293b]/50 p-4 rounded-lg border border-cyan-500/20"
                  >
                    <h5 className="font-bold text-cyan-400">{item.title}</h5>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { value: "5+", label: "Años de experiencia" },
            { value: "150+", label: "Clientes satisfechos" },
            { value: "98%", label: "Reducción de accidentes" },
            { value: "120+", label: "Proyectos completados" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-6 rounded-2xl border border-cyan-500/20 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SobreNosotros;