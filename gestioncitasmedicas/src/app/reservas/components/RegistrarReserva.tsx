"use client"

import {  useContext, useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

import { AuthContext } from '@/app/AuthContext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import ReservaCita from '@/app/reservas/model/ReservaCita';
import ReservaService from '@/app/reservas/service/ReservaService';
import { useRouter } from 'next/navigation';
import PacienteService from '@/app/paciente/service/PacienteService';
import Paciente from '@/app/paciente/model/Paciente';
import { RegistrarPacienteDialog } from '@/app/paciente/components/registrarPaciente';


interface RegistrarReservaComponentProps {
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export  const RegistrarReservaComponent = ({ onNextStep, onPreviousStep }: RegistrarReservaComponentProps) => {
    const router = useRouter();
    const pacienteService = new PacienteService();
    const [nroDocumentoBuscar, setNroDocumentoBuscar] = useState("");
    const [pacienteEncontrado, setPacienteEncontrado] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [nuevoDocumentoRegistrado, setNuevoDocumentoRegistrado] = useState("");
    
  

    const { especialidadSeleccionada, horarioSeleccionado,pacienteRegistrado,setPacienteRegistrado,loginResponse } = useContext(AuthContext);
    

    const [paciente, setPaciente] = useState<Paciente>({
        idPaciente : 0,
        nombre    : "",
        apellidos : "",
        fechaNacimiento : new Date(), 
        nroDocumento  : "",
        email : "",
        telefono: "",
        estado    : 0
      });

        const obtenerPaciente = async (dni:string) => {
          try {

            const response = await pacienteService.buscarPacientePorDni(dni);
            const parsedFechaNacimiento = response.fechaNacimiento ? new Date(response.fechaNacimiento) : null;
            
            setPaciente({ ...response, fechaNacimiento: parsedFechaNacimiento });
            setPacienteEncontrado(true);
            setPacienteRegistrado(response);
            console.log("PACIENTE ENCONTRADO",response);
           
        } catch (error) {
            console.error(error);
            setPacienteEncontrado(false);
            setPacienteRegistrado(null);
          }
        };

        const handleLimpiarDocumentoBuscar = () =>{
          setNroDocumentoBuscar("");
        };
    
        const handleOpenDialog = () => {
          setOpenDialog(true);
          handleLimpiarDocumentoBuscar();
        };

        const handleNuevoDocumentoRegistrado = (documento: string) => {
          setNuevoDocumentoRegistrado(documento);
          console.log("Registro exitosoe:", documento);
        };
  
        useEffect(() => {
          if (nuevoDocumentoRegistrado) {
            obtenerPaciente(nuevoDocumentoRegistrado);
          }
        }, [nuevoDocumentoRegistrado]);

        //proceso para registrar la reserva
    const reservaService = new ReservaService();

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
      router.push("/")
      
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

  return (

    <Grid container spacing={1} style={{ marginTop:10,}}>
          <Grid item xs={3}>
            <div style={{ backgroundColor: 'darkkhaki', padding: 10, borderEndEndRadius: 50, borderTopRightRadius: 50, justifyContent: 'center', textAlign: 'center' }}>
                <h2>Especialidad Seleccionada</h2>
                <p>Especialidad: {especialidadSeleccionada?.nombre}</p>
                <p>Precio de Consulta: {especialidadSeleccionada?.precioConsulta}</p>

                <h2>Medico</h2>
                  <p>Médico: {horarioSeleccionado?.medico.nombre}</p>
                <p>Apellidos: {horarioSeleccionado?.medico.apellidos}</p>

                <h2>Horario</h2>
                <p>Hora: {horarioSeleccionado?.horaInicio}</p>
            </div>
        </Grid>
      <Grid item xs={8}>
      <Container maxWidth="md" sx={{backgroundColor:'',padding:4 }}>
          <Grid container spacing={2} style={{ alignContent: 'center'}}>
            <Grid item xs={6}>
              <TextField
                type="text"
                label="Buscar por nro de cocumento"
                fullWidth
                value={nroDocumentoBuscar}
                onChange={(event) => setNroDocumentoBuscar(event.target.value)}
                sx={{ marginBottom: '16px' }} />

            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                variant="contained"
                color="info"
                sx={{ marginTop: '5px' }}
                onClick={() => obtenerPaciente(nroDocumentoBuscar)}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
          {pacienteEncontrado ? (
            <><form>
              <Typography variant="h5" component="h1" align="center" sx={{ marginBottom: '10px', marginTop: 5 }}>
                Datos del Paciente.
              </Typography>
              <Grid container spacing={2}>

                <Grid item xs={4}>
                  <TextField
                    type="text"
                    label="nombre"
                    fullWidth
                    value={paciente.nombre}
                    onChange={(event) => setPaciente({ ...paciente, nombre: event.target.value })}
                    sx={{ marginBottom: '16px' }} />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="text"
                    label="apellidos"
                    fullWidth
                    value={paciente.apellidos}
                    onChange={(event) => setPaciente({ ...paciente, apellidos: event.target.value })}
                    sx={{ marginBottom: '16px' }} />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="date"
                    label="fechaNacimiento"
                    fullWidth
                    value={paciente.fechaNacimiento ? paciente.fechaNacimiento.toISOString().split('T')[0] : ''}
                    onChange={(event) => setPaciente({ ...paciente, fechaNacimiento: new Date(event.target.value) })}
                    sx={{ marginBottom: '16px' }} />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="text"
                    label="nroDocumento"
                    fullWidth
                    value={paciente.nroDocumento}
                    onChange={(event) => setPaciente({ ...paciente, nroDocumento: event.target.value })}
                    sx={{ marginBottom: '16px' }} />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="email"
                    label="email"
                    fullWidth
                    value={paciente.email}
                    onChange={(event) => setPaciente({ ...paciente, email: event.target.value })}
                    sx={{ marginBottom: '10px' }} />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="text"
                    label="telefono"
                    fullWidth
                    value={paciente.telefono}
                    onChange={(event) => setPaciente({ ...paciente, telefono: event.target.value })}
                    sx={{ marginBottom: '10px' }} />
                </Grid>
              </Grid>
            </form><Grid item xs={2}>

                <form onSubmit={handleRegistrarReserva}>
                  <Button
                    name="Registrarse"
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ marginTop: '12px' }}
                  >
                    Reservar Cita
                  </Button>
                </form>
              </Grid></>
          ) : (  
           
            <Grid item xs={2}>
              <span>
                Si es un paciente nuevo registrese
              </span>
                <Button
                  name="Registrarse"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: '12px' }}
                  onClick={handleOpenDialog}  //mostramos el dialog
                  
                >
                  Registrarse
                </Button>          
            </Grid>
          )}

            {openDialog && (
                  <RegistrarPacienteDialog open={openDialog}
                   onClose={() => setOpenDialog(false)} 
                    onRegistroExitoso={handleNuevoDocumentoRegistrado}  />
             )}
        </Container>
        </Grid>
        <Grid container spacing={2} style={{ margin: 2, background:'',justifyContent:'center' }}>
          <Grid item xs={10} style={{ display: 'flex', justifyContent: 'end',background:'' }}>
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
}

