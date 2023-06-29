"use client"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import EspecialidadService from "../service/EspecialidadService";
import Especialidad from "../model/Especialidad";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {styled } from '@mui/material/styles';
import { Pagination } from "@mui/material";
import { AuthContext } from "@/app/AuthContext";



const itemsPerPage = 12; 

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 70,
    lineHeight: '60px',
  }));
  

  interface ListEspecialidadesComponentProps {
    onNextStep: () => void;
  }

export  const ListEspecialidadesComponent =  ({ onNextStep }: ListEspecialidadesComponentProps) => {

      const {  setEspecialidadSeleccionada} = useContext(AuthContext);

    const [currentPage, setCurrentPage] = useState(1);
    const especialidadService = new EspecialidadService();
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  

    const handleEspecialidadClick = (especialidad:Especialidad) => {
  
        console.log('Especialidad seleccionada:', especialidad);
        // almacenar la especialidad seleccionada en el estado
        setEspecialidadSeleccionada(especialidad);
       onNextStep();
      };

      const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
      };
      
    
      // Obtener los índices de inicio y fin de la página actual
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
    
      // Obtener la lista de especialidades para la página actual
      const especialidadesPaginadas = especialidades.slice(startIndex, endIndex);
    
      
  
    useEffect(() => {
      const obtenerEspecialidades = async () => {
        try {
          const response = await especialidadService.getEspecialidades();
          setEspecialidades(response);
        } catch (error) {
          console.error(error);
        }
      };
  
      obtenerEspecialidades();
    }, []);

    return (
<Grid container spacing={2} justifyContent="center">
  <Grid item xs={8}>
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.transparent',
        display: 'grid',
        gridTemplateColumns: { md: '1fr 1fr 1fr' },
        gap: 2,
        justifyContent: 'center',
        cursor: 'pointer',
      
      }}
    >
      {especialidadesPaginadas.map((especialidad) => (
        <div
          key={especialidad.idEspecialidad}
          onClick={() => handleEspecialidadClick(especialidad)}

          style={{
            backgroundColor: 'black',
            borderLeft: '2px solid black',
            borderRight: '2px solid white',
            borderTop: '3px solid white',
            borderBottom: '5px solid black',
            borderRadius: '0px',
            cursor: 'pointer',
    
          }}
        >
          <Item  style={{
            backgroundColor: '#0F294F',
            borderLeft: '5px solid white',
            borderRight: '2px solid white',
            borderTop: '3px solid white',
            borderBottom: '5px solid white',
            borderRadius: '0px',
            color: '#FFFFFF',
            padding: '10px',
            textAlign: 'center',
            cursor: 'pointer',
          }}>
            {especialidad.nombre}
          </Item>
        </div>
      ))}
    </Box>
    <Pagination
          count={Math.ceil(especialidades.length / itemsPerPage)} // Número total de páginas
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{ mt: 2, justifyContent: 'center' }}
        />
  </Grid>
</Grid>

    );
}


