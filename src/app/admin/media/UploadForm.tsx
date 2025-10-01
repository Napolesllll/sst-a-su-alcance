"use client";

import { useState } from "react";
import { uploadMedia } from "@/actions/media-actions";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // Validar cada archivo
      const validFiles = newFiles.filter((file) => {
        if (!file.type.startsWith("image/")) {
          alert(`${file.name} no es una imagen válida`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} supera el tamaño máximo de 5MB`);
          return false;
        }
        return true;
      });

      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const result = await uploadMedia(formData);
      setUploadStatus(result);

      if (result.success) {
        setFiles([]);
        // Refrescar la página para mostrar las nuevas imágenes
        router.refresh();
      }
    } catch {
      setUploadStatus({
        success: false,
        message: "Error al subir archivos",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h3 className="font-medium text-lg text-gray-800 mb-4">
        Subir nuevas imágenes
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Seleccionar imágenes
          </label>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {files.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Archivos seleccionados ({files.length}):
            </h4>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm bg-white p-2 rounded border"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Upload size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate text-gray-700">{file.name}</span>
                    <span className="text-gray-500 text-xs flex-shrink-0">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={isUploading}
                    className="ml-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={files.length === 0 || isUploading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Subiendo a Cloudinary...
            </>
          ) : (
            <>
              <Upload size={20} />
              Subir Imágenes
            </>
          )}
        </button>

        {uploadStatus && (
          <div
            className={`p-3 rounded-lg text-center text-sm ${
              uploadStatus.success
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {uploadStatus.message}
          </div>
        )}
      </form>
    </div>
  );
}
