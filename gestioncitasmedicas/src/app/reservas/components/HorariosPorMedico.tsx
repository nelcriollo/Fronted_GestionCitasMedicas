"use client"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Avatar, Button, Pagination } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HorarioService from "@/app/Horario/service/HorarioService";
import Horario from "@/app/Horario/model/Horario";
import { deepPurple } from "@mui/material/colors";
import { AuthContext } from "@/app/AuthContext";
import Especialidad from "@/app/especialidades/model/Especialidad";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';


interface ListHorariosMedicosComponentProps {
  onNextStep: () => void;
  onPreviousStep: () => void;
  especialidadSeleccionada: Especialidad | null;
}

const itemsPerPage = 6; // Número de elementos por página

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 70,
  lineHeight: '60px',
}));

const buttonStyles = {
  selectedButton: {
    backgroundColor: "<color_seleccionado>",
    color: "<color_texto_seleccionado>",
  },
  button: {
    backgroundColor: "black",
    color: "white",
  },
};


export const ListHorariosMedicosComponent = ({ onNextStep, onPreviousStep }: ListHorariosMedicosComponentProps) => {

  const { especialidadSeleccionada, setEspecialidadSeleccionada,horarioSeleccionado, setHorarioSeleccionado} = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 
  const horarioService = new HorarioService();
  //const { horarioSeleccionado, setHorarioSeleccionado } = useContext(AuthContext);
  const [horarios, setHorarios] = useState<Horario[]>([]);

  const handleHorarioClick = (horario: Horario) => {
    const horarioSeleccionado = { ...horario, medico: { ...horario.medico } };
    setHorarioSeleccionado(horarioSeleccionado);
    console.log('Horario seleccionado:', horarioSeleccionado);
    onNextStep();
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const medicosEspecialidad = especialidadSeleccionada
  ? horarios.filter((horario) => horario.especialidad.idEspecialidad === especialidadSeleccionada.idEspecialidad && horario.estado === 0)
  : [];
console.log("medicos con las especialidades",medicosEspecialidad);

  const horariosPaginados = medicosEspecialidad.slice(startIndex, endIndex);



  useEffect(() => {
    const obtenerHorarios = async () => {
      try {
        const response = await horarioService.getHorarios();
        setHorarios(response);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerHorarios();
  }, []);

  function mostrarMedicosConHorarios(medicosEspecialidad: Horario[]) {
    const medicosAgrupados: { [key: string]: { medico: any, fechas: { [key: string]: any[] } } } = {};
  
    medicosEspecialidad
    .filter((horario) => horario.estado === 0)
    .forEach((horario) => {
      const medico = horario.medico;
      const fechaRegistro = horario.fechaRegistro.join('/');
  
      if (!medicosAgrupados[medico.idMedico]) {
        medicosAgrupados[medico.idMedico] = {
          medico: {
            idMedico: medico.idMedico,
            nombre: medico.nombre,
            apellidos: medico.apellidos,
          },
          fechas: {},
        };
      }
  
      if (!medicosAgrupados[medico.idMedico].fechas[fechaRegistro]) {
        medicosAgrupados[medico.idMedico].fechas[fechaRegistro] = [];
      }
  
      medicosAgrupados[medico.idMedico].fechas[fechaRegistro].push({
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
        idHorario: horario.idHorario,
        idMedico: medico.idMedico,
      nombre: medico.nombre,
      apellidos: medico.apellidos,
      medico: { ...medico }, 
    
      });
    });
  
    for (const medicoId in medicosAgrupados) {
      if (medicosAgrupados.hasOwnProperty(medicoId)) {
        const medicoData = medicosAgrupados[medicoId];
        const medico = medicoData.medico;
        const fechas = medicoData.fechas;
  
        console.log(`Médico: ${medico.nombre}`);
        console.log('---');
  
        for (const fecha in fechas) {
          if (fechas.hasOwnProperty(fecha)) {
            console.log(`Fecha de registro: ${fecha}`);
            console.log('Horarios:');
            fechas[fecha].forEach((horario: any) => {
              console.log(`- ${horario.horaInicio} - ${horario.idHorario} `);
            });
            console.log('---');
          }
        }
      }
    }
  
    return medicosAgrupados;
  }
  
  const medicosConHorarios = mostrarMedicosConHorarios(medicosEspecialidad);

  

const [selectedFecha, setSelectedFecha] = useState('');
const [selectedHorarios, setSelectedHorarios] = useState<{ [medicoId: string]: { [fecha: string]: any[] } }>({});

const handleFechaClick = (medicoId: string, fecha: string, horarios: any[]) => {
  setSelectedFecha(fecha);
  setSelectedHorarios({
    ...selectedHorarios,
    [medicoId]: {
      [fecha]: horarios,
    },
  });
  
};


return (
  <Grid container spacing={2} justifyContent="center">
  <Grid item xs={8}>
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.white',
        display: 'grid',
        gridTemplateColumns: { md: '1fr 1fr ' },
        gap: 2,
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {Object.values(medicosConHorarios).map((medicoData: any) => (
        <div key={medicoData.medico.idMedico} style={{ backgroundColor: '', margin: 2, padding: 2 }}>
          <Card sx={{ display: 'flex', bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', background: '', alignItems: 'center' }}>
              <CardContent sx={{ flex: '3 0 auto', bgcolor: '' }}>
              <Avatar className="avatar" sx={{ bgcolor: deepPurple[900], borderRadius: 0, padding: 5 }}>
                Dr@.  {medicoData.medico.nombre}
                <br />
                {medicoData.medico.apellidos.split(' ')[0]}
              </Avatar>

              <style jsx>{`
                .avatar {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  text-align: center;
                }
              `}</style>
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', background: '', alignItems: 'center' }}>
                <Box sx={{ background: 'transparent' }}>
                  {Object.entries(medicoData.fechas).map(([fecha, horarios]: [string, unknown]) => {
                    if (!Array.isArray(horarios)) {
                      return null;
                    }

                    const handleClickFecha = (fecha: string) => {
                      setSelectedFecha(fecha);
                    };

                    return (
                        <Button
                          key={fecha}
                          style={{  fontSize: '12px', margin: '2px', padding:3,color: 'white' }}
                          sx={
                            selectedFecha === fecha ? {
                                  backgroundColor: "<color_seleccionado>",
                                  color: "<color_texto_seleccionado>",
                                }
                              : {
                                  backgroundColor: "blueviolet",
                                  color: "white",
                                }
                          }
                          variant="contained"
                          onClick={() => handleClickFecha(fecha)}
                        >
                          {fecha}
                        </Button>
                    );
                  })}
                </Box>
                {selectedFecha && selectedFecha in medicoData.fechas && (
                  <Box sx={{ background: '', padding: 2 }}>
                    {medicoData.fechas[selectedFecha].map((horario: any, index: number) => (
                      <button
                        style={{ padding: 3, margin: 2, background: 'black', color: 'white' }}
                        key={index}
                        onClick={() => handleHorarioClick(horario)}
                      >
                        {horario.horaInicio}
                 
                      </button>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Box>
          </Card>
        </div>
      ))}
    </Box>

    <Pagination
      count={Math.ceil(horariosPaginados.length / itemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      variant="outlined"
      shape="rounded"
      sx={{ mt: 2, justifyContent: 'center' }}
    />
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
</Grid>

  );
}

