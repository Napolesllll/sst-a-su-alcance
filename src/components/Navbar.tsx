"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Optimización: Throttle para scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optimización: Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // Optimización: Memoizar el cierre del menú
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setMobileDropdown(null);
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      if (isOpen) closeMenu();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, closeMenu]);

  // Elementos de navegación
  const navItems = [
    { name: "Inicio", href: "/", icon: "🏠" },
    { name: "Sobre Nosotros", href: "#sobre-nosotros", icon: "👥" },
    { name: "Servicios", href: "#servicios", icon: "🔧" },
    {
      name: "Productos",
      icon: "📦",
      subItems: [{ name: "Todos los productos", href: "/productos" }],
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

  const toggleMobileDropdown = useCallback((itemName: string) => {
    setMobileDropdown((prev) => (prev === itemName ? null : itemName));
  }, []);

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
        {/* Logo optimizado */}
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
                className="shadow-lg border-2 border-cyan-400 transition-all duration-300"
                priority
              />
              <motion.div
                className="absolute inset-0 border-2 border-cyan-500"
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

        {/* Botón Hamburguesa optimizado para móvil */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="relative z-50 p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 touch-manipulation"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? (
              <X size={28} color="white" className="stroke-2" />
            ) : (
              <Menu size={28} color="white" className="stroke-2" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Menú Mobile Optimizado */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar al tocar fuera */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={closeMenu}
            />

            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-[85vw] max-w-sm bg-[#0f172a] shadow-2xl overflow-y-auto md:hidden z-50"
            >
              {/* Header del menú móvil */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-700 p-4 flex justify-between items-center shadow-lg z-10">
                <h2 className="text-white font-bold text-lg">Menú</h2>
                <motion.button
                  onClick={closeMenu}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/20 touch-manipulation"
                  aria-label="Cerrar menú"
                >
                  <X size={24} color="white" className="stroke-2" />
                </motion.button>
              </div>

              {/* Items del menú */}
              <div className="p-4 pb-20">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      {item.subItems ? (
                        <div>
                          <motion.button
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="flex items-center justify-between w-full py-3 px-4 text-white font-medium rounded-lg bg-gradient-to-r from-blue-900/40 to-cyan-900/40 active:from-cyan-700/50 active:to-blue-700/50 transition-all touch-manipulation"
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{item.icon}</span>
                              <span className="text-base">{item.name}</span>
                            </div>
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-200 ${
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
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-8 pt-2 space-y-1">
                                  {item.subItems.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subItem.href}
                                      onClick={closeMenu}
                                      className="flex items-center gap-3 py-2.5 px-4 text-white text-sm font-medium rounded-lg bg-gradient-to-r from-blue-800/30 to-cyan-800/30 active:from-cyan-700/40 active:to-blue-700/40 transition-all touch-manipulation"
                                    >
                                      <span>•</span>
                                      <span>{subItem.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center justify-between py-3 px-4 text-white font-medium rounded-lg bg-gradient-to-r from-blue-900/40 to-cyan-900/40 active:from-cyan-700/50 active:to-blue-700/50 transition-all touch-manipulation"
                          onClick={closeMenu}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-base">{item.name}</span>
                          </div>
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
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Footer del menú móvil */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-cyan-500/20"
                >
                  <p className="text-cyan-400/80 text-center text-xs leading-relaxed">
                    © {new Date().getFullYear()} SST A SU ALCANCE
                    <br />
                    Todos los derechos reservados
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
