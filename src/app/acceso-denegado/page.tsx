import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso Denegado</h1>
        <p className="text-gray-600 mb-6">
          No tienes permiso para acceder a esta área. 
          Por favor contacta al administrador si necesitas acceso.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button className="w-full">
              Volver al inicio
            </Button>
          </Link>
          
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Iniciar sesión con otra cuenta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}