"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Lista de nombres de archivo de tus clientes (actualiza con tus imágenes)
const clientesImagenes = [
  "AGROSAN.png",
  "ALCALDIA.jpeg",
  "ALPINA.jpg",
  "ANGLO GOLD.jpeg",
  "COLANTA.jpeg",
  "DIAN.png",
  "EPM.png",
  "EXITO.png",
  "METRO.png",
  "PINTUCO.png",
  "POSTOBON.png",
  "PREBEL.png",
  "TIGO UNE.jpeg",
  "VELEZ.jpeg",
  "COINSI.jpg",
  "ARL SURA.png",
];

export const Clientes = () => {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  // Configuración para el desplazamiento suave
  const copies = 3; // Número de copias para un efecto continuo
  const duplicatedClientes = Array(copies).fill(clientesImagenes).flat();
  const speed = 25.7; // Velocidad ajustada para movimiento suave

  useEffect(() => {
    // Medir el contenedor después del renderizado inicial
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);

        const firstItem =
          containerRef.current.querySelector<HTMLElement>(".carousel-item");
        if (firstItem) {
          // Incluir margen en el cálculo del ancho (mx-4 = 16px a cada lado)
          setItemWidth(firstItem.offsetWidth + 32);
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!containerWidth || !itemWidth || itemWidth === 0) return;

    const totalWidth = duplicatedClientes.length * itemWidth;
    // Calcular la distancia necesaria para mostrar todas las copias
    const distance = -(totalWidth - containerWidth);

    const animateCarousel = async () => {
      // Posicionar el carrusel al inicio
      await controls.start({
        x: 0,
        transition: { duration: 0 },
      });

      // Bucle infinito suave
      while (true) {
        await controls.start({
          x: distance,
          transition: {
            duration: Math.abs(distance) / speed,
            ease: "linear",
          },
        });

        // Reiniciar posición sin animación
        await controls.start({
          x: 0,
          transition: { duration: 0 },
        });
      }
    };

    animateCarousel();

    return () => controls.stop();
  }, [containerWidth, itemWidth, controls, duplicatedClientes.length, speed]);

  return (
    <section
      id="clientes"
      className="py-32 bg-gradient-to-br from-cyan-900 to-blue-900 relative overflow-hidden scroll-mt-24"
    >
      {/* Fondo decorativo con partículas */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-500/10"
            style={{
              width: Math.random() * 80 + 20,
              height: Math.random() * 80 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 30 - 15],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Efecto de luz central */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full bg-cyan-500/5 blur-3xl z-0"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Nuestros Clientes
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-cyan-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empresas líderes que confían en nuestros servicios de salud y
            seguridad laboral
          </motion.p>
        </div>

        {/* Carrusel optimizado para desplazamiento suave */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden py-6"
        >
          <motion.div className="flex" animate={controls}>
            {duplicatedClientes.map((imagen, i) => (
              <motion.div
                key={`${imagen}-${i}`}
                className="carousel-item flex-shrink-0 mx-4 w-52 h-32 md:w-64 md:h-40 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-4 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer border border-cyan-500/30 hover:border-cyan-300/50 relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 150, 255, 0.3)",
                  zIndex: 10,
                }}
              >
                {/* Efecto de resplandor sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl" />

                {/* Contenedor de la imagen optimizado */}
                <div className="relative w-full h-full">
                  <Image
                    src={`/clientes/${imagen}`}
                    alt={`Cliente ${i + 1}`}
                    fill
                    className="object-contain p-2"
                    quality={90}
                    priority={i < 8} // Prioriza la carga de las primeras imágenes
                  />
                </div>

                {/* Efecto de reflejo */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent rounded-b-xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Indicador de velocidad */}
        <motion.div
          className="flex flex-col items-center justify-center mt-12 text-cyan-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm">Desplazamiento automático</span>
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
