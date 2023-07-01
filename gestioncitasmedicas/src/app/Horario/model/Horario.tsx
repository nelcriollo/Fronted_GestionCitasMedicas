import Especialidad from "@/app/especialidades/model/Especialidad";
import Medico from "@/app/medicos/model/Medico";

export default class Horario{
idHorario:number;
fechaRegistro:Date;
 horaInicio:string;
 horaFin:string;
 estado:number;
 medico:Medico;
especialidad:Especialidad;

constructor( idHorario:number, fechaRegistro:Date, horaInicio:string,
     fechaFin:string, estado:number, medico:Medico, especialidad:Especialidad){
    
        this.idHorario = idHorario;
        this.fechaRegistro = fechaRegistro;
        this.horaInicio = horaInicio;
        this.horaFin = fechaFin;
        this.estado = estado;
        this.medico = medico;
        this.especialidad = especialidad;
        
}

}