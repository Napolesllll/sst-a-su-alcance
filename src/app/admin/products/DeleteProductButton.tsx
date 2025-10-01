"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/product-actions";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ productId }: { productId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      !confirm(
        "¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteProduct(productId);

      if (result.success) {
        router.refresh();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch {
      alert("Error al eliminar el producto");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Eliminar producto"
    >
      {isDeleting ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-700 border-t-transparent"></div>
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}
