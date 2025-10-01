import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Package, Grid3x3, ArrowLeft, Home } from "lucide-react";

export default async function ProductosPage() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  // Filtrar categorías que tienen productos
  const categoriesWithProducts = categories.filter(
    (cat) => cat.products.length > 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navegación personalizada flotante */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Inicio</span>
        </Link>
      </div>

      {/* Botón de inicio alternativo (esquina superior derecha) */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          title="Volver al inicio"
        >
          <Home className="w-5 h-5 text-white" />
        </Link>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Nuestros Productos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Descubre nuestra amplia selección de productos de alta calidad
          </p>
        </div>

        {categoriesWithProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Package size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Próximamente
            </h2>
            <p className="text-gray-500">
              Estamos preparando nuestro catálogo de productos
            </p>
          </div>
        ) : (
          <>
            {/* Sección de Categorías */}
            <section className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <Grid3x3 className="w-6 h-6 mr-3 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Explora por Categorías
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {categoriesWithProducts.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.slug}`}
                    className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-32 w-full bg-gradient-to-br from-blue-100 to-blue-200">
                      {category.imageUrl ? (
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="w-12 h-12 text-blue-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold text-sm mb-1 line-clamp-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-white/90">
                        {category.products.length}{" "}
                        {category.products.length === 1
                          ? "producto"
                          : "productos"}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Separador */}
            <div className="border-t border-gray-200 my-12"></div>

            {/* Sección de Productos por Categoría */}
            {categoriesWithProducts.map((category) => (
              <section
                key={category.id}
                id={category.slug}
                className="mb-16 scroll-mt-24"
              >
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    {category.name}
                  </h2>
                  <div className="ml-4 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {category.products.length}{" "}
                    {category.products.length === 1 ? "producto" : "productos"}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <Link href={`/productos/${product.id}`} className="block">
                        <div className="relative h-56 w-full bg-gradient-to-br from-gray-100 to-gray-200">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="p-5">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                            {product.description || "Producto de alta calidad"}
                          </p>

                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-blue-600">
                              ${product.price.toFixed(2)}
                            </span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                              Ver Más
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
