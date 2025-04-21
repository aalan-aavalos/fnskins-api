import { PrismaClient } from "@prisma/client";

class DB {
  private static prisma: PrismaClient;

  private constructor() {}

  public static getPrismaClient(): PrismaClient {
    if (!DB.prisma) {
      DB.prisma = new PrismaClient();
    }
    return DB.prisma;
  }
}

export default DB;
