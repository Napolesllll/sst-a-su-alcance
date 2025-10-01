"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/actions/category-actions";
import { useRouter } from "next/navigation";

interface DeleteCategoryButtonProps {
  categoryId: number;
  hasProducts: boolean;
  productCount: number;
}

export function DeleteCategoryButton({
  categoryId,
  hasProducts,
  productCount,
}: DeleteCategoryButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (hasProducts) {
      alert(
        `No se puede eliminar esta categoría porque tiene ${productCount} producto(s) asociado(s). Elimina o reasigna los productos primero.`
      );
      return;
    }

    if (
      !confirm(
        "¿Seguro que deseas eliminar esta categoría? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteCategory(categoryId);

      if (result.success) {
        router.refresh();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch {
      alert("Error al eliminar la categoría");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting || hasProducts}
      className={`p-2 rounded-full transition-colors ${
        hasProducts
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-red-100 hover:bg-red-200 text-red-700"
      } disabled:opacity-50`}
      title={
        hasProducts
          ? "No se puede eliminar (tiene productos)"
          : "Eliminar categoría"
      }
    >
      {isDeleting ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-700 border-t-transparent"></div>
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}
