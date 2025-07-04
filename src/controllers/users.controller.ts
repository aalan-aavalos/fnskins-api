import { Request, Response } from "express";
import { UserService } from "../services/UsersService";
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

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);

      res.status(200).json({
        status: 0,
        message: "Usuario creado exitosamente",
        data: user,
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        status: 0,
        message: "Usuarios listados exitosamente",
        data: users,
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.params.id);

      res.status(200).json({
        status: 0,
        message: "Usuario listado exitosamente",
        data: user,
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );

      res.status(200).json({
        status: 0,
        message: "Usuario actualizado exitosamente",
        data: updatedUser,
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await this.userService.deleteUser(req.params.id);

      res.status(200).json({
        status: 0,
        message: "Usuario eliminado exitosamente",
        data: { deleted },
        errors: null,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  };
}

export { UserController };
