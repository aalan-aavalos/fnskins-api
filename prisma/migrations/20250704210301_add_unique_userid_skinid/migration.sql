/*
  Warnings:

  - A unique constraint covering the columns `[userId,skinId]` on the table `TrackedItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrackedItem_userId_skinId_key" ON "TrackedItem"("userId", "skinId");
