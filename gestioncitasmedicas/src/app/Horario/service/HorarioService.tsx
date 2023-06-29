
import Horario from '../model/Horario';
import axiosInstance from './AxiosInstance';

class HorarioService {


  async getHorarios(): Promise<Horario[]> {
    try {
      const response = (await axiosInstance.get('/',{}));

      return response.data;
    } catch (error) {
      throw new Error('Error al cargar los horarios: ' + error);
    }
  }

  async createHorario(horario:Horario):Promise<Horario> {
    try {
      const response = await axiosInstance.post('/', horario, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el horario: ' + error);
    }
}

  async updateHorario(horario:Horario) {
    try {
      const response = await axiosInstance.put('/', horario, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el horario: ' + error);
    }
  }

  async deleteHorario(horario:Horario) {
    try {
      const response = await axiosInstance.delete('/'+ horario.idHorario, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar el Horario: ' + error);
    }
  }

}

export default HorarioService;