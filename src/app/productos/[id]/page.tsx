import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package2, Tag, ShoppingCart } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductoDetallePage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Obtener productos relacionados de la misma categoría
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50/30 to-blue-50/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {/* Breadcrumb mejorado */}
        <div className="mb-8">
          <Link
            href="/productos"
            className="group inline-flex items-center gap-2 bg-white/98 backdrop-blur-md px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-cyan-200/50 hover:border-cyan-300/70 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-600 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-cyan-600 transition-colors">
              Volver a productos
            </span>
          </Link>
        </div>

        {/* Producto Principal */}
        <div className="bg-white/98 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden mb-16 border-2 border-cyan-200/50 hover:border-cyan-300/70 transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12">
            {/* Imagen del producto */}
            <div className="relative aspect-square bg-gradient-to-br from-cyan-100/40 via-blue-100/40 to-slate-100/40 rounded-2xl overflow-hidden shadow-2xl group border-2 border-cyan-200/30">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package2 className="w-32 h-32 text-cyan-300/60 group-hover:scale-110 group-hover:text-cyan-400/70 transition-all duration-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Categoría */}
                <Link
                  href={`/productos?categoria=${product.category.slug}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100/90 to-blue-100/90 backdrop-blur-sm text-cyan-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 hover:from-cyan-200/90 hover:to-blue-200/90 transition-all duration-300 hover:scale-105 shadow-lg border-2 border-cyan-300/40"
                >
                  <Tag className="w-4 h-4" />
                  {product.category.name}
                </Link>

                {/* Título */}
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-cyan-900 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-sm">
                  {product.name}
                </h1>

                {/* Descripción */}
                <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium">
                  {product.description || "Sin descripción disponible."}
                </p>

                {/* Precio */}
                <div className="mb-10 bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100/50 rounded-2xl p-6 border-2 border-cyan-300/60 shadow-xl">
                  <div className="text-sm font-black text-cyan-700 mb-2 uppercase tracking-wider">
                    Precio
                  </div>
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-sm">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-4">
                <button className="group w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300 font-black text-lg shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/50 transform hover:scale-105 flex items-center justify-center gap-3">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Contactar para Comprar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-700 bg-clip-text text-transparent drop-shadow-sm">
                Productos Relacionados
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-cyan-300/50 via-blue-300/50 to-transparent ml-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/productos/${relatedProduct.id}`}
                  className="group bg-white/98 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-2 border-2 border-cyan-200/50 hover:border-cyan-300/70"
                >
                  <div className="relative h-52 w-full bg-gradient-to-br from-cyan-100/40 via-blue-100/40 to-slate-100/40 overflow-hidden">
                    {relatedProduct.imageUrl ? (
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package2 className="w-16 h-16 text-cyan-300/60 group-hover:scale-110 group-hover:text-cyan-400/70 transition-all duration-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-cyan-600 transition-colors duration-300">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
