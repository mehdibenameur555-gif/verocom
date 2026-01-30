import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
// This is a common pattern to avoid exhausting database connections

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Reuse Prisma client instance in development to avoid creating new connections
  const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ["error", "warn"],
    });
  }

  prisma = globalForPrisma.prisma;
}

export default prisma;
