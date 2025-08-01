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

export const updateUserValidation = z.object({
  name: z
    .string()
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    )
    .optional(),
  password: passwordValidation.optional(),
});

export const sendCodeSchema = z
  .object({
    email: z.string().email("Email inválido"),
  })
  .strict("Campos ingresados invalidos");

export const verifyEmailSchema = z
  .object({
    email: z.string().email("Email inválido"),
    code: z
      .string()
      .length(6, "El código debe tener 6 caracteres")
      .regex(/^\d+$/, "El código debe contener solo números"),
  })
  .strict("Campos ingresados invalidos");