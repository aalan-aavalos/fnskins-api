export interface ResponseData {
  code: number;
  message: string;
  data?: any;
  errors?: any;
}

export class ResponseHelper {
  public static success(
    data: any,
    message = "Operación exitosa"
  ): ResponseData {
    return { code: 0, message, data };
  }

  public static error(message: string, errors: any = null): ResponseData {
    return { code: 1, message, errors };
  }

  public static validationError(errors: any): ResponseData {
    return { code: 2, message: "Error de validación", errors };
  }

  public static notFound(message = "No encontrado"): ResponseData {
    return { code: 3, message };
  }

  public static unauthorized(message = "No autorizado"): ResponseData {
    return { code: 4, message };
  }

  public static serverError(
    message = "Error interno del servidor",
    errors: any = null
  ): ResponseData {
    return { code: 5, message, errors };
  }
}
