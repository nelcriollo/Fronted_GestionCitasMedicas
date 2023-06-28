"use client"
import { useContext, useState } from "react";
import { ListEspecialidadesComponent } from "../../especialidades/components/especialidades";
import { ListHorariosMedicosComponent } from "../components/HorariosPorMedico";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { AuthContext } from "@/app/AuthContext";
import { RegistrarPacienteComponent } from "@/app/paciente/components/Paciente";
//import { RegistrarPacienteComponent } from "@/app/paciente/components/Paciente";


const steps = [
  'Servicio',
  'Especialidad',
  'Doctor',
  'Registro'
];

export default  function Reservas(){

  const { especialidadSeleccionada } = useContext(AuthContext);

  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <ListEspecialidadesComponent onNextStep={handleNextStep} />;
      case 1:
       return <ListHorariosMedicosComponent 
              especialidadSeleccionada={especialidadSeleccionada} 
              onNextStep={handleNextStep} onPreviousStep={handlePreviousStep}/>
      case 2:
          return <RegistrarPacienteComponent />;
        default:
          return null;
    }
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div>{renderStepComponent()}</div>
    </>
  );
}