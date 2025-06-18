/*
  Warnings:

  - Made the column `secId` on table `Document` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "donoId" TEXT NOT NULL,
    "secId" TEXT NOT NULL,
    CONSTRAINT "Document_secId_fkey" FOREIGN KEY ("secId") REFERENCES "Secao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Document_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("createdAt", "donoId", "filename", "id", "secId", "updatedAt") SELECT "createdAt", "donoId", "filename", "id", "secId", "updatedAt" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
