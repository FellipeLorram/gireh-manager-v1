/*
  Warnings:

  - Added the required column `situation` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN "birthDate" DATETIME;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "dnp_right" REAL,
    "dnp_left" REAL,
    "esf_right" TEXT,
    "cil_right" TEXT,
    "axle_right" INTEGER,
    "esf_left" TEXT,
    "cil_left" TEXT,
    "axle_left" INTEGER,
    "add" TEXT,
    "service_order" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "rest" REAL NOT NULL,
    "situation" TEXT NOT NULL,
    "observation" TEXT,
    "status" BOOLEAN NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("add", "axle_left", "axle_right", "cil_left", "cil_right", "createdAt", "customerId", "customer_name", "dnp_left", "dnp_right", "esf_left", "esf_right", "id", "observation", "orgId", "rest", "service_order", "status", "total") SELECT "add", "axle_left", "axle_right", "cil_left", "cil_right", "createdAt", "customerId", "customer_name", "dnp_left", "dnp_right", "esf_left", "esf_right", "id", "observation", "orgId", "rest", "service_order", "status", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
