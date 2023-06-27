"use client"
import PacienteService from '../service/PacienteService';
import { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import Paciente from '../model/Paciente';

export  const RegistrarPacienteComponent = () => {

    const pacienteService = new PacienteService();

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
   

   useEffect(() => {
        const obtenerPaciente = async (id:number) => {
          try {
            const response = await pacienteService.buscarPaciente(id);
            setPaciente(response);
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        };
    
        obtenerPaciente(2);
      }, []);

  
      const handleRegistrarPaciente = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        try {
          const response =  await pacienteService.createPaciente(paciente);
      
         //if(response) router.push('/usuarios/login');
         //else router.push('usuarios/createUser');
        } catch (error) {
          // Manejar errores de la solicitud
          console.error(error);
        }
      };

     

  return (
<Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', marginTop:15 }}>
      <form onSubmit={handleRegistrarPaciente}>
        <Typography variant="h5" component="h1" align="center" sx={{ marginBottom: '10px' }}>
          Registro de Usuario
        </Typography>
        
          <TextField
          type="text"
          label="idPaciente"
          fullWidth
          value={paciente.idPaciente}
          onChange={(event) => setPaciente({ ...paciente, idPaciente: parseInt(event.target.value) })}
          sx={{ marginBottom: '10px' }}
        />
          <TextField
          type="text"
          label="nombre"
          fullWidth
          value={paciente.nombre}
          onChange={(event) => setPaciente({ ...paciente, nombre: event.target.value })}
          sx={{ marginBottom: '16px' }}
        />
         <TextField
          type="text"
          label="apellidos"
          fullWidth
          value={paciente.apellidos}
          onChange={(event) => setPaciente({ ...paciente, apellidos: event.target.value })}
          sx={{ marginBottom: '16px' }}
        />
       
        <TextField
          type="text"
          label="nroDocumento"
          fullWidth
          value={paciente.nroDocumento}
          onChange={(event) => setPaciente({ ...paciente, nroDocumento: event.target.value })}
          sx={{ marginBottom: '16px' }}
        />
          <TextField
          type="email"
          label="email"
          fullWidth
          value={paciente.email}
          onChange={(event) => setPaciente({ ...paciente, email: event.target.value })}
          sx={{ marginBottom: '10px' }}
        />
           <TextField
          type="text"
          label="telefono"
          fullWidth
          value={paciente.telefono}
          onChange={(event) => setPaciente({ ...paciente, telefono: event.target.value })}
          sx={{ marginBottom: '10px' }}
        />
             <TextField
          type="text"
          label="estado"
          fullWidth
          value={paciente.estado}
          onChange={(event) => setPaciente({ ...paciente, estado: parseInt(event.target.value) })}
          sx={{ marginBottom: '16px' }}
        />
     
       
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '12px' }}
        >
          Registrarse
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          component='a'
          href="/usuarios/login"
          fullWidth
          sx={{ marginTop: '12px' }}
        > 
        Regresar
         
        </Button>
      </form>
    </Container>

  );
}