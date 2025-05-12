import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  NotFoundError,
  ValidationError,
  AuthError,
  ConflictError,
} from "../errors/appErrors";
import { NodemailerSender } from "../utils/NodemailerSender";
import { verificationEmailTemplate } from "../templates/emailVerificationTremplate";

const prisma = new PrismaClient();

class AuthService {
  public async sendVerificationCode(email: string) {
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
      verificationEmailTemplate(user.name!, code),
      `Hola ${user.name}, tu código de verificación es: ${code}`
    );
  }

  public async verifyEmailCode(email: string, code: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.verificationCode !== code) {
      throw new ValidationError("Código de verificación incorrecto");
    }
    if (user.verificationExpires && user.verificationExpires < new Date()) {
      throw new ValidationError("Código de verificación expirado");
    }

    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationExpires: null,
      },
    });
  }

  public async loginService(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AuthError("Credenciales inválidas");
    }
    if (!user.isVerified) {
      throw new AuthError("Usuario no verificado", 3); // Código especial para no verificado
    }

    return user;
  }

  public async registerService({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictError("El email ya está registrado");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    await this.sendVerificationCode(user.email);

    return user;
  }
}

export { AuthService };
