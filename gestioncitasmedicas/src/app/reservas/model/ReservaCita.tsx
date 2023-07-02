import Horario from "@/app/Horario/model/Horario";
import Paciente from "@/app/paciente/model/Paciente";

export default class ReservaCita{

     idReserva:number;
     fechaRegistro:Date;
     precio:number;
     estado:number;
     usuario:any;
     horario:any;
     paciente:any;

     constructor(idReserva:number, fechaRegistro:Date, precio:number, estado:number, usuario:any, horario:any, paciente:any){
         this.idReserva = idReserva;
         this.fechaRegistro = fechaRegistro;
         this.precio = precio;
         this.estado = estado;
         this.usuario = usuario;
         this.horario = horario;
         this.paciente = paciente;
     }
}