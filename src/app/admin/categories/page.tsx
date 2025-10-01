import prisma from "@/lib/prisma";
import CategoryForm from "./CategoryForm";
import Image from "next/image";
import Link from "next/link";
import { Edit, Package } from "lucide-react";
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
    <div className="bg-gradient-to-br from-slate-100 via-gray-50 to-cyan-50 rounded-2xl p-8 shadow-2xl border border-cyan-200/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b-2 border-cyan-300/40">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            Gestión de Categorías
          </h2>
          <p className="text-gray-700 mt-2 text-lg font-medium">
            Organiza tus productos en categorías
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-xl shadow-cyan-500/30">
          <span className="text-sm font-semibold">
            Total: {categories.length} categorías
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
                <span>El slug se genera automáticamente del nombre</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2 text-lg">•</span>
                <span>Las imágenes son opcionales</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 text-lg">•</span>
                <span>Optimización automática con Cloudinary</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 text-lg">•</span>
                <span>Tamaño máximo: 5MB por imagen</span>
              </li>
            </ul>
          </div>

          <CategoryForm />
        </div>

        {/* Lista de categorías */}
        <div className="lg:col-span-2">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent mb-6">
            Categorías Existentes
          </h3>

          {categories.length === 0 ? (
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <h4 className="mt-6 text-xl font-bold text-gray-700">
                No hay categorías creadas
              </h4>
              <p className="text-gray-600 mt-3 text-lg">
                Comienza agregando tu primera categoría usando el formulario
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gradient-to-br from-white to-gray-50 border-2 border-cyan-300/50 rounded-2xl shadow-xl shadow-cyan-500/10 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 hover:border-cyan-400/70 transition-all duration-300 group"
                >
                  <div className="relative h-44 bg-gradient-to-br from-cyan-100/40 via-blue-100/40 to-cyan-50 overflow-hidden">
                    {category.imageUrl ? (
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
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
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
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
                          {category.name}
                        </h4>
                        <p className="text-cyan-600 text-sm font-mono mt-1 bg-cyan-50 inline-block px-2 py-1 rounded border border-cyan-200/50">
                          /{category.slug}
                        </p>
                      </div>

                      <div className="flex space-x-2 flex-shrink-0">
                        <Link
                          href={`/admin/categories/edit/${category.id}`}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 transform hover:-translate-y-0.5"
                          title="Editar categoría"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteCategoryButton
                          categoryId={category.id}
                          hasProducts={category._count.products > 0}
                          productCount={category._count.products}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
                        <Package size={18} className="text-cyan-400" />
                        <span>
                          {category._count.products}{" "}
                          {category._count.products === 1
                            ? "producto"
                            : "productos"}
                        </span>
                      </div>

                      {!category.imageUrl && (
                        <span className="text-xs font-bold text-amber-300 bg-gradient-to-r from-amber-500/20 to-amber-600/20 px-3 py-1.5 rounded-full border border-amber-500/30 shadow-sm">
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
