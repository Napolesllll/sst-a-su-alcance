import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        url: true,
        filename: true
      }
    })

    return NextResponse.json(media)
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener medios' },
      { status: 500 }
    )
  }
}