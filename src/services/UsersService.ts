import { PrismaClient, User } from "@prisma/client";
import { ConflictError, NotFoundError } from "../errors/appErrors";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class UsersService {
  public async createUser(data: User): Promise<User> {
    const { email, password } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictError("El email ya está registrado");

    const hashedPassword = await bcrypt.hash(password, 10);

    const { role, skinsLimit, ...safeData } = data;

    const user = await prisma.user.create({
      data: {
        ...safeData,
        password: hashedPassword,
        role: "user",
        skinsLimit: 0,
      },
    });

    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundError("El usuario no a sido encontrado");

    return user;
  }

  public async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundError("El usuario no a sido encontrado");

    if (data.email && data.email !== user.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: id },
        },
      });
      if (emailExists) throw new ConflictError("Email ya está en uso");
    }

    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    const { role, skinsLimit, ...safeData } = data;

    const userUpdated = await prisma.user.update({
      where: { id },
      data: safeData,
    });

    return userUpdated;
  }

  public async deleteUser(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundError("El usuario no a sido encontrado");

    const deleted = await prisma.user.delete({ where: { id } });
    return Boolean(deleted);
  }
}

export { UsersService };
