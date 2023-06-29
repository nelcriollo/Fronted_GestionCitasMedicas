
export default class Paciente{

    idPaciente: number;
    nombre:string;
    apellidos:string;
    fechaNacimiento:Date | null;;
    nroDocumento:string;
    email:string;
    telefono:string;
    estado:number;

    constructor(idPaciente:number, nombre:string, apellidos:string, fechaNacimiento:Date, nroDocumento:string, email:string, telefono:string, estado:number){
        this.idPaciente = idPaciente;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = new Date();
        this.nroDocumento = nroDocumento;
        this.email = email;
        this.telefono = telefono;
        this.estado = estado;
    }
}