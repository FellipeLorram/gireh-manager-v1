-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Frame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "height" REAL,
    "reference" TEXT,
    "image_url" TEXT,
    "supplier" TEXT,
    "orderId" TEXT,
    CONSTRAINT "Frame_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Frame" ("height", "id", "name", "orderId", "price") SELECT "height", "id", "name", "orderId", "price" FROM "Frame";
DROP TABLE "Frame";
ALTER TABLE "new_Frame" RENAME TO "Frame";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
