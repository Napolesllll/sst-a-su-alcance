"use client";
import prisma from "@/lib/prisma";
import UploadForm from "./UploadForm";
import { Trash2, Copy, Check } from "lucide-react";
import { deleteMedia } from "@/actions/media-actions";
import Image from "next/image";

export default async function MediaManagerPage() {
  const mediaItems = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Imágenes
          </h1>
          <p className="text-gray-600 mt-1">
            Biblioteca de imágenes en Cloudinary
          </p>
        </div>
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">{mediaItems.length}</span>{" "}
          imágenes
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
            <ul className="text-blue-700 text-sm list-disc pl-5 space-y-1">
              <li>Almacenamiento en Cloudinary</li>
              <li>Optimización automática</li>
              <li>Formatos: JPG, PNG, WEBP</li>
              <li>Tamaño máximo: 5MB</li>
              <li>Las imágenes se comprimen automáticamente</li>
            </ul>
          </div>

          <UploadForm />
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Biblioteca de Imágenes
          </h2>

          {mediaItems.length === 0 ? (
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h4 className="mt-4 text-lg font-medium text-gray-700">
                No hay imágenes
              </h4>
              <p className="text-gray-500 mt-2">
                Sube tu primera imagen usando el formulario
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaItems.map((media) => (
                <MediaCard key={media.id} media={media} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MediaCard({ media }: { media: any }) {
  return (
    <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={media.url}
          alt={media.filename}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div className="p-3 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs text-gray-600 truncate flex-1"
            title={media.filename}
          >
            {media.filename}
          </span>
        </div>

        <div className="flex gap-2">
          <CopyUrlButton url={media.url} />
          <DeleteButton mediaId={media.id} />
        </div>
      </div>
    </div>
  );
}

function CopyUrlButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
        // Puedes agregar un toast aquí
      }}
      className="flex-1 text-xs bg-blue-600 text-white px-2 py-1.5 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
      title="Copiar URL"
    >
      <Copy size={12} />
      Copiar
    </button>
  );
}

function DeleteButton({ mediaId }: { mediaId: number }) {
  return (
    <form action={deleteMedia}>
      <input type="hidden" name="id" value={mediaId} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 rounded transition-colors"
        title="Eliminar imagen"
        onClick={(e) => {
          if (
            !confirm("¿Eliminar esta imagen? Esta acción no se puede deshacer.")
          ) {
            e.preventDefault();
          }
        }}
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
