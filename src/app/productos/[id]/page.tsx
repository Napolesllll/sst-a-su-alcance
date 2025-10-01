import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package2, Tag } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/productos"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a productos
          </Link>
        </div>

        {/* Producto Principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Imagen del producto */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package2 className="w-24 h-24 text-gray-400" />
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Categoría */}
                <Link
                  href={`/productos?categoria=${product.category.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-4 transition-colors"
                >
                  <Tag className="w-4 h-4" />
                  {product.category.name}
                </Link>

                {/* Título */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Descripción */}
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {product.description || "Sin descripción disponible."}
                </p>

                {/* Precio */}
                <div className="mb-8">
                  <div className="text-sm text-gray-500 mb-1">Precio</div>
                  <div className="text-5xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl">
                  Contactar para Comprar
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold">
                  Agregar a Favoritos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/productos/${relatedProduct.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200">
                    {relatedProduct.imageUrl ? (
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package2 className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xl font-bold text-blue-600">
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
