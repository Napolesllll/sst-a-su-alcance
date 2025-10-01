import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Package, Folder, Zap, ArrowRight } from "lucide-react";

export default async function AdminPage() {
  // Obtener estadísticas
  const [productsCount, categoriesCount, recentProducts] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
  ]);

  const stats = [
    {
      title: "Productos",
      value: productsCount,
      icon: Package,
      gradient: "from-blue-500 to-blue-600",
      lightBg: "from-blue-50 to-blue-100",
      link: "/admin/products",
    },
    {
      title: "Categorías",
      value: categoriesCount,
      icon: Folder,
      gradient: "from-green-500 to-green-600",
      lightBg: "from-green-50 to-green-100",
      link: "/admin/categories",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100/50">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 mb-3">
          Bienvenido al Panel de Administración
        </h2>
        <p className="text-gray-600 text-lg">
          Gestiona tu catálogo de productos desde aquí
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.link}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100/50 hover:scale-105 transform"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-5xl font-extrabold text-gray-800 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`bg-gradient-to-br ${stat.gradient} p-5 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  <Icon className="text-white" size={36} />
                </div>
              </div>
              <div
                className={`mt-6 h-2 rounded-full bg-gradient-to-r ${stat.lightBg} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100/50">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-xl">
            <Zap size={24} className="text-blue-600" />
          </div>
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/products"
            className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 border-2 border-blue-200/50 hover:border-blue-300 hover:shadow-lg transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                <Package className="text-white" size={24} />
              </div>
              <ArrowRight
                className="text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
                size={20}
              />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">
              Agregar Producto
            </h4>
            <p className="text-sm text-gray-600">
              Crea un nuevo producto en tu catálogo
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="group p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl hover:from-green-100 hover:to-green-200/50 transition-all duration-300 border-2 border-green-200/50 hover:border-green-300 hover:shadow-lg transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                <Folder className="text-white" size={24} />
              </div>
              <ArrowRight
                className="text-green-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300"
                size={20}
              />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">
              Agregar Categoría
            </h4>
            <p className="text-sm text-gray-600">
              Organiza tus productos por categorías
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      {recentProducts.length > 0 && (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-900">
              Productos Recientes
            </h3>
            <Link
              href="/admin/products"
              className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:from-blue-50 hover:to-transparent transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-md"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 overflow-hidden relative shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={24} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    {product.category.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
