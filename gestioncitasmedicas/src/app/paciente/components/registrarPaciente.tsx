"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paciente from '../model/Paciente';
import { useState } from 'react';
import PacienteService from '../service/PacienteService';
import { Grid } from '@mui/material';

interface RegistrarPacienteDialogProps {
    open: boolean;
    onClose: () => void;
    onRegistroExitoso: (documento: string) => void;
  }

export const  RegistrarPacienteDialog = ({ open, onClose,onRegistroExitoso }: RegistrarPacienteDialogProps) => {

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
    
      const handleClose = () => {
        onRegistroExitoso(paciente.nroDocumento);
        console.log(paciente.nroDocumento);
        onClose();
      };

      const handleRegistrarPaciente = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        try {
          const response =  await pacienteService.createPaciente(paciente);

          const nuevoPaciente = response;
          console.log(nuevoPaciente);
          setPaciente(nuevoPaciente);
          handleClose();  
          //onNextStep();  
        } catch (error) {
          console.error(error);
        }
      };



    
      return (
        <div>
    
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Registro de Paciente</DialogTitle>
            <DialogContent>
              <form onSubmit={handleRegistrarPaciente} style={{marginTop:10}}>
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
                value={paciente.fechaNacimiento instanceof Date && !isNaN(paciente.fechaNacimiento.getTime()) ? paciente.fechaNacimiento.toISOString().split('T')[0] : new Date()}
                onChange={(event) => setPaciente({ ...paciente, fechaNacimiento: new Date(event.target.value) })}
                sx={{ marginBottom: '16px' }}/>
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
            <Grid item xs={8}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: '12px' }}          

            >
              Registrarse
            </Button>
            </Grid>
          </form>       
            </DialogContent>
            <DialogActions>
              <Button  onClick={handleClose}>Cancel</Button>           
            </DialogActions>
          </Dialog>
        </div>
      );
    };