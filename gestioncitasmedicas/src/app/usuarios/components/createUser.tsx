"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import UsuarioService from '../services/UsuarioService';
import  Usuario  from '../model/Usuario';

export  const CreateUserComponent = () => {

  const router = useRouter();
  const usuarioService = new UsuarioService();
  const [usuario, setUsuario] = useState<Usuario>({
    idUsuario : 0,
    nombre    : "",
    apellidos : "",
    email     : "",
    password  : "",
    estado    : 0
  });

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const response =  await usuarioService.createUser(usuario);

   if(response) router.push('/usuarios/login');
   else router.push('usuarios/createUser');
  } catch (error) {
    // Manejar errores de la solicitud
    console.error(error);
  }
};


  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', marginTop:15 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" component="h1" align="center" sx={{ marginBottom: '10px' }}>
          Registro de Usuario
        </Typography>
        
          <TextField
          type="text"
          label="nombre"
          fullWidth
          value={usuario.nombre}
          onChange={(event) => setUsuario({ ...usuario, nombre: event.target.value })}
          sx={{ marginBottom: '10px' }}
        />
          <TextField
          type="text"
          label="apellidos"
          fullWidth
          value={usuario.apellidos}
          onChange={(event) => setUsuario({ ...usuario, apellidos: event.target.value })}
          sx={{ marginBottom: '16px' }}
        />
          <TextField
          type="email"
          label="email"
          fullWidth
          value={usuario.email}
          onChange={(event) => setUsuario({ ...usuario, email: event.target.value })}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          type="password"
          label="Contraseña"
          fullWidth
          value={usuario.password}
          onChange={(event) => setUsuario({ ...usuario, password: event.target.value })}
          sx={{ marginBottom: '10px' }}
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