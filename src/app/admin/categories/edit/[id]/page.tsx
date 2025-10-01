import prisma from "@/lib/prisma";
import CategoryForm from "../../CategoryForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    notFound();
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <Link
          href="/admin/categories"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver a categorías
        </Link>

        <h1 className="text-2xl font-bold text-gray-800">Editar Categoría</h1>
        <p className="text-gray-600 mt-1">
          Modifica la información de la categoría
        </p>

        {category._count.products > 0 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <Package size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              Esta categoría tiene{" "}
              <span className="font-semibold">{category._count.products}</span>{" "}
              {category._count.products === 1
                ? "producto asociado"
                : "productos asociados"}
            </div>
          </div>
        )}
      </div>

      <CategoryForm
        category={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          imageUrl: category.imageUrl,
        }}
      />
    </div>
  );
}
