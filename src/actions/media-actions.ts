'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

export async function uploadMedia(formData: FormData) {
  const files = formData.getAll('files') as File[]

  if (!files || files.length === 0) {
    return { success: false, message: 'No se seleccionaron archivos' }
  }

  try {
    let uploadedCount = 0

    for (const file of files) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          message: `Formato no soportado: ${file.name}. Solo se permiten imágenes.`
        }
      }

      // Validar tamaño (max 5MB)
      if (file.size > 115 * 1024 * 1024) {
        return {
          success: false,
          message: `Archivo demasiado grande: ${file.name} (máximo 5MB)`
        }
      }

      // Subir a Cloudinary
      const result = await uploadToCloudinary(file, 'media')

      // Guardar en base de datos
      await prisma.media.create({
        data: {
          url: result.url,
          publicId: result.publicId,
          filename: file.name,
          mimeType: file.type,
          folder: 'media'
        }
      })

      uploadedCount++
    }

    revalidatePath('/admin/media')
    return {
      success: true,
      message: `${uploadedCount} ${uploadedCount === 1 ? 'archivo subido' : 'archivos subidos'} correctamente`
    }
  } catch (error: any) {
    console.error('Error al subir archivos:', error)
    return {
      success: false,
      message: `Error al subir archivos: ${error.message}`
    }
  }
}

export async function deleteMedia(formData: FormData) {
  const id = Number(formData.get('id'))

  if (!id) {
    return { success: false, message: 'ID de imagen no proporcionado' }
  }

  try {
    // Obtener información de la imagen
    const media = await prisma.media.findUnique({
      where: { id }
    })

    if (!media) {
      return { success: false, message: 'Imagen no encontrada' }
    }

    // Eliminar de Cloudinary
    await deleteFromCloudinary(media.publicId)

    // Eliminar de la base de datos
    await prisma.media.delete({
      where: { id }
    })

    revalidatePath('/admin/media')
    return { success: true, message: 'Imagen eliminada correctamente' }
  } catch (error: any) {
    console.error('Error al eliminar imagen:', error)
    return {
      success: false,
      message: `Error al eliminar imagen: ${error.message}`
    }
  }
}