/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicId` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_mediaId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image",
DROP COLUMN "mediaId",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "publicId" TEXT;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "folder" TEXT NOT NULL DEFAULT 'general',
ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
DROP COLUMN "mediaId",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "publicId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Media_publicId_key" ON "Media"("publicId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
