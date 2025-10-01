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
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Inicio</span>
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          title="Volver al inicio"
        >
          <Home className="w-5 h-5 text-white" />
        </Link>
      </div>

      {children}
    </>
  );
}
