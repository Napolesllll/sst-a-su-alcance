import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Navegación personalizada flotante para la página de productos */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors duration-300 group-hover:-translate-x-1" />
          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
            Inicio
          </span>
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-50">
        <Link
          href="/"
          className="group inline-flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-12 h-12 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
          title="Volver al inicio"
        >
          <Home className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </Link>
      </div>

      {children}
    </>
  );
}
