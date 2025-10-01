'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'

interface ProductActionState {
  success: boolean
  errors: Record<string, string>
  message?: string
}

export async function createOrUpdateProduct(
  prevState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  try {
    const id = formData.get('id') ? parseInt(formData.get('id') as string) : null
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const categoryId = parseInt(formData.get('categoryId') as string)
    const imageFile = formData.get('image') as File | null

    // Validaciones
    if (!name || name.trim().length === 0) {
      return {
        success: false,
        errors: { name: 'El nombre es obligatorio' }
      }
    }

    if (isNaN(price) || price <= 0) {
      return {
        success: false,
        errors: { price: 'El precio debe ser mayor a 0' }
      }
    }

    if (isNaN(categoryId)) {
      return {
        success: false,
        errors: { categoryId: 'Selecciona una categoría válida' }
      }
    }

    // Preparar datos del producto
    let imageUrl: string | undefined
    let publicId: string | undefined

    // Subir nueva imagen si existe
    if (imageFile && imageFile.size > 0) {
      try {
        const result = await uploadToCloudinary(imageFile, 'productos')
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
      // ACTUALIZAR producto existente
      const existingProduct = await prisma.product.findUnique({
        where: { id }
      })

      if (!existingProduct) {
        return {
          success: false,
          errors: { general: 'Producto no encontrado' }
        }
      }

      // Si hay nueva imagen y el producto tenía imagen anterior, eliminar la anterior
      if (imageUrl && existingProduct.publicId) {
        await deleteFromCloudinary(existingProduct.publicId)
      }

      await prisma.product.update({
        where: { id },
        data: {
          name,
          description: description || null,
          price,
          categoryId,
          ...(imageUrl && { imageUrl, publicId })
        }
      })

      revalidatePath('/admin/products')
      return {
        success: true,
        errors: {},
        message: 'Producto actualizado correctamente'
      }
    } else {
      // CREAR nuevo producto
      await prisma.product.create({
        data: {
          name,
          description: description || null,
          price,
          categoryId,
          imageUrl: imageUrl || null,
          publicId: publicId || null
        }
      })

      revalidatePath('/admin/products')
      return {
        success: true,
        errors: {},
        message: 'Producto creado correctamente'
      }
    }
  } catch (error: unknown) {
    console.error('Error en createOrUpdateProduct:', error)

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string }
      if (prismaError.code === 'P2003') {
        return {
          success: false,
          errors: { categoryId: 'La categoría seleccionada no existe' }
        }
      }
    }

    return {
      success: false,
      errors: {
        general: error instanceof Error ? error.message : 'Error al procesar el producto'
      }
    }
  }
}

export async function deleteProduct(productId: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return { success: false, error: 'Producto no encontrado' }
    }

    // Eliminar imagen de Cloudinary si existe
    if (product.publicId) {
      await deleteFromCloudinary(product.publicId)
    }

    // Eliminar producto de la base de datos
    await prisma.product.delete({
      where: { id: productId }
    })

    revalidatePath('/admin/products')
    return { success: true }
  } catch (error: unknown) {
    console.error('Error al eliminar producto:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al eliminar producto'
    }
  }
}