// src/errors/appErrors.ts

export abstract class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errorCode: number,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Error para autenticación (status HTTP 401)
export class AuthError extends AppError {
  constructor(
    message: string = "No autorizado",
    errorCode: number = 3,
    details?: any
  ) {
    super(message, 401, errorCode, details);
  }
}

// Error para validaciones (status HTTP 400)
export class ValidationError extends AppError {
  constructor(message: string = "Error de validación", details?: any) {
    super(message, 400, 2, details);
  }
}

// Error para recursos no encontrados (status HTTP 404)
export class NotFoundError extends AppError {
  constructor(entity: string = "Recurso") {
    super(`${entity} no encontrado`, 404, 4);
  }
}

// Error para conflictos (status HTTP 409)
export class ConflictError extends AppError {
  constructor(message: string = "Conflicto de datos") {
    super(message, 409, 5);
  }
}

// Error para errores internos del servidor (status HTTP 500)
export class InternalError extends AppError {
  constructor(message: string = "Error interno del servidor") {
    super(message, 500, 1);
  }
}
