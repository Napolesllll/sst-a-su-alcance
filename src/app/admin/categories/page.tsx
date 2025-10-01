import prisma from "@/lib/prisma";
import CategoryForm from "./CategoryForm";
import Image from "next/image";
import Link from "next/link";
import { Edit, AlertCircle, Package } from "lucide-react";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Gestión de Categorías
          </h2>
          <p className="text-gray-600 mt-1">
            Organiza tus productos en categorías
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-sm text-gray-600">
          Total: <span className="font-semibold">{categories.length}</span>{" "}
          categorías
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
              <li>• El slug se genera automáticamente del nombre</li>
              <li>• Las imágenes son opcionales</li>
              <li>• Optimización automática con Cloudinary</li>
              <li>• Tamaño máximo: 5MB por imagen</li>
            </ul>
          </div>

          <CategoryForm />
        </div>

        {/* Lista de categorías */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Categorías Existentes
          </h3>

          {categories.length === 0 ? (
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <h4 className="mt-4 text-lg font-medium text-gray-700">
                No hay categorías creadas
              </h4>
              <p className="text-gray-500 mt-2">
                Comienza agregando tu primera categoría usando el formulario
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                    {category.imageUrl ? (
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900">
                          {category.name}
                        </h4>
                        <p className="text-gray-500 text-sm font-mono mt-1">
                          /{category.slug}
                        </p>
                      </div>

                      <div className="flex space-x-2 flex-shrink-0">
                        <Link
                          href={`/admin/categories/edit/${category.id}`}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full transition-colors"
                          title="Editar categoría"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteCategoryButton
                          categoryId={category.id}
                          hasProducts={category._count.products > 0}
                          productCount={category._count.products}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package size={16} />
                        <span>
                          {category._count.products}{" "}
                          {category._count.products === 1
                            ? "producto"
                            : "productos"}
                        </span>
                      </div>

                      {!category.imageUrl && (
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                          Sin imagen
                        </span>
                      )}
                    </div>
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
