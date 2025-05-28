// validators/authSchemas.ts
import { z } from "zod";

const passwordValidation = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(50, "Contraseña demasiado larga")
  .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
  .regex(/[a-z]/, "Debe contener al menos una miniscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  .refine(
    (pass) => !pass.includes(" "),
    "La contraseña no puede contener espacios"
  );

export const createSchema = z
  .object({
    email: z.string().email("Email inválido"),
    name: z
      .string()
      .min(1, "El nombre es requerido")
      .max(50, "El nombre no puede exceder los 50 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
    password: passwordValidation,
  })
  .strict("Campos ingresados invalidos");

export const updateSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    ),
  password: passwordValidation,
  isDonor: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  pushToken: z.string().optional(),
  donations: z.number().optional(),
  verificationCode: z.string().optional(),
  verificationExpires: z.date().optional(),
});