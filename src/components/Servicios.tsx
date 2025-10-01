'use client';
import { motion, AnimatePresence } from "framer-motion";
import Tilt from 'react-parallax-tilt';
import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaArrowLeft,
  FaChevronRight,
  FaTimes,
  FaChalkboardTeacher,
  FaUserTie,
  FaFirstAid,
  FaExclamationTriangle,
  FaRoad,
  FaCogs,
  FaClipboardCheck
} from 'react-icons/fa';

// Definimos el tipo para un servicio
// Ajustamos el icon para que acepte nodos React

type Service = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  subservices: {
    title: string;
    items: string[];
    details: string;
  }[];
};

const services: Service[] = [
  {
    id: 1,
    icon: <FaChalkboardTeacher />,
    title: "Capacitación e investigaciones",
    description: "Implementación de sistemas SST, documentación legal y auditorías para cumplimiento normativo.",
    subservices: [
      {
        title: "Asesoria y/o capacitación puntual",
        items: [
          "Registro en entidades de seguridad social integral: ARL, salud, pensión, cajas de compensación familiar",
          "Reglamento interno de trabajo – RIT",
          "Vinculación laboral: procesos de selección, documentos exigidos, contrato laboral.",
          "Terminación del contrato laboral",
          "Sistema general de riesgos laborales.",
          "Almacenamiento de líquidos inflamables.",
          "Capacitación para trabajo seguro en alturas.",
          "Inspecciones de seguridad.",
          "Investigación de accidentes e incidentes laborales.",
          "Estadísticas de accidentalidad (Presentación de informes gerenciales)."
        ],
        details: "Diseñamos e implementamos sistemas de gestión en seguridad y salud en el trabajo adaptados a tu organización. Nuestros expertos garantizan el cumplimiento normativo y la mejora continua de tus procesos."
      },
      {
        title: "CAPACITACIONES EN SST, COPASST, COCOLAB",
        items: ["Elaboración de COPASST", "Reglamentos de Higiene y Seguridad", "Planes de Emergencia"],
        details: "Preparamos toda la documentación requerida por la legislación colombiana, asegurando que tu empresa cumpla con los requisitos legales en materia de seguridad y salud en el trabajo."
      },
      {
        title: "Auditorías y diagnósticos",
        items: ["Diagnóstico Inicial SST", "Auditorías Legales", "Inspecciones Programadas"],
        details: "Realizamos evaluaciones exhaustivas de tus procesos de seguridad, identificando oportunidades de mejora y asegurando el cumplimiento normativo."
      }
    ]
  },
  {
    id: 2,
    icon: <FaUserTie />,
    title: "Administración de Personal",
    description: "Cursos certificados y programas continuos en seguridad laboral con modalidades flexibles.",
    subservices: [
      {
        title: "Trabajo en alturas",
        items: ["Curso básico (40 horas)", "Curso avanzado (80 horas)", "Coordinador de trabajo en alturas"],
        details: "Capacitación certificada para trabajos en alturas según Resolución 1409 de 2012. Entrenamiento teórico-práctico con simulaciones reales."
      },
      {
        title: "Espacios confinados",
        items: ["Identificación de Riesgos", "Procedimientos Seguros", "Rescate en Espacios Confinados"],
        details: "Formación especializada para trabajos en espacios confinados, cumpliendo con los estándares de seguridad requeridos."
      },
      {
        title: "Primeros auxilios",
        items: ["Básicos", "Avanzados", "Reanimación Cardiopulmonar (RCP)"],
        details: "Capacitación en atención inicial de emergencias, manejo de heridas, quemaduras, fracturas y soporte vital básico."
      }
    ]
  },
  {
    id: 3,
    icon: <FaFirstAid />,
    title: "Entrenamiento de Brigadas",
    description: "Vigilancia epidemiológica, control de riesgos y gestión de incidentes para bienestar laboral.",
    subservices: [
      {
        title: "Vigilancia epidemiológica",
        items: ["Exámenes médicos ocupacionales: ingreso, periódicos, retiro", "Programas de salud mental"],
        details: "Programas de vigilancia médica adaptados a los riesgos específicos de cada puesto de trabajo, con seguimiento y control continuo."
      },
      {
        title: "Programas de salud mental",
        items: ["Estrés Laboral", "Acoso Laboral", "Bienestar Emocional"],
        details: "Intervenciones para promover la salud mental en el entorno laboral y prevenir enfermedades derivadas del trabajo."
      },
      {
        title: "Ergonomía laboral",
        items: ["Evaluaciones Puesto de Trabajo", "Diseño de Estaciones", "Prevención de Lesiones"],
        details: "Soluciones ergonómicas para mejorar las condiciones de trabajo y prevenir trastornos musculoesqueléticos."
      }
    ]
  },
  {
    id: 4,
    icon: <FaExclamationTriangle />,
    title: "Plan de Emergencias",
    description: "Prevención de riesgos, equipos de protección y manejo de sustancias peligrosas.",
    subservices: [
      {
        title: "Análisis de trabajo seguro (ATS)",
        items: ["Procedimientos Seguros", "Permisos de Trabajo", "Evaluación de Riesgos"],
        details: "Desarrollo de procedimientos seguros para operaciones críticas, minimizando riesgos en trabajos de alto peligro."
      },
      {
        title: "Dotación de elementos de protección personal (EPP)",
        items: ["Selección", "Uso Adecuado", "Mantenimiento"],
        details: "Asesoría en selección, uso y mantenimiento de equipos de protección personal según los riesgos de cada puesto."
      },
      {
        title: "Protección contra incendios",
        items: ["Diseño de Sistemas", "Mantenimiento de Extintores", "Simulacros"],
        details: "Soluciones técnicas para la prevención y control de incendios, incluyendo sistemas fijos y equipos portátiles."
      }
    ]
  },
  {
    id: 5,
    icon: <FaRoad />,
    title: "Seguridad Vial",
    description: "Software SST, aplicaciones móviles y soluciones digitales para seguridad laboral.",
    subservices: [
      {
        title: "Software SST",
        items: ["Gestión documental (Soporte ISO 45001)", "Reporte de incidentes", "Dashboards de indicadores"],
        details: "Sistema integral para la gestión de seguridad y salud en el trabajo, con módulos para todos los procesos SST."
      },
      {
        title: "App móvil para inspecciones",
        items: ["Listas de Chequeo", "Reportes en Tiempo Real", "Seguimiento de Hallazgos"],
        details: "Aplicación móvil para realizar inspecciones de seguridad, reportar condiciones inseguras y dar seguimiento."
      },
      {
        title: "Plataforma de capacitación virtual",
        items: ["Cursos E-learning", "Seguimiento de Asistencia", "Certificación"],
        details: "Plataforma virtual para la capacitación del personal en temas de seguridad y salud en el trabajo."
      }
    ]
  },
  {
    id: 6,
    icon: <FaCogs />,
    title: "Sistema de Gestión SST",
    description: "Plantillas, guías legales y contenido educativo para gestión preventiva.",
    subservices: [
      {
        title: "Plantillas de informes",
        items: ["Inspecciones", "Investigación de Accidentes", "Planes de Acción"],
        details: "Plantillas editables listas para usar en tus procesos de gestión SST."
      },
      {
        title: "Checklist de inspección",
        items: ["Áreas de Trabajo", "Equipos", "Procedimientos"],
        details: "Listas de verificación para realizar inspecciones de seguridad de manera eficiente."
      },
      {
        title: "Guías legales",
        items: ["Resolución 0312 de 2019", "Decreto 1072 de 2015", "Ley 1562 de 2012"],
        details: "Guías actualizadas sobre normativa colombiana en seguridad y salud en el trabajo."
      }
    ]
  },
  {
    id: 7,
    icon: <FaClipboardCheck />,
    title: "Tareas Críticas",
    description: "Gestión de actividades de alto riesgo con protocolos y seguimiento especializado.",
    subservices: [
      {
        title: "Identificación de tareas críticas",
        items: ["Evaluación de Riesgos", "Matriz de Tareas Críticas", "Protocolos Específicos"],
        details: "Determinamos y clasificamos las tareas de mayor riesgo, estableciendo procedimientos seguros."
      },
      {
        title: "Monitoreo y seguimiento",
        items: ["Supervisión Continua", "Reportes Diarios", "Acciones Correctivas"],
        details: "Implementamos sistemas de control y monitoreo para garantizar el cumplimiento de los protocolos."
      },
      {
        title: "Capacitación especializada",
        items: ["Talleres Prácticos", "Simulacros", "Evaluaciones de Desempeño"],
        details: "Formación específica en procedimientos críticos para minimizar la probabilidad de incidentes."
      }
    ]
  }
];

export const Servicios = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSubservice, setSelectedSubservice] = useState<{
    title: string;
    items: string[];
    details: string;
  } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    subservice: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleBackToServices = () => {
    setSelectedSubservice(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    
    // Simular envío exitoso
    setFormSubmitted(true);
    
    // Limpiar formulario después de enviar
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        subservice: '',
        message: ''
      });
      setFormSubmitted(false);
      setShowFormModal(false);
    }, 3000);
  };

  const handleRequestInfo = () => {
    // Pre-llenar los campos de servicio y subservicio
    if (selectedService && selectedSubservice) {
      setFormData({
        ...formData,
        service: selectedService.title,
        subservice: selectedSubservice.title
      });
    }
    setShowFormModal(true);
  };

  // Efecto para prevenir el scroll cuando los modales están abiertos
  useEffect(() => {
    if (selectedService || showFormModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedService, showFormModal]);

  return (
    <section
      id="servicios"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-gray-900 bg-gradient-to-br from-slate-50 to-cyan-50 scroll-mt-24 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-60 h-60 bg-cyan-200 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply opacity-15 animate-ping animate-duration-[4000ms]"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply opacity-10 animate-pulse"></div>
      </div>
      
      {/* Ola decorativa */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="#0891b2" 
            fillOpacity="0.05" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Título principal */}
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nuestros Servicios
        </motion.h2>
        <motion.div
          className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.p
          className="mt-6 max-w-2xl mx-auto text-lg text-cyan-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Soluciones integrales en seguridad y salud en el trabajo para proteger a tu equipo y optimizar tus procesos
        </motion.p>
      </div>

      {/* Grid de servicios */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Tilt
            key={service.id}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#ffffff"
            glarePosition="all"
            glareBorderRadius="12px"
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            scale={1.05}
            transitionSpeed={800}
            className="relative"
            onMouseEnter={() => setHoveredCard(service.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              className={`bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 shadow-xl border border-white border-opacity-50 h-full flex flex-col items-center text-center backdrop-blur-sm overflow-hidden ${hoveredCard === service.id ? 'ring-2 ring-cyan-500/30' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: service.id * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Efecto de destello al hacer hover */}
              {hoveredCard === service.id && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-3xl mb-6 shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                
                {/* Botón "Ver más" */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedService(service);
                    setSelectedSubservice(null);
                  }}
                  className="group inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">Ver detalles</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaChevronRight className="ml-2 text-xs relative z-10 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      {/* Modal para mostrar subcategorías */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={() => {
              setSelectedService(null);
              setSelectedSubservice(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white border-opacity-50 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 relative">
                {/* Botón de cerrar */}
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setSelectedSubservice(null);
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                  &times;
                </button>
                
                {/* Encabezado del modal */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-2xl mr-4 shadow">
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {selectedService.title}
                    </h3>
                    <p className="text-gray-600 mt-1 max-w-lg">
                      {selectedService.description}
                    </p>
                  </div>
                </div>
                
                {/* Vista de lista de subservicios */}
                {!selectedSubservice && (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-xl font-semibold text-cyan-700 mb-4 pb-2 border-b border-cyan-100">
                      Subservicios disponibles:
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedService.subservices.map((subservice, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
                          onClick={() => setSelectedSubservice(subservice)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <h5 className="text-lg font-bold text-gray-800 mb-3">
                            {subservice.title}
                          </h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {subservice.items.map((item, i) => (
                              <span 
                                key={i} 
                                className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm mb-4">
                            {subservice.details.substring(0, 120)}...
                          </p>
                          <div className="flex items-center text-cyan-600 text-sm font-medium">
                            Ver detalles
                            <FaChevronRight className="ml-1 text-xs transition-transform group-hover:translate-x-1" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Vista detallada de un subservicio */}
                {selectedSubservice && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <button
                      onClick={handleBackToServices}
                      className="flex items-center text-cyan-600 hover:text-cyan-800 font-medium mb-6"
                    >
                      <FaArrowLeft className="mr-2" />
                      Volver a subservicios
                    </button>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                        {selectedSubservice.title}
                      </h4>
                      
                      <div className="mb-8">
                        <h5 className="font-semibold text-cyan-700 mb-3 flex items-center">
                          <FaCheckCircle className="mr-2 text-cyan-600" />
                          Servicios incluidos:
                        </h5>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedSubservice.items.map((item, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * i }}
                            >
                              <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-gray-700">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-8">
                        <h5 className="font-semibold text-cyan-700 mb-3 flex items-center">
                          <FaCheckCircle className="mr-2 text-cyan-600" />
                          Detalles del servicio:
                        </h5>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedSubservice.details}
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-100">
                        <h5 className="font-semibold text-cyan-700 mb-3">
                          Nuestro proceso de trabajo:
                        </h5>
                        <ol className="space-y-4">
                          {[
                            "Diagnóstico inicial de necesidades",
                            "Propuesta personalizada",
                            "Implementación con seguimiento continuo",
                            "Entrega de resultados y documentación"
                          ].map((step, i) => (
                            <motion.li 
                              key={i}
                              className="flex items-start"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i }}
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-cyan-600 flex items-center justify-center mr-3 border border-cyan-200 shadow-sm">
                                <span className="font-bold">{i + 1}</span>
                              </div>
                              <span className="text-gray-700 pt-1">{step}</span>
                            </motion.li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-6 text-white">
                      <h5 className="font-bold text-xl mb-3">¿Interesado en este servicio?</h5>
                      <p className="mb-4 opacity-90">Contáctanos para una consulta gratuita y personalizada.</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white text-cyan-700 font-bold rounded-full shadow-lg"
                        onClick={handleRequestInfo}
                      >
                        Solicitar información
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal del formulario de contacto */}
      <AnimatePresence>
        {showFormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white border-opacity-50 backdrop-blur-sm"
            >
              <div className="p-6 md:p-8 relative">
                {/* Botón de cerrar */}
                <button
                  onClick={() => setShowFormModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                  <FaTimes className="text-xl" />
                </button>
                
                {/* Encabezado del formulario */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Solicita información
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Completa el formulario y un asesor se pondrá en contacto contigo a la brevedad
                  </p>
                </div>
                
                {/* Formulario */}
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                        placeholder="Tu nombre"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                        placeholder="+57 300 0000000"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Servicio de interés</label>
                      <input
                        type="text"
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                        placeholder="Selecciona un servicio"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subservice" className="block text-sm font-medium text-gray-700 mb-1">Subservicio</label>
                      <input
                        type="text"
                        id="subservice"
                        name="subservice"
                        value={formData.subservice}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                        placeholder="Selecciona un subservicio"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                      placeholder="¿En qué podemos ayudarte?"
                    ></textarea>
                  </div>
                  
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-5 text-center"
                    >
                      <div className="flex items-center justify-center text-green-600 mb-3">
                        <FaCheckCircle className="text-2xl mr-2" />
                        <span className="font-semibold">¡Solicitud enviada con éxito!</span>
                      </div>
                      <p className="text-green-700">Nos pondremos en contacto contigo en breve.</p>
                    </motion.div>
                  ) : (
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Enviar solicitud
                      </motion.button>
                    </div>
                  )}
                </form>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Al enviar este formulario, aceptas nuestra <a href="#" className="text-cyan-600 hover:underline">Política de Privacidad</a> y <a href="#" className="text-cyan-600 hover:underline">Términos de Uso</a>.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};