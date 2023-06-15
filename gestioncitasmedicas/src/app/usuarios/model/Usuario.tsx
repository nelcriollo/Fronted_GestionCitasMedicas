export default interface Usuario {
    idUsuario: number;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    estado: number;
  }
  
  function getEstadoNombre(estado: number): string {
    switch (estado) {
      case 1:
        return 'Activo';
      case 2:
        return 'Inactivo';
      default:
        return 'Otro';
    }
  }