"use client"
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import ReservaService from '../service/ReservaService';
import ReservaCita from '../model/ReservaCita';
import { AuthContext } from '@/app/AuthContext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Horario from '@/app/Horario/model/Horario';
import Paciente from '@/app/paciente/model/Paciente';


interface RegistrarReservaComponentProps {
    onNextStep: () => void;
    onPreviousStep: () => void;
}

export const RegistrarReservaComponent = ({ onNextStep,
  onPreviousStep
}: RegistrarReservaComponentProps) => {
  const { especialidadSeleccionada, horarioSeleccionado, pacienteRegistrado,loginResponse } = useContext(AuthContext);
  const reservaService = new ReservaService();

  console.log("desde registrp reserva",especialidadSeleccionada?.precioConsulta);
  console.log("desde registrp horario",horarioSeleccionado);
  console.log("desde registrp horario",pacienteRegistrado);

  const [reserva, setReserva] = useState<ReservaCita>({
    idReserva: 0,
    fechaRegistro: new Date(),
    precio: especialidadSeleccionada?.precioConsulta || 0.0,
    estado: 0,
    usuario: loginResponse,
    horario: horarioSeleccionado,
    paciente: pacienteRegistrado,

  });


  const handleRegistrarReserva = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await reservaService.createReserva(reserva);
      console.log('Reserva registrada:', response);
      
  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loginResponse) {
      setReserva((prevReserva) => ({
        ...prevReserva,
        usuario: { idUsuario: loginResponse.idUsuario },
        
      }));
      
    }
  }, [loginResponse]);

  console.log("desde registrp reserva",reserva.usuario.idUsuario);

  return (
    <Grid container spacing={1} style={{ marginTop: 10 }}>
      <Container maxWidth="md" sx={{ backgroundColor: '', padding: 4 }}>
        <Typography variant="h5" component="h1" align="center" sx={{ marginBottom: '10px' }}>
          Registro de Reserva
        </Typography>
        <form onSubmit={handleRegistrarReserva}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="date"
                label="Fecha de Registro"
                fullWidth
                value={reserva.fechaRegistro ? reserva.fechaRegistro.toISOString().split('T')[0] : ''}
                onChange={(event) =>
                  setReserva({ ...reserva, fechaRegistro: new Date(event.target.value) })
                }
                sx={{ marginBottom: '16px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Precio"
                fullWidth
                value={reserva.precio}
                onChange={(event) =>
                  setReserva({ ...reserva, precio: parseFloat(event.target.value) })
                }
                sx={{ marginBottom: '16px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado"
                fullWidth
                value={reserva.estado}
                onChange={(event) =>
                  setReserva({ ...reserva, estado: parseInt(event.target.value) })
                }
                sx={{ marginBottom: '16px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="ID de Usuario"
                fullWidth
                value={reserva.usuario.idUsuario}
                onChange={(event) =>
                  setReserva({
                    ...reserva,
                    usuario: { ...reserva.usuario, idUsuario: parseInt(event.target.value) },
                  })
                }
                sx={{ marginBottom: '16px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="ID de Horario"
                fullWidth
                value={reserva.horario.idHorario}
                onChange={(event) =>
                  setReserva({
                    ...reserva,
                    horario: { ...reserva.horario, idHorario: parseInt(event.target.value) },
                  })
                }
                sx={{ marginBottom: '16px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="ID de Paciente"
                fullWidth
                value={reserva.paciente.idPaciente}
                onChange={(event) =>
                  setReserva({
                    ...reserva,
                    paciente: { ...reserva.paciente, idPaciente: parseInt(event.target.value) },
                  })
                }
                sx={{ marginBottom: '16px' }}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '12px' }}>
            Registrar Reserva
          </Button>
        </form>
      </Container>

      <Grid container spacing={2} style={{ margin: 2, background: '', justifyContent: 'center' }}>
        <Grid item xs={10} style={{ display: 'flex', justifyContent: 'end', background: '' }}>
          <Button
            onClick={onPreviousStep}
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ padding: '5px', backgroundColor: 'black' }}
            startIcon={<SkipPreviousIcon />}
          >
            Regresar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};