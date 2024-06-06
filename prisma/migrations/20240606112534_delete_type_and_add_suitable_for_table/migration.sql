/*
  Warnings:

  - You are about to drop the column `typeId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `type` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SuitableFor" AS ENUM ('male', 'female', 'kids', 'baby', 'all');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_typeId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "typeId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "SuitableFor" "SuitableFor" NOT NULL DEFAULT 'all';

-- DropTable
DROP TABLE "type";
