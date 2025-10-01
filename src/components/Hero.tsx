"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, memo } from "react";

const heroText = "Tu aliado en Salud y Seguridad Laboral";

// Componente memoizado para las burbujas - se genera solo en el cliente
const AnimatedBubbles = memo(() => {
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      size: number;
      color: string;
      top: string;
      left: string;
      duration: number;
      x: number;
      y: number;
    }>
  >([]);

  useEffect(() => {
    const colors = [
      "bg-cyan-600 opacity-[0.15]",
      "bg-yellow-400 opacity-[0.12]",
      "bg-purple-500 opacity-[0.1]",
      "bg-emerald-500 opacity-[0.1]",
    ];

    const generatedBubbles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 100 + 50),
      color: colors[Math.floor(Math.random() * colors.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 10,
      x: Math.random() * 80 - 40,
      y: Math.random() * 60 - 30,
    }));

    setBubbles(generatedBubbles);
  }, []);

  if (bubbles.length === 0) return null;

  return (
    <>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full blur-xl ${bubble.color}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
          }}
          animate={{
            x: [0, bubble.x, 0],
            y: [0, bubble.y, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: bubble.duration,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
});

AnimatedBubbles.displayName = "AnimatedBubbles";

// Componente memoizado para las partículas - se genera solo en el cliente
const AnimatedParticles = memo(() => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      top: string;
      left: string;
      duration: number;
      y: number;
    }>
  >([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 2,
      y: Math.random() * 20 - 10,
    }));

    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-white opacity-10"
          style={{
            top: particle.top,
            left: particle.left,
          }}
          animate={{
            y: [0, particle.y],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </motion.div>
  );
});

AnimatedParticles.displayName = "AnimatedParticles";

// Componente del botón CTA optimizado
const CTAButton = memo(() => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 1.2,
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link href="#contacto" className="relative inline-block">
      <motion.div
        className="absolute inset-0 bg-cyan-400 rounded-full opacity-50 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <span className="relative z-10 bg-gradient-to-r from-cyan-400 to-cyan-300 text-[#0f172a] font-bold px-8 py-4 rounded-full shadow-lg flex items-center gap-3">
        <motion.span
          animate={{
            rotate: [0, 15, 0, -15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          🚀
        </motion.span>
        ¡Contáctanos Ahora!
      </span>
    </Link>
  </motion.div>
));

CTAButton.displayName = "CTAButton";

// Componente de elementos decorativos
const DecorativeElements = memo(() => (
  <>
    <motion.div
      className="absolute left-[10%] top-[30%] hidden md:block"
      animate={{ y: [0, -30, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-400/30 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/30 animate-pulse" />
      </div>
    </motion.div>

    <motion.div
      className="absolute right-[15%] bottom-[25%] hidden md:block"
      animate={{ y: [0, 30, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    >
      <div className="w-10 h-10 rounded-full bg-yellow-400/10 border-2 border-yellow-400/20" />
    </motion.div>

    <motion.div
      className="absolute right-[25%] top-[40%] hidden lg:block"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      <div className="flex gap-3 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-purple-400/40" />
        ))}
      </div>
    </motion.div>
  </>
));

DecorativeElements.displayName = "DecorativeElements";

// Componente principal
export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const words = heroText.split(" ");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-gradient-to-br from-[#0c1220] via-[#1e293b] to-[#0c1220] text-white text-center px-4 overflow-hidden">
      {/* Fondo animado optimizado */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Patrón de cuadrícula - solo desktop */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxOTIyMmEiIG9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48cGF0aCBkPSJNLTItMmg0NHY0NEgtMnoiIHN0cm9rZT0iIzFmMjQzMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIvPjwvZz48L3N2Zz4=')] opacity-30 hidden md:block" />

        {/* Burbujas - reducidas en móvil, se generan solo en cliente */}
        {mounted && (
          <div className="hidden md:block">
            <AnimatedBubbles />
          </div>
        )}

        {/* Luz de acento */}
        <motion.div
          className="absolute top-1/4 left-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-5 blur-[100px]"
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Partículas - reducidas en móvil, se generan solo en cliente */}
        {mounted && (
          <div className="hidden md:block">
            <AnimatedParticles />
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 justify-center items-center space-y-8 md:space-y-12 z-10 px-4 py-20 md:py-24">
        {/* Título con animación por palabras */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight flex flex-wrap justify-center px-2 md:px-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
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
                      damping: 15,
                    },
                  },
                }}
                className={`mx-1 md:mx-1.5 inline-block mb-2 ${
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

        {/* Subtítulo optimizado */}
        <motion.div
          className="max-w-3xl px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-base md:text-lg lg:text-2xl bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent font-medium leading-relaxed">
            En SST A Su Alcance, nos comprometemos a proteger a su equipo con
            soluciones efectivas, prácticas y adaptadas a su empresa.
          </p>
        </motion.div>

        {/* Botón CTA */}
        <CTAButton />

        {/* Elementos decorativos */}
        <DecorativeElements />
      </div>

      {/* Flecha indicadora de scroll */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-14 md:w-10 md:h-16 rounded-full border-2 border-cyan-400/30 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              <svg
                width="12"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-cyan-400"
              >
                <path
                  d="M12 5V19M12 19L19 12M12 19L5 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
          <motion.span
            className="text-xs md:text-sm text-cyan-300/80 mt-2 md:mt-3 font-light"
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
