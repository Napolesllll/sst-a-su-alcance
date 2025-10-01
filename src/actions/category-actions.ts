'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

interface CategoryActionState {
  success: boolean
  errors: Record<string, string>
  message?: string
}

export async function createOrUpdateCategory(
  prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  try {
    const id = formData.get('id') ? parseInt(formData.get('id') as string) : null
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File | null

    // Validaciones
    if (!name || name.trim().length === 0) {
      return {
        success: false,
        errors: { name: 'El nombre es obligatorio' }
      }
    }

    if (!slug || slug.trim().length === 0) {
      return {
        success: false,
        errors: { slug: 'El slug es obligatorio' }
      }
    }

    // Validar formato de slug (solo letras, números y guiones)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(slug)) {
      return {
        success: false,
        errors: { slug: 'El slug solo puede contener letras minúsculas, números y guiones' }
      }
    }

    // Preparar datos de la categoría
    let imageUrl: string | undefined
    let publicId: string | undefined

    // Subir nueva imagen si existe
    if (imageFile && imageFile.size > 0) {
      try {
        const result = await uploadToCloudinary(imageFile, 'categorias')
        imageUrl = result.url
        publicId = result.publicId
      } catch {
        return {
          success: false,
          errors: { image: 'Error al subir la imagen' }
        }
      }
    }

    if (id) {
      // ACTUALIZAR categoría existente
      const existingCategory = await prisma.category.findUnique({
        where: { id }
      })

      if (!existingCategory) {
        return {
          success: false,
          errors: { general: 'Categoría no encontrada' }
        }
      }

      // Verificar slug único (excepto la categoría actual)
      const slugExists = await prisma.category.findFirst({
        where: {
          slug,
          NOT: { id }
        }
      })

      if (slugExists) {
        return {
          success: false,
          errors: { slug: 'Este slug ya está en uso' }
        }
      }

      // Si hay nueva imagen y la categoría tenía imagen anterior, eliminar la anterior
      if (imageUrl && existingCategory.publicId) {
        await deleteFromCloudinary(existingCategory.publicId)
      }

      await prisma.category.update({
        where: { id },
        data: {
          name,
          slug,
          ...(imageUrl && { imageUrl, publicId })
        }
      })

      revalidatePath('/admin/categories')
      revalidatePath('/productos')
      return {
        success: true,
        errors: {},
        message: 'Categoría actualizada correctamente'
      }
    } else {
      // CREAR nueva categoría
      // Verificar slug único
      const slugExists = await prisma.category.findUnique({
        where: { slug }
      })

      if (slugExists) {
        return {
          success: false,
          errors: { slug: 'Este slug ya está en uso' }
        }
      }

      await prisma.category.create({
        data: {
          name,
          slug,
          imageUrl: imageUrl || null,
          publicId: publicId || null
        }
      })

      revalidatePath('/admin/categories')
      revalidatePath('/productos')
      return {
        success: true,
        errors: {},
        message: 'Categoría creada correctamente'
      }
    }
  } catch (error: unknown) {
    console.error('Error en createOrUpdateCategory:', error)

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: { target?: string[] } }
      if (prismaError.code === 'P2002') {
        const target = prismaError.meta?.target?.[0]
        if (target === 'slug') {
          return {
            success: false,
            errors: { slug: 'Este slug ya está en uso' }
          }
        }
        if (target === 'name') {
          return {
            success: false,
            errors: { name: 'Este nombre ya está en uso' }
          }
        }
      }
    }

    return {
      success: false,
      errors: {
        general: error instanceof Error ? error.message : 'Error al procesar la categoría'
      }
    }
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { products: true }
    })

    if (!category) {
      return { success: false, error: 'Categoría no encontrada' }
    }

    // Verificar si tiene productos asociados
    if (category.products.length > 0) {
      return {
        success: false,
        error: `No se puede eliminar. Esta categoría tiene ${category.products.length} producto(s) asociado(s)`
      }
    }

    // Eliminar imagen de Cloudinary si existe
    if (category.publicId) {
      await deleteFromCloudinary(category.publicId)
    }

    // Eliminar categoría de la base de datos
    await prisma.category.delete({
      where: { id: categoryId }
    })

    revalidatePath('/admin/categories')
    revalidatePath('/productos')
    return { success: true }
  } catch (error: unknown) {
    console.error('Error al eliminar categoría:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al eliminar categoría'
    }
  }
}