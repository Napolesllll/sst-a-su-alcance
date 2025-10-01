import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package2, Tag, Heart, ShoppingCart } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {/* Breadcrumb mejorado */}
        <div className="mb-8">
          <Link
            href="/productos"
            className="group inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100/50 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
              Volver a productos
            </span>
          </Link>
        </div>

        {/* Producto Principal */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-16 border border-gray-100/50">
          <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12">
            {/* Imagen del producto */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg group">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package2 className="w-28 h-28 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Categoría */}
                <Link
                  href={`/productos?categoria=${product.category.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 hover:bg-blue-200/80 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <Tag className="w-4 h-4" />
                  {product.category.name}
                </Link>

                {/* Título */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 mb-6 leading-tight">
                  {product.name}
                </h1>

                {/* Descripción */}
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {product.description || "Sin descripción disponible."}
                </p>

                {/* Precio */}
                <div className="mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100/50 shadow-sm">
                  <div className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    Precio
                  </div>
                  <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-4">
                <button className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-3">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Productos Relacionados
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent ml-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/productos/${relatedProduct.id}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50"
                >
                  <div className="relative h-52 w-full bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 overflow-hidden">
                    {relatedProduct.imageUrl ? (
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package2 className="w-14 h-14 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
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
