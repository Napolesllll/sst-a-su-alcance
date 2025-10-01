import prisma from "@/lib/prisma";
import ProductForm from "./ProductForm";
import Image from "next/image";
import Link from "next/link";
import { Edit, AlertCircle } from "lucide-react";
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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Gestión de Productos
          </h2>
          <p className="text-gray-600 mt-1">
            Crea y administra los productos de tu catálogo
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-sm text-gray-600">
          Total: <span className="font-semibold">{products.length}</span>{" "}
          productos
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-800 flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Las imágenes se suben automáticamente a Cloudinary</li>
              <li>• Optimización automática de imágenes</li>
              <li>• Tamaño máximo: 5MB por imagen</li>
              <li>• Formatos: JPG, PNG, WEBP</li>
            </ul>
          </div>

          {categories.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 text-sm">
                    No hay categorías
                  </h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    Necesitas crear al menos una categoría antes de agregar
                    productos.
                  </p>
                  <Link
                    href="/admin/categories"
                    className="text-yellow-800 underline text-sm mt-2 inline-block hover:text-yellow-900"
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Productos Existentes
          </h3>

          {products.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
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
              <h4 className="mt-4 text-lg font-medium text-gray-700">
                No hay productos creados
              </h4>
              <p className="text-gray-500 mt-2">
                Comienza agregando tu primer producto usando el formulario a la
                izquierda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 bg-gray-100">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-400"
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

                  <div className="p-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{product.name}</h4>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {product.description || "Sin descripción"}
                        </p>
                      </div>

                      <div className="flex space-x-2 flex-shrink-0">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full transition-colors"
                          title="Editar producto"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteProductButton productId={product.id} />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-semibold text-lg text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {product.category.name}
                      </span>
                    </div>

                    {!product.imageUrl && (
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-2 text-yellow-700 text-xs flex items-center">
                        <AlertCircle size={14} className="mr-1 flex-shrink-0" />
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
