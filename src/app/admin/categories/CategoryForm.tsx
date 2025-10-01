"use client";

import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrUpdateCategory } from "@/actions/category-actions";
import { X, Upload, ImageIcon } from "lucide-react";

interface CategoryFormProps {
  category?: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
  };
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const [state, formAction, isPending] = useActionState(
    createOrUpdateCategory,
    {
      success: false,
      errors: {},
    }
  );
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(
    category?.imageUrl || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [slugValue, setSlugValue] = useState(category?.slug || "");

  useEffect(() => {
    if (state.success) {
      // Limpiar formulario solo si es creación (no edición)
      if (!category) {
        formRef.current?.reset();
        setImagePreview(null);
        setSelectedFile(null);
        setSlugValue("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      router.refresh();
    }
  }, [state.success, router, category]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
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

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(category?.imageUrl || null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Generar slug automáticamente desde el nombre
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .replace(/[^a-z0-9\s-]/g, "") // Solo letras, números, espacios y guiones
      .replace(/\s+/g, "-") // Espacios a guiones
      .replace(/-+/g, "-"); // Múltiples guiones a uno solo
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!category) {
      // Solo auto-generar en modo creación
      const name = e.target.value;
      setSlugValue(generateSlug(name));
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h3 className="font-medium text-lg text-gray-800 mb-4">
        {category ? "Editar categoría" : "Agregar nueva categoría"}
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
        {category && <input type="hidden" name="id" value={category.id} />}

        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Nombre de la categoría *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={category?.name || ""}
            onChange={handleNameChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isPending}
            placeholder="Ej: Electrónica"
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Slug (URL única) *
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={slugValue}
            onChange={(e) => setSlugValue(e.target.value.toLowerCase())}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            required
            disabled={isPending}
            placeholder="ej: electronica"
          />
          <p className="text-xs text-gray-500 mt-1">
            Solo letras minúsculas, números y guiones. Se usa en la URL.
          </p>
          {state.errors?.slug && (
            <p className="text-red-500 text-sm mt-1">{state.errors.slug}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Imagen de la categoría
          </label>

          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Vista previa"
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
              {category ? "Actualizar Categoría" : "Crear Categoría"}
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
