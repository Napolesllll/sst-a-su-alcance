"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Credenciales inválidas. Por favor intenta nuevamente.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 relative overflow-hidden pt-20">
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

      <motion.div
        className="bg-white/98 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border-2 border-cyan-200/50 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <motion.div
              className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-2 border-cyan-300/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/LOGO PARCIAL.png"
                alt="Logo"
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>
          </div>

          <motion.h1
            className="text-4xl font-black bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-700 bg-clip-text text-transparent mb-2 drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Panel de Administración
          </motion.h1>
          <motion.p
            className="text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Ingresa tus credenciales para continuar
          </motion.p>
        </div>

        {error && (
          <motion.div
            className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300/60 text-red-700 px-4 py-3 rounded-xl mb-6 font-semibold shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 font-bold"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium shadow-sm"
              placeholder="admin@ejemplo.com"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-bold"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium shadow-sm"
              placeholder="••••••••"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-black text-lg hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verificando...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </motion.button>
        </form>

        {/* Decoración inferior */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <p className="text-center text-sm text-gray-500 font-medium">
            Sistema seguro y protegido 🔒
          </p>
        </div>
      </motion.div>
    </div>
  );
}
