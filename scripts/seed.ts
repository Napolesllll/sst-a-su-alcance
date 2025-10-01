import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Configurar variables de entorno
dotenv.config({ path: '.env' });

// Crear instancia de Prisma
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = 'admin123';
  
  // Borrar usuario existente si existe
  await prisma.user.deleteMany({
    where: { email }
  });
  
  // Crear nuevo usuario admin
  await prisma.user.create({
    data: {
      name: 'Administrador',
      email,
      password: await bcrypt.hash(password, 12),
      role: 'ADMIN'
    }
  });
  
  console.log('✅ Usuario administrador creado:');
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Contraseña: ${password}`);
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });