import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Package, Folder, Image as TrendingUp } from "lucide-react";

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
      color: "bg-blue-500",
      link: "/admin/products",
    },
    {
      title: "Categorías",
      value: categoriesCount,
      icon: Folder,
      color: "bg-green-500",
      link: "/admin/categories",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Bienvenido al Panel de Administración
        </h2>
        <p className="text-gray-600">
          Gestiona tu catálogo de productos desde aquí
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.link}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`${stat.color} p-4 rounded-xl group-hover:scale-110 transition-transform`}
                >
                  <Icon className="text-white" size={32} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={24} className="text-blue-600" />
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products"
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <Package className="text-blue-600 mb-2" size={24} />
            <h4 className="font-semibold text-gray-800">Agregar Producto</h4>
            <p className="text-sm text-gray-600 mt-1">Crea un nuevo producto</p>
          </Link>

          <Link
            href="/admin/categories"
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
          >
            <Folder className="text-green-600 mb-2" size={24} />
            <h4 className="font-semibold text-gray-800">Agregar Categoría</h4>
            <p className="text-sm text-gray-600 mt-1">Organiza tus productos</p>
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      {recentProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Productos Recientes
            </h3>
            <Link
              href="/admin/products"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Ver todos →
            </Link>
          </div>

          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden relative">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={20} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {product.category.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
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
