import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Package, Grid3x3, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950">
      {/* Navegación personalizada flotante */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 bg-slate-800/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400/50 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" />
          <span className="text-sm font-bold text-cyan-100 group-hover:text-cyan-200 transition-colors">
            Inicio
          </span>
        </Link>
      </div>

      {/* Botón de inicio alternativo (esquina superior derecha) */}

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 px-5 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg shadow-cyan-500/20 border border-cyan-500/30">
              <Package className="w-4 h-4" />
              Catálogo
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 drop-shadow-2xl">
            Nuestros Productos
          </h1>
          <p className="text-cyan-100/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
            Descubre nuestra amplia selección de productos de alta calidad
          </p>
        </div>

        {categoriesWithProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl shadow-cyan-500/10 border border-cyan-500/20">
              <Package size={80} className="text-cyan-500/40 mb-6 mx-auto" />
              <h2 className="text-3xl font-bold text-cyan-200 mb-3">
                Próximamente
              </h2>
              <p className="text-cyan-100/70 text-lg">
                Estamos preparando nuestro catálogo de productos
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Sección de Categorías */}
            <section className="mb-20">
              <div className="flex items-center justify-center mb-10">
                <div className="flex items-center gap-3 bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl shadow-cyan-500/20 border border-cyan-500/30">
                  <Grid3x3 className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Explora por Categorías
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
                {categoriesWithProducts.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.slug}`}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl shadow-cyan-500/10 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 transform hover:-translate-y-2 border border-cyan-500/30 hover:border-cyan-400/50"
                  >
                    <div className="relative h-36 w-full bg-gradient-to-br from-slate-700 via-cyan-900/40 to-slate-800">
                      {category.imageUrl ? (
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="w-14 h-14 text-cyan-400/70 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent group-hover:from-cyan-900/80 transition-all duration-300"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform group-hover:translate-y-[-2px] transition-transform duration-300">
                      <h3 className="font-black text-base mb-1.5 line-clamp-1 drop-shadow-lg text-cyan-100 group-hover:text-cyan-200">
                        {category.name}
                      </h3>
                      <p className="text-xs text-cyan-300/90 font-bold drop-shadow">
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
            <div className="relative my-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyan-500/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 px-6 text-cyan-400">
                  <Package className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Sección de Productos por Categoría */}
            {categoriesWithProducts.map((category) => (
              <section
                key={category.id}
                id={category.slug}
                className="mb-20 scroll-mt-24"
              >
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                    {category.name}
                  </h2>
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-cyan-500/20 border border-cyan-500/30">
                    {category.products.length}{" "}
                    {category.products.length === 1 ? "producto" : "productos"}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl shadow-cyan-500/10 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 transform hover:-translate-y-2 border border-cyan-500/30 hover:border-cyan-400/50"
                    >
                      <Link href={`/productos/${product.id}`} className="block">
                        <div className="relative h-64 w-full bg-gradient-to-br from-slate-700 via-cyan-900/40 to-slate-800 overflow-hidden">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-20 w-20 text-cyan-500/40 group-hover:scale-110 transition-transform duration-300"
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
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-black mb-3 text-cyan-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-cyan-100/70 text-sm mb-5 line-clamp-2 min-h-[40px] leading-relaxed">
                            {product.description || "Producto de alta calidad"}
                          </p>

                          <div className="flex justify-between items-center pt-4 border-t border-cyan-500/20">
                            <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                              ${product.price.toFixed(2)}
                            </span>
                            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-bold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 transform hover:scale-105">
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
