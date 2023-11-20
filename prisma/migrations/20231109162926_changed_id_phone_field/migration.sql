/*
  Warnings:

  - The primary key for the `Phone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Phone` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phone" (
    "number" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "Phone_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("customerId", "number") SELECT "customerId", "number" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
