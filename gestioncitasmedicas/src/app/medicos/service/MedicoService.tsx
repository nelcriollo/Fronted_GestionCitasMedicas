
import { Medico } from '../model/Medico';
import axiosInstance from './AxiosInstance';

class MedicoService {


  async getMedicos(): Promise<Medico[]> {
    try {
      const response = (await axiosInstance.get('/',{}));

      return response.data;
    } catch (error) {
      throw new Error('Error al cargar los médico: ' + error);
    }
  }

  async createMedico(medico:Medico):Promise<Medico> {
    try {
      const response = await axiosInstance.post('/', medico, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el médico: ' + error);
    }
}

  async updateMedico(medico:Medico) {
    try {
      const response = await axiosInstance.put('/', medico, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el médico: ' + error);
    }
  }

  async deleteMedico(medico:Medico) {
    try {
      const response = await axiosInstance.delete('/'+ medico.idMedico, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar el médico: ' + error);
    }
  }

}

export default MedicoService;