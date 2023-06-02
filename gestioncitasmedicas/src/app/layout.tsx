import { red } from "@mui/material/colors";
import "./globals.css";
import { HeaderAppBar } from "./header";


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
    <html lang="es">
      
      <body >
        <header>
          <HeaderAppBar />
        </header>
        <main>
          {children}
        </main>
        <footer> </footer>
        </body>
    </html>
  )
}
