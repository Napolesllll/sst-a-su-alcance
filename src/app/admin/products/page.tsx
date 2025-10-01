import prisma from "@/lib/prisma";
import ProductForm from "./ProductForm";
import Image from "next/image";
import Link from "next/link";
import { Edit, AlertCircle, Package } from "lucide-react";
import { DeleteProductButton } from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="bg-gradient-to-br from-slate-100 via-gray-50 to-cyan-50 rounded-2xl p-8 shadow-2xl border border-cyan-200/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b-2 border-cyan-300/40">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            Gestión de Productos
          </h2>
          <p className="text-gray-700 mt-2 text-lg font-medium">
            Crea y administra los productos de tu catálogo
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-xl shadow-cyan-500/30">
          <span className="text-sm font-semibold">
            Total: {products.length} productos
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white via-cyan-50/50 to-blue-50/50 border-2 border-cyan-300/60 rounded-2xl p-6 mb-6 shadow-lg backdrop-blur-sm">
            <h3 className="font-bold text-cyan-700 flex items-center mb-3 text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Información
            </h3>
            <ul className="text-gray-700 text-sm space-y-2 font-medium">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2 text-lg">•</span>
                <span>Las imágenes se suben automáticamente a Cloudinary</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2 text-lg">•</span>
                <span>Optimización automática de imágenes</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 text-lg">•</span>
                <span>Tamaño máximo: 5MB por imagen</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 text-lg">•</span>
                <span>Formatos: JPG, PNG, WEBP</span>
              </li>
            </ul>
          </div>

          {categories.length === 0 ? (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300/60 rounded-2xl p-6 mb-6 shadow-lg">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-800 text-base mb-2">
                    No hay categorías
                  </h4>
                  <p className="text-amber-700 text-sm font-medium mb-3">
                    Necesitas crear al menos una categoría antes de agregar
                    productos.
                  </p>
                  <Link
                    href="/admin/categories"
                    className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30"
                  >
                    Ir a Categorías →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <ProductForm categories={categories} />
          )}
        </div>

        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent mb-6">
            Productos Existentes
          </h3>

          {products.length === 0 ? (
            <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-dashed border-cyan-400/50 rounded-2xl p-16 text-center shadow-inner backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mx-auto text-cyan-400/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h4 className="mt-6 text-xl font-bold text-gray-700">
                No hay productos creados
              </h4>
              <p className="text-gray-600 mt-3 text-lg">
                Comienza agregando tu primer producto usando el formulario
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gradient-to-br from-white to-gray-50 border-2 border-cyan-300/50 rounded-2xl shadow-xl shadow-cyan-500/10 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 hover:border-cyan-400/70 transition-all duration-300 group"
                >
                  <div className="relative h-44 bg-gradient-to-br from-cyan-100/40 via-blue-100/40 to-cyan-50 overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-20 w-20 text-cyan-400/50 group-hover:text-cyan-500/60 transition-colors duration-300"
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

                  <div className="p-5">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h4 className="font-black text-xl text-gray-800 group-hover:text-cyan-700 transition-colors duration-300">
                          {product.name}
                        </h4>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2 font-medium">
                          {product.description || "Sin descripción"}
                        </p>
                      </div>

                      <div className="flex space-x-2 flex-shrink-0">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 transform hover:-translate-y-0.5"
                          title="Editar producto"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteProductButton productId={product.id} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-black text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-300/50 shadow-sm">
                        {product.category.name}
                      </span>
                    </div>

                    {!product.imageUrl && (
                      <div className="mt-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg p-2.5 text-amber-700 text-xs flex items-center font-semibold shadow-sm">
                        <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                        <span>Este producto no tiene imagen asignada</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
