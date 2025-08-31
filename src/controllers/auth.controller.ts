// src/controllers/AuthController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "../services/AuthService";
import { AppError } from "../errors/appErrors";

const ACCESS_TTL_SEC = 15 * 60; // 15 mins (ajústalo)
const JWT_SECRET = process.env.JWT_SECRET!;

class AuthController {
  private authService = new AuthService();

  constructor() {
    this.authService = new AuthService();
  }

  private handleError(res: Response, error: any) {
    console.error("Auth Error:", error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.errorCode,
        message: error.message,
        data: null,
        errors: error.details || null,
      });
    }

    if (error?.errors && Array.isArray(error.errors)) {
      return res.status(400).json({
        status: 2,
        message: "Error de validación",
        data: null,
        errors: error.errors,
      });
    }

    return res.status(500).json({
      status: 1,
      message: "Error interno del servidor",
      data: null,
      errors:
        process.env.NODE_ENV === "development"
          ? { message: error.message }
          : null,
    });
  }

  public loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Valida credenciales y obtiene el usuario (asegúrate que devuelva id, name, email…)
      const user = await this.authService.loginService(email, password);

      // Firma el JWT de sesión
      const accessToken = jwt.sign(
        { sub: user.id, email: user.email, rol: user.role }, // puedes añadir roles, etc.
        JWT_SECRET,
        { expiresIn: ACCESS_TTL_SEC } // "900s" o 900
      );

      res.status(200).json({
        status: 0,
        message: "Inicio de sesión exitoso",
        data: {
          accessToken,
          expiresIn: ACCESS_TTL_SEC,
          user: {
            id: user.id,
            name: user.name ?? null,
            email: user.email,
          },
        },
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public registerUser = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const user = await this.authService.registerService({
        email,
        password,
        name,
      });

      res.status(201).json({
        status: 0,
        message:
          "Usuario registrado exitosamente. Se ha enviado un código de verificación.",
        data: { id: user.id, email: user.email },
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public sendVerificationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await this.authService.sendVerificationCode(email);

      res.status(200).json({
        status: 0,
        message: "Código de verificación enviado",
        data: null,
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public verifyEmail = async (req: Request, res: Response) => {
    try {
      const { email, code } = req.body;
      await this.authService.verifyEmailCode(email, code);

      res.status(200).json({
        status: 0,
        message: "Correo electrónico verificado exitosamente",
        data: null,
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };
}

export { AuthController };
