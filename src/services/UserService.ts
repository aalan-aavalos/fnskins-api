import { PrismaClient, User } from "@prisma/client";
import { NotFoundError, ValidationError } from "../errors/appErrors";
import { NodemailerSender } from "../utils/NodemailerSender";
import { deleteAccountConfirmationTemplate } from "../templates/deleteAccountConfirmationTemplate";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class UserService {
  public async getUserProfile(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("Datos de usuario");

    return user;
  }

  public async updateUserProfile(
    id: string,
    data: Partial<User>
  ): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundError("El usuario no a sido encontrado");

    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    const { name, password } = data;

    const userUpdated = await prisma.user.update({
      where: { id },
      data: { name, password },
    });
    return null;
  }

  public async sendDeleteCode(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundError("Usuario");

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        verificationCode: code,
        verificationExpires: expires,
      },
    });

    await NodemailerSender.sendMail(
      email,
      "Verifica tu cuenta",
      deleteAccountConfirmationTemplate(user.name!, code),
      `Hola ${user.name}, tu código de verificación es: ${code}`
    );
  }

  public async verifyDeleteCode(email: string, code: string): Promise<Boolean> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.verificationCode !== code) {
      throw new ValidationError("Código de verificación incorrecto");
    }
    if (user.verificationExpires && user.verificationExpires < new Date()) {
      throw new ValidationError("Código de verificación expirado");
    }

    const deleted = await prisma.user.delete({ where: { id: user.id } });

    return Boolean(deleted);
  }
}

export { UserService };
