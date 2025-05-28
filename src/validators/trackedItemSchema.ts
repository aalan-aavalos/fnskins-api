// validators/authSchemas.ts
import { z } from "zod";

export const createSchema = z
  .object({
    userId: z.string().uuid({
      message: "El ID debe ser un UUID válido",
    }),
    skinId: z.string().min(1, "El ID de la skin es requerido"),
  })
  .strict("Campos ingresados invalidos");

export const updateSchema = z.object({
  userId: z.string().uuid({
    message: "El ID debe ser un UUID válido",
  }),
  skinId: z.string().min(1, "El ID de la skin es requerido"),
  obtained: z.boolean().optional(),
});
