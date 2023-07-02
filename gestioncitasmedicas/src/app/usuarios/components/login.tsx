"use client";
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button } from '@mui/material';
import AuthenCredentials  from '../model/UsuarioLogin';
import UsuarioService from '../services/UsuarioService';
import { AuthContext } from '@/app/AuthContext';


export const LoginComponent = () => {

  const {setLoggedIn,loginResponse, setLoginResponse } = useContext(AuthContext);
  const router = useRouter();
  const usuarioService = new UsuarioService();
  const [credentials, setCredentials] = useState<AuthenCredentials>({
    email: '',
    password: ''
  });

  console.log(loginResponse);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
    
    const response =  await usuarioService.login(credentials);
    console.log(response);
    router.push('/');
    setLoggedIn(true);
    setLoginResponse(response);
    console.log(response);

  } catch (error) {
    console.error('ocurrio un error',error);
    router.push('usuarios/login');
  }
};


  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" align="center" sx={{ marginBottom: '16px' }}>
          Iniciar sesión
        </Typography>
        <TextField
          type="email"
          label="Correo electrónico"
          fullWidth
          value={credentials.email}
          onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          type="password"
          label="Contraseña"
          fullWidth
          value={credentials.password}
          onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
          sx={{ marginBottom: '16px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '16px' }}
        >
          Iniciar sesión
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
        component='a'
        href="/usuarios/createUser"
          fullWidth
          sx={{ marginTop: '16px' }}
        >
          Registrarse
        </Button>

      </form>

    </Container>
 
  );
};