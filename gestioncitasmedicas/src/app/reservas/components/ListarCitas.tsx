"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import UsuarioService from '@/app/usuarios/services/UsuarioService';
import ReservasUsuario from '../model/ReservasUsuario';
import { Typography } from '@mui/material';

export const  ListarCitasComponent = ()=> {

    const [citas, setCitas] = React.useState<ReservasUsuario>();

    const citasService = new UsuarioService();
    
    React.useEffect(() => {
        const obtenerCitas = async () => {
          try {
            const response = await citasService.obtenerCitasPorUsuario(6);
            setCitas(response);
            console.log("listando reservas", response);
          } catch (error) {
            console.error(error);
          }
        };
    
        obtenerCitas();
      }, []); 
    
  return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
            }}
            >
            {citas?.reservasDtos.map((reserva, index) => (
                <Paper key={reserva.idReserva} elevation={3} sx={{ padding: '20px' }}>
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
                <Typography variant="body1" gutterBottom>
                    Médico: {reserva.horario.medico.nombre} {reserva.horario.medico.apellidos}
                </Typography>
                </Paper>
            ))}
            </Box>
  );
}