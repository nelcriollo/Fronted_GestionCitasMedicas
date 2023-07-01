"use client";
import * as React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import NextLink from 'next/link';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Box
      sx={{
        width: 400,
        marginLeft: 0,
        marginTop: 12,
        padding: 10,
        boxShadow:15,
        borderTopRightRadius:65,
        borderBottomRightRadius:65,
        marginBottom: 0,
        background: 'primary',
        '&:hover': {
          background: 'linear-gradient(90deg, rgba(145,62,27,0.8324579831932774) 0%, rgba(141,135,124,0.2554271708683473) 0%, rgba(103,169,199,1) 0%, rgba(120,186,218,0.7232142857142857) 41%, rgba(145,203,246,1) 99%)',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item sx={{ backgroundColor: '#000000' }}>
            {loggedIn ? (
              <NextLink href="/reservas/registrar" passHref>
                <Button sx={{ backgroundColor: '#000000', color: '#ffffff' }} size="large">
                  Reserva tu Cita Aquí!
                </Button>
              </NextLink>
            ) : (
              <NextLink href="/usuarios/login" passHref>
                <Button sx={{ backgroundColor: '#000000', color: '#ffffff' }} size="large">
                  Reserva tu Cita Aquí!
                </Button>
              </NextLink>
            )}
          </Item>
        </Grid>

        <Grid item xs={6} md={6}>
          <Item sx={{ backgroundColor: '#000000' }}>
            <NextLink href="/especialidades" passHref>
              <Button sx={{ backgroundColor: '#000000', color: '#ffffff' }} size="large">
                Especialidades
              </Button>
            </NextLink>
          </Item>
        </Grid>
        <Grid item xs={6} md={6}>
          <Item sx={{ backgroundColor: '#000000' }}>
            <NextLink href="/medicos" passHref>
              <Button sx={{ backgroundColor: '#000000', color: '#ffffff' }} size="large">
                Médicos
              </Button>
            </NextLink>
          </Item>
        </Grid>
        <Grid item xs={6} md={6}>
          <Item sx={{ backgroundColor: '#000000' }}>
            <NextLink href="/contactanos" passHref>
              <Button sx={{ backgroundColor: '#000000', color: '#ffffff' }} size="large">
                Contactanos
              </Button>
            </NextLink>
          </Item>
        </Grid>
        <Grid item xs={6} md={6}>
          <Item sx={{ backgroundColor: '#000000' }}>
            <NextLink href="/blog" passHref>
              <Button sx={{ backgroundColor: '#000000', color: '#ffffff' }} size="large">
                Blog
              </Button>
            </NextLink>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
