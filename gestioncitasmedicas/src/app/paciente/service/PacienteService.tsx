
import Paciente from '../model/Paciente';
import axiosInstance from './AxiosInstance';

class PacienteService {

  
    async getPaciente(): Promise<Paciente[]> {
        try {
          const response = (await axiosInstance.get('/',{}));
    
          return response.data;
        } catch (error) {
          throw new Error('Error al cargar los paciente: ' + error);
        }
      }
    
      async createPaciente(paciente:Paciente):Promise<Paciente> {
        try {
          const response = await axiosInstance.post('/', paciente, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          throw new Error('Error al crear el paciente: ' + error);
        }
    }
    
      async updatePaciente(paciente:Paciente):Promise<Paciente> {
        try {
          const response = await axiosInstance.put('/', paciente, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          throw new Error('Error al actualizar el paciente: ' + error);
        }
      }
    
      async deletePaciente(paciente:Paciente) {
        try {
          const response = await axiosInstance.delete('/'+ paciente.idPaciente, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          throw new Error('Error al eliminar el paciente: ' + error);
        }
      }

      async buscarPacientePorDni(dni:string):Promise<Paciente> {
        try {
          const response = await axiosInstance.get('/buscarDni/'+ dni, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          throw new Error('Error al obtener el paciente: ' + error);
        }
      }
    
    }
export default PacienteService;