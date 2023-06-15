import { createContext, useState, ReactNode, FC, useEffect } from 'react';

// Crea el contexto
export const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {},
});

// Crea el proveedor del contexto
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  // Resto del código del proveedor de autenticación

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};