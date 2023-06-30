"use client";
import "./globals.css";
import { HeaderAppBar } from "./header";
import { AuthProvider } from "./AuthContext";


export const metadata = {
  title: 'GestiMedic',
  description: 'Gestión de reserva de citas Médicas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

 

  return (
    <AuthProvider>
    <html lang="es">
      
      <body >
        <header>
        <HeaderAppBar/>
        
        </header>
        <main>
          {children}
        </main>
       
        </body>
    </html>
    </AuthProvider>
  )
}
