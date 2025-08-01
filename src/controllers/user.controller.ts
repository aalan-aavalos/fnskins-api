import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { AppError } from "../errors/appErrors";

class UserController {
  private userService = new UserService();

  private handleError(res: Response, error: any) {
    console.error("Auth Error:", error); // Log detallado para desarrollo

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.errorCode,
        message: error.message,
        data: null,
        errors: error.details || null,
      });
    }

    // Error de validación de Zod (cuando no se captura como AppError)
    if (error.errors && Array.isArray(error.errors)) {
      return res.status(400).json({
        status: 2,
        message: "Error de validación",
        data: null,
        errors: error.errors,
      });
    }

    // Error no controlado
    res.status(500).json({
      status: 1,
      message: "Error interno del servidor",
      data: null,
      errors:
        process.env.NODE_ENV === "development"
          ? { message: error.message }
          : null,
    });
  }

  public getUserProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.params.id;

      const user = await this.userService.getUserProfile(userId);

      res.status(200).json({
        status: 0,
        message: "Perfil de usuario obtenido",
        data: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
          isDonor: user?.isDonor,
          isVerified: user?.isVerified,
          skinsLimit: user?.skinsLimit,
          createdAt: user?.createdAt,
        },
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public updateUserProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      const data = req.body;

      const userUpdated = await this.userService.updateUserProfile(
        userId,
        data
      );

      res.status(200).json({
        status: 0,
        message: "Perfil de usuario actualizado",
        data: {
          id: userUpdated?.id,
          name: userUpdated?.name,
          email: userUpdated?.email,
          role: userUpdated?.role,
          isDonor: userUpdated?.isDonor,
          isVerified: userUpdated?.isVerified,
          skinsLimit: userUpdated?.skinsLimit,
          createdAt: userUpdated?.createdAt,
        },
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };
}

export { UserController };
