// middlewares/auth.middleware.ts
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors/appErrors";

export const SECRET_KEY: Secret = process.env.JWT_SECRET!;

// middlewares/auth.middleware.ts
export interface JwtPayloadWithRole extends JwtPayload {
  id: string;
  role: string; // Añadimos el campo role
}

export interface CustomRequest extends Request {
  token: string | JwtPayloadWithRole;
  id: string;
  userRole: string; // Nuevo campo para el rol
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new AuthError("Token no proporcionado", 401, 3);

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayloadWithRole;

    // Verificación básica de la estructura del token
    if (!decoded.id || !decoded.role) {
      throw new AuthError("Token mal formado", 401, 3);
    }

    // Añadimos la información al request
    const customReq = req as CustomRequest;
    customReq.token = decoded;
    customReq.id = decoded.id;
    customReq.userRole = decoded.role;

    next();
  } catch (err) {
    handleAuthError(err, res);
  }
};

// Middleware para verificación de roles
export const requireRole = (requiredRoles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = Array.isArray(requiredRoles)
        ? requiredRoles
        : [requiredRoles];
      const userRole = (req as CustomRequest).userRole;

      if (!roles.includes(userRole)) {
        throw new AuthError(
          `Acceso denegado. Se requiere uno de estos roles: ${roles.join(
            ", "
          )}`,
          403,
          6 // Código para errores de permisos
        );
      }

      next();
    } catch (err) {
      handleAuthError(err, res);
    }
  };
};

// Helper para manejo de errores
const handleAuthError = (err: unknown, res: Response) => {
  let error: AuthError;

  if (err instanceof jwt.JsonWebTokenError) {
    error = new AuthError("Token inválido", 401, 3);
  } else if (err instanceof AuthError) {
    error = err;
  } else if (err instanceof Error) {
    error = new AuthError(`Error de autenticación: ${err.message}`, 401, 3);
  } else {
    error = new AuthError("Error de autenticación desconocido", 401, 3);
  }

  res.status(error.statusCode).json({
    status: error.errorCode,
    message: error.message,
    data: null,
    errors: null,
  });
};

// Middlewares preconfigurados
export const adminOnly = requireRole("admin");
export const moderatorOrAdmin = requireRole(["moderator", "admin"]);
export const userOnly = requireRole("user");