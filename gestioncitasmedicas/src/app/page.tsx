"use client";

import * as React from 'react';
import { Box, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Home() {
  return (
    <Box
    sx={{
      width: 450,
      height: 300,
      marginLeft:10,
      marginTop:10, 
      padding:5,
      marginBottom:5,
      backgroundColor: '#ff7043',
      '&:hover': {
        backgroundColor: '#ff8a65',
        opacity: [0.9, 0.8, 0.7],
      },
    }}
  > 
  
  <Grid container spacing={2}>
  <Grid item xs={12} md={12}>
  <Item sx={{backgroundColor: "#000000"}} >
    <Button sx={{backgroundColor: "#000000",color:'#ffffff'}}  size="large"><Link href="#" underline="none">Reserva tu Cita dando click aquí</Link></Button>
    </Item>
  </Grid>
  <Grid item xs={6} md={6}>
  <Item sx={{backgroundColor: "#000000"}} >
    <Button sx={{backgroundColor: "#000000",color:'#ffffff'}}  size="large"><Link href="#" underline="none">Especialidades</Link></Button>
    </Item>
  </Grid>
  <Grid item xs={6} md={6}>
  <Item sx={{backgroundColor: "#000000"}} >
    <Button sx={{backgroundColor: "#000000",color:'#ffffff'}}  size="large"><Link href="#" underline="none">Médicos</Link></Button>
    </Item>
  </Grid>
  <Grid item xs={6} md={6}>
    <Item sx={{backgroundColor: "#000000"}} >
    <Button sx={{backgroundColor: "#000000",color:'#ffffff'}}  size="large"><Link href="#" underline="none">Contactanos</Link></Button>
    </Item>
  </Grid>
  <Grid item xs={6} md={6}>
  <Item sx={{backgroundColor: "#000000"}} >
    <Button sx={{backgroundColor: "#000000",color:'#ffffff'}}  size="large"><Link href="#" underline="none">Blog</Link></Button>
    </Item>
  </Grid>
</Grid>
  
  </Box>
);
}