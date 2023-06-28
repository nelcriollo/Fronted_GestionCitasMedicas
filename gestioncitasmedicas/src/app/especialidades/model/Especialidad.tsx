export default class Especialidad{

    idEspecialidad:number;
     nombre:string;
     precioConsulta: number;
     duracion: number;
     estado:number;

     constructor(idEspecialidad:number, nombre:string, precioConsulta:number, duracion:number, estado:number){
        this.idEspecialidad = idEspecialidad;
        this.nombre = nombre;
        this.precioConsulta = precioConsulta;
        this.duracion = duracion;
        this.estado = estado;
    }   
    
}