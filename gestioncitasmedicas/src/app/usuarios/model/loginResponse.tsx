export default interface LoginResponse {
    data: any; // Reemplaza 'any' con el tipo real del cuerpo de respuesta
    headers: {
      authorization: string; // Reemplaza 'string' con el tipo real del valor de la cabecera
    };
  }