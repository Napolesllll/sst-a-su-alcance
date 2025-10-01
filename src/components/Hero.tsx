'use client';
import { motion } from "framer-motion";
import Link from "next/link";

const heroText = "Tu aliado en Salud y Seguridad Laboral";

export const Hero = () => {
  const words = heroText.split(" ");
  
  return (
    <section
      className="relative w-full min-h-screen flex flex-col bg-gradient-to-br from-[#0c1220] via-[#1e293b] to-[#0c1220] text-white text-center px-4 overflow-hidden"
    >
      {/* Fondo animado mejorado */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Patrón de cuadrícula sutil */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxOTIyMmEiIG9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48cGF0aCBkPSJNLTItMmg0NHY0NEgtMnoiIHN0cm9rZT0iIzFmMjQzMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
        
        {/* Burbujas mejoradas */}
        {[...Array(12)].map((_, i) => {
          const size = Math.floor(Math.random() * 100 + 50);
          const colors = [
            "bg-cyan-600 opacity-[0.15]",
            "bg-yellow-400 opacity-[0.12]",
            "bg-purple-500 opacity-[0.1]",
            "bg-emerald-500 opacity-[0.1]",
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-xl ${color}`}
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 80 - 40, 0],
                y: [0, Math.random() * 60 - 30, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 20 + 10,
                ease: "easeInOut",
              }}
            />
          );
        })}
        
        {/* Luz de acento mejorada */}
        <motion.div 
          className="absolute top-1/4 left-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-5 blur-[100px]"
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Efecto de partículas */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 20 - 10],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 justify-center items-center space-y-12 z-10 px-4 py-24">
        {/* Título corregido con animación por palabras */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight flex flex-wrap justify-center px-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40, rotate: -5 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotate: 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 200,
                      damping: 15
                    } 
                  }
                }}
                className={`mx-1.5 inline-block mb-2 ${
                  word === "Salud" || word === "Seguridad" 
                    ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]" 
                    : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Subtítulo con efecto de revelación mejorado */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.p
            className="text-lg md:text-2xl bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent font-medium"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 1.0, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            En SST A Su Alcance, nos comprometemos a proteger a su equipo con soluciones efectivas, prácticas y adaptadas a su empresa.
          </motion.p>
        </motion.div>

        {/* Botón con efectos mejorados */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20, 
            delay: 1.2 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="#contacto"
            className="relative inline-block"
          >
            <motion.div
              className="absolute inset-0 bg-cyan-400 rounded-full opacity-50 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            <motion.span
              className="relative z-10 bg-gradient-to-r from-cyan-400 to-cyan-300 text-[#0f172a] font-bold px-8 py-4 rounded-full shadow-lg flex items-center gap-3"
              animate={{
                boxShadow: [
                  "0 5px 15px rgba(56, 189, 248, 0.3)",
                  "0 10px 30px rgba(56, 189, 248, 0.5)",
                  "0 5px 15px rgba(56, 189, 248, 0.3)"
                ],
                background: [
                  "linear-gradient(to right, #22d3ee, #0ea5e9)",
                  "linear-gradient(to right, #0ea5e9, #22d3ee)",
                  "linear-gradient(to right, #22d3ee, #0ea5e9)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 15, 0, -15, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🚀
              </motion.span>
              ¡Contáctanos Ahora!
            </motion.span>
          </Link>
        </motion.div>

        {/* Elementos decorativos flotantes mejorados */}
        <motion.div 
          className="absolute left-[10%] top-[30%]"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-400/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/30 animate-pulse" />
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute right-[15%] bottom-[25%]"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="w-10 h-10 rounded-full bg-yellow-400/10 border-2 border-yellow-400/20" />
        </motion.div>
        
        <motion.div 
          className="absolute right-[25%] top-[40%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="flex gap-3 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-full bg-purple-400/40"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Flecha indicadora de scroll mejorada */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-16 rounded-full border-2 border-cyan-400/30 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              <svg width="12" height="16" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
                <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
          <motion.span 
            className="text-sm text-cyan-300/80 mt-3 font-light"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Desplázate para descubrir
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
};