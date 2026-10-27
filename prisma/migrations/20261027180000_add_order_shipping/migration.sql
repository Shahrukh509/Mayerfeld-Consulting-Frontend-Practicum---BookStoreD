-- AlterTable
ALTER TABLE "orders"
ADD COLUMN "shippingName" TEXT,
ADD COLUMN "shippingAddressLine1" TEXT,
ADD COLUMN "shippingAddressLine2" TEXT,
ADD COLUMN "shippingCity" TEXT,
ADD COLUMN "shippingState" TEXT,
ADD COLUMN "shippingPostalCode" TEXT,
ADD COLUMN "shippingCountry" TEXT;
