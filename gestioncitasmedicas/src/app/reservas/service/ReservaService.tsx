

import ReservaCita from '../model/ReservaCita';
import axiosInstance from './AxiosInstance';

class ReservaCtiaService {

  
    async getReserva(): Promise<ReservaCita[]> {
        try {
          const response = (await axiosInstance.get('/',{}));
    
          return response.data;
        } catch (error) {
          throw new Error('Error al cargar las reservas: ' + error);
        }
      }
    
      async createReserva(reserva:ReservaCita):Promise<ReservaCita> {
        try {
          const response = await axiosInstance.post('/', reserva, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          throw new Error('Error al crear la reserva: ' + error);
        }
    }
    
      async updateReserva(reserva:ReservaCita):Promise<ReservaCita> {
        try {
          const response = await axiosInstance.put('/', reserva, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          throw new Error('Error al actualizar la reserva: ' + error);
        }
      }
    
      async deleteReserva(reserva:ReservaCita) {
        try {
          const response = await axiosInstance.delete('/'+ reserva.idReserva, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          throw new Error('Error al eliminar la reserva: ' + error);
        }
      }
    
    }
export default ReservaCtiaService;