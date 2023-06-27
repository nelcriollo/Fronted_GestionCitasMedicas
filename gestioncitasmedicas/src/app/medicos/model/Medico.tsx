
export default class Medico{

     idMedico:number;
     codigoCpi:string;
      nombre:string;
      apellidos:string;
      email:string;
     telefono: string;
     especialidad:any;
     estado:number;
     horarios:[];

     constructor(idMedico:number, codigoCpi:string,nombre:string,apellidos:string, email:string,telefono:string,especialidad:any,estado:number,horarios:[]){
        this.idMedico = idMedico;
        this.codigoCpi = codigoCpi;
        this.nombre = nombre;
        this.apellidos =apellidos;
        this.email = email;
        this.telefono = telefono;
        this.especialidad = especialidad;
        this.estado = estado;
        this.horarios = horarios;

    }
}