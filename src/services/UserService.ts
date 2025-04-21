import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  public async createUser(data: User): Promise<User> {
    return prisma.user.create({ data });
  }

  public async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  public async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  public async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  public async deleteUser(id: string): Promise<boolean> {
    const deleted = await prisma.user.delete({ where: { id } });
    return Boolean(deleted);
  }
}

export { UserService };
