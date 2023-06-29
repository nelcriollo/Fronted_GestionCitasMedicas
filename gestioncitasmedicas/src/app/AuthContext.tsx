import { createContext, useState, ReactNode, FC, useEffect, Dispatch, SetStateAction, useMemo } from 'react';
import Especialidad from './especialidades/model/Especialidad';
import Horario from './Horario/model/Horario';
import Paciente from './paciente/model/Paciente';
import Usuario from './usuarios/model/Usuario';

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
  loginResponse: Usuario | null; 
  setLoginResponse: Dispatch<SetStateAction<Usuario | null>>; 

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
  const [loginResponse, setLoginResponse] = useState<Usuario | null>(null);


  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

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

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

