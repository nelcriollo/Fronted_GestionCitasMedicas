import Especialidad from '../model/Especialidad';
import axiosInstance from './AxiosInstance';

class EspecialidadService {


  async getEspecialidades(): Promise<Especialidad[]> {
    try {
      const response = (await axiosInstance.get('/',{}));

      return response.data;
    } catch (error) {
      throw new Error('Error al cargar las especialidades: ' + error);
    }
  }



  async createEspecialidad(especialidad:Especialidad):Promise<Especialidad> {
    try {
      const response = await axiosInstance.post('/', especialidad, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error);
    }
}

  async updateEspecialidad(especialidad:Especialidad) {
    try {
      const response = await axiosInstance.post('/', especialidad, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar la especialidad: ' + error);
    }
  }

  async deleteEspecialidad(especialidad:Especialidad) {
    try {
      const response = await axiosInstance.delete('/'+ especialidad.idEspecialidad, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar la especialidad: ' + error);
    }
  }

}

export default EspecialidadService;