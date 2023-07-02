import ReservasUsuario from '@/app/reservas/model/ReservasUsuario';
import  Usuario  from '../model/Usuario';
import  AuthenCredentials  from '../model/UsuarioLogin';
import LoginResponse from '../model/loginResponse';
import axiosInstance from './AxiosInstance';

class UsuarioService {

  async login(credentials:AuthenCredentials):Promise<LoginResponse> {
   try {
      const response = (await axiosInstance.post('/login', credentials, {}));
     
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Error al loguearse: ' + error);
    }
  }

  async obtenerCitasPorUsuario(id:number):Promise<ReservasUsuario> {
    try {
      const response = await axiosInstance.get('/usuariosReservas/'+ id, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las Reservas: ' + error);
    }
  }

  async getUsers(): Promise<Usuario[]> {
    try {
      const response = await axiosInstance.get('/',{});

      return response.data;
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error);
    }
  }

  async createUser(usuarioData:Usuario):Promise<Usuario> {
    try {
      const response = await axiosInstance.post('/createUser', usuarioData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error);
    }
}

  async updateUser(usuarioData:Usuario) {
    try {
      const response = await axiosInstance.post('/', usuarioData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el usuario: ' + error);
    }
  }

}

export default UsuarioService;