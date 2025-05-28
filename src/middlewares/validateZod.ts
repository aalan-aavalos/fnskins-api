// middlewares/validateZod.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export class ValidateZod {
  public validateZod(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const formattedErrors = result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          status: 2,
          message: "Error de validación",
          data: null,
          errors: formattedErrors,
        });
        return; // Asegura que la función termine aquí
      }
      next();
    };
  }
}
