"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import UsuarioService from '@/app/usuarios/services/UsuarioService';
import ReservasUsuario from '../model/ReservasUsuario';
import { Avatar, CardContent, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { deepPurple } from '@mui/material/colors';
import { AuthContext } from '@/app/AuthContext';

export const  ListarCitasComponent = ()=> {

    const {loginResponse } = React.useContext(AuthContext);

    const [idUser, setidUser] = React.useState<any>(null)
    
    
    console.log(loginResponse?.idUsuario);
   


    const [citas, setCitas] = React.useState<ReservasUsuario>();

    const citasService = new UsuarioService();
    
    React.useEffect(() => {
        setidUser(loginResponse?.idUsuario);
    
        const obtenerCitas = async () => {
          try {
            const response = await citasService.obtenerCitasPorUsuario(idUser);
            setCitas(response);
            console.log("listando reservas", response);
          } catch (error) {
            console.error(error);
          }
        };
    
        obtenerCitas();
      }, [idUser]); 
    
  return (
    <><div style={{ maxWidth: 500, minHeight: 50, textAlign: 'center', boxShadow: '10px', backgroundColor: 'whitesmoke', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'150px' }}>
    <Typography variant="h6" gutterBottom> Lista de citas reservadas hasta el momento </Typography>
  </div>
   <div style={{ display: 'flex', justifyContent: 'center',padding:5, margin:5}}>
          <div style={{ minWidth: 1000 }}>
              <Carousel animation="slide" autoPlay={false} sx={{ bgcolor: '', padding:2, margin:1}}>
                  {citas?.reservasDtos.map((reserva, index) => (
                      <Paper key={reserva.idReserva} elevation={3} sx={{ padding: '20px', display: 'flex', alignItems: 'center',marginBottom:2, marginLeft:3, marginRight:3, textShadow:'250px'}}>
                          <div style={{ flex: '0 0 auto', marginRight: '20px' }}>
                              <CardContent sx={{ bgcolor: '' }}>
                                  <Avatar className="avatar" sx={{ bgcolor: deepPurple[900], borderRadius: 0, padding: 5 , width:'250px'}}>
                                      Dr@.  {reserva.horario.medico.nombre}
                                      <br />
                                      {reserva.horario.medico.apellidos.split(' ')[0]}
                                  </Avatar>
                              </CardContent>
                          </div>
                          <div style={{ flex: '1 1 auto' ,marginLeft:20}}>
                              <Typography variant="h6" gutterBottom>
                                  Paciente: {reserva.paciente.nombre} {reserva.paciente.apellidos}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                  Fecha de Reserva: {reserva.fechaRegistro.join('/')}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                  Nro de Cita: {reserva.idReserva}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                  Especialidad: {reserva.horario.especialidad.nombre}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                  Precio de Consulta: {reserva.precio}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                  Fecha de Cita: {reserva.horario.fechaRegistro.join('/')}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                  Hora de Cita: {reserva.horario.horaInicio}
                              </Typography>

                          </div>
                      </Paper>
                  ))}
              </Carousel>
          </div>
      </div></>
  );
}