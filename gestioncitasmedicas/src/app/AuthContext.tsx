import { createContext, useState, ReactNode, FC, useEffect, Dispatch, SetStateAction, useMemo } from 'react';
import Especialidad from './especialidades/model/Especialidad';

// Crea el contexto
export const AuthContext = createContext<{
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  especialidadSeleccionada: Especialidad | null;
  setEspecialidadSeleccionada: Dispatch<SetStateAction<Especialidad | null>>;
}>({
  loggedIn: false,
  setLoggedIn: () => {},
  especialidadSeleccionada: null,
  setEspecialidadSeleccionada: () => {},
});

// Crea el proveedor del contexto
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<Especialidad | null>(null);

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
    };
  }, [loggedIn, especialidadSeleccionada]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};