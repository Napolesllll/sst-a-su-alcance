"use client";

import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createOrUpdateProduct } from "@/actions/product-actions";
import { X, Upload, ImageIcon } from "lucide-react";

interface ProductFormProps {
  categories: Array<{ id: number; name: string }>;
  product?: {
    id: number;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    categoryId: number;
  };
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(createOrUpdateProduct, {
    success: false,
    errors: {},
  });
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.imageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      // Limpiar formulario solo si es creación (no edición)
      if (!product) {
        formRef.current?.reset();
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      router.refresh();
    }
  }, [state.success, router, product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (max 5MB)
      if (file.size > 115 * 1024 * 1024) {
        alert("La imagen no debe superar 5MB");
        e.target.value = "";
        return;
      }

      // Validar tipo
      if (!file.type.startsWith("image/")) {
        alert("Solo se permiten archivos de imagen");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(product?.imageUrl || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h3 className="font-medium text-lg text-gray-800 mb-4">
        {product ? "Editar producto" : "Agregar nuevo producto"}
      </h3>

      {state.message && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            state.success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {state.message}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        {product && <input type="hidden" name="id" value={product.id} />}

        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Nombre del producto *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={product?.name || ""}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isPending}
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={product?.description || ""}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Precio *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              defaultValue={product?.price || ""}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isPending}
            />
            {state.errors?.price && (
              <p className="text-red-500 text-sm mt-1">{state.errors.price}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Categoría *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={product?.categoryId || ""}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isPending}
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {state.errors?.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.categoryId}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Imagen del producto
          </label>

          {imagePreview ? (
            <div className="relative">
              <Image
                src={imagePreview}
                alt="Vista previa"
                width={500}
                height={192}
                className="w-full h-48 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                disabled={isPending}
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Haz clic para seleccionar una imagen
              </p>
            </div>
          )}

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            ref={fileInputRef}
            onChange={handleImageChange}
            disabled={isPending}
          />

          {state.errors?.image && (
            <p className="text-red-500 text-sm mt-1">{state.errors.image}</p>
          )}

          <p className="text-xs text-gray-500 mt-1">
            Formatos: JPG, PNG, WEBP. Tamaño máximo: 5MB
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Procesando...
            </>
          ) : (
            <>
              <Upload size={20} />
              {product ? "Actualizar Producto" : "Crear Producto"}
            </>
          )}
        </button>

        {state.errors?.general && (
          <p className="text-red-500 text-sm text-center">
            {state.errors.general}
          </p>
        )}
      </form>
    </div>
  );
}
