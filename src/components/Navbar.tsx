"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Efecto para cambiar el navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al hacer clic fuera o al hacer scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
      setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Elementos de navegación con menús desplegables
  const navItems = [
    { name: "Inicio", href: "/", icon: "🏠" },
    { name: "Sobre Nosotros", href: "#sobre-nosotros", icon: "👥" },
    { name: "Servicios", href: "#servicios", icon: "🔧" },
    {
      name: "Productos",
      icon: "📦",
      subItems: [
        { name: "Todos los productos", href: "/productos" },
        // Agregar más subitems si es necesario
      ],
    },
    {
      name: "Intranet",
      icon: "🔒",
      subItems: [
        { name: "Clientes", href: "/intranet/clientes" },
        { name: "Gestores SST", href: "/intranet/gestores" },
      ],
    },
    { name: "Contacto", href: "#contacto", icon: "📞" },
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a] shadow-xl py-2"
          : "bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] py-4"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo con efecto mejorado */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95, rotate: -5 }}
          className="relative"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/LOGO PARCIAL.png"
                alt="Logo SST A SU ALCANCE"
                width={scrolled ? 170 : 190}
                height={scrolled ? 170 : 210}
                className=" shadow-lg border-2 border-cyan-400 transition-all duration-300"
              />
              <motion.div
                className="absolute inset-0  border-2 border-cyan-500"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </div>
          </Link>
        </motion.div>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => item.subItems && setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.subItems ? (
                <div className="relative">
                  {/* Botón para productos/intranet */}
                  <motion.button
                    className="px-4 py-2 text-white font-medium flex items-center gap-1 relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  {/* Menú desplegable */}
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-[#0f172a] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden z-50"
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-3 text-white hover:bg-cyan-900/50 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="px-4 py-2 text-white font-medium relative group"
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Botón Hamburguesa Mejorado */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.8 }}
            className="relative z-50 p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            {isOpen ? (
              <X size={32} color="white" className="stroke-2" />
            ) : (
              <Menu size={32} color="white" className="stroke-2" />
            )}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-cyan-400"
              animate={
                isOpen
                  ? {
                      scale: [1, 1.2, 1],
                      opacity: [0, 1, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Menú Mobile Rediseñado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#0f172a] shadow-2xl overflow-hidden border-t border-cyan-500/30"
          >
            {/* Botón de cierre en la parte superior */}
            <div className="absolute top-4 right-4 z-10">
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 shadow-lg"
              >
                <X size={24} color="white" className="stroke-2" />
              </motion.button>
            </div>

            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="w-full"
                  >
                    {item.subItems ? (
                      <div className="flex flex-col">
                        {/* Botón para productos/intranet en móvil */}
                        <motion.button
                          onClick={() =>
                            setMobileDropdown(
                              mobileDropdown === item.name ? null : item.name
                            )
                          }
                          className="flex items-center justify-between w-full py-4 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 hover:from-cyan-700/40 hover:to-blue-700/40 transition-all"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-xl">{item.name}</span>
                          </div>
                          <ChevronDown
                            size={20}
                            className={`transition-transform ${
                              mobileDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </motion.button>

                        <AnimatePresence>
                          {mobileDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-10 overflow-hidden"
                            >
                              {item.subItems.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-4 py-3 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-blue-800/20 to-cyan-800/20 hover:from-cyan-700/30 hover:to-blue-700/30 transition-all"
                                >
                                  <span className="text-xl">•</span>
                                  <span className="text-lg">
                                    {subItem.name}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 py-4 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 hover:from-cyan-700/40 hover:to-blue-700/40 transition-all group"
                        onClick={() => setIsOpen(false)}
                      >
                        <motion.span
                          className="text-2xl"
                          animate={{
                            rotate: [0, 10, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2,
                          }}
                        >
                          {item.icon}
                        </motion.span>
                        <span className="text-xl group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </span>
                        <motion.div
                          className="ml-auto"
                          animate={{
                            x: [0, 10, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-cyan-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Footer del menú móvil simplificado */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.1 }}
                className="mt-8 pt-6 border-t border-cyan-500/20 flex flex-col items-center"
              >
                <p className="text-cyan-400/80 text-center text-sm">
                  © {new Date().getFullYear()} SST A SU ALCANCE - Todos los
                  derechos reservados
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
