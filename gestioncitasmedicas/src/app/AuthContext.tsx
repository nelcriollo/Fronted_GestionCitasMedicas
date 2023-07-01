import { createContext, useState, ReactNode, FC, Dispatch, SetStateAction, useMemo } from 'react';
import Especialidad from './especialidades/model/Especialidad';
import Horario from './Horario/model/Horario';
import Paciente from './paciente/model/Paciente';
import LoginResponse from './usuarios/model/loginResponse';

// Crea el contexto
export const AuthContext = createContext<{
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  especialidadSeleccionada: Especialidad | null;
  setEspecialidadSeleccionada: Dispatch<SetStateAction<Especialidad | null>>;
  horarioSeleccionado: Horario | null;
  setHorarioSeleccionado: Dispatch<SetStateAction<Horario | null>>;
  pacienteRegistrado: Paciente | null; 
  setPacienteRegistrado: Dispatch<SetStateAction<Paciente | null>>; 
  loginResponse: LoginResponse | null; 
  setLoginResponse: Dispatch<SetStateAction<LoginResponse | null>>; 

}>({
  loggedIn: false,
  setLoggedIn: () => {},
  especialidadSeleccionada: null,
  setEspecialidadSeleccionada: () => {},
  horarioSeleccionado: null,
  setHorarioSeleccionado: () => {},
  pacienteRegistrado: null, 
  setPacienteRegistrado: () => {}, 
  loginResponse: null,
  setLoginResponse: () => {},

});

// Crea el proveedor del contexto
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<Especialidad | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<Horario | null>(null);
  const [pacienteRegistrado, setPacienteRegistrado] = useState<Paciente | null>(null); 
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(null);


  const contextValue = useMemo(() => {
    return {
      loggedIn,
      setLoggedIn,
      especialidadSeleccionada,
      setEspecialidadSeleccionada,
      horarioSeleccionado,
      setHorarioSeleccionado,
      pacienteRegistrado, 
      setPacienteRegistrado, 
      loginResponse,
      setLoginResponse,
    };
  }, [loggedIn, especialidadSeleccionada, horarioSeleccionado,pacienteRegistrado,loginResponse]);

  console.log(horarioSeleccionado);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

