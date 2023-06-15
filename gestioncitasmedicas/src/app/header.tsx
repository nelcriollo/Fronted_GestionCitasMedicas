"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { Button } from '@mui/material';
import { AuthContext } from './AuthContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = [{nombre:'Especialidades',ruta:'/especialidades'},{ nombre:'Medicos',ruta:'/medicos'},{ nombre:'Contactanos',ruta:'/contactanos'}];
const settings = [{nombre:'Perfil',ruta:'/perfil'}, {nombre:'citas',ruta:'/reservas/listar'}, {nombre:'Logout',ruta:'/usuarios/login'}];


export function HeaderAppBar() {

  const { loggedIn, setLoggedIn } = useContext(AuthContext);

/*useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setLoggedIn(true);
  }
}, []);*/

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static" sx={{ mb:5 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <NextLink href="/" passHref style={{textDecoration:'none', color:'#ffffff'}}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GESTIMEDIC
            </Typography>
        </NextLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.nombre}>   
                  <Link key={page.ruta} href={page.ruta} style={{textDecoration:'none'}}> 
                  <Typography textAlign="center" >{page.nombre}</Typography>
                  </Link>      
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GESTIMEDIC
          </Typography>
        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.ruta} href={page.ruta} style={{textDecoration:'none'}}> 
                  <Typography textAlign="center" 
                  style={{ margin: '10px', color: 'white', 
                  display: 'block',textDecoration: 'none',
                  fontFamily:'sans-serif',fontSize:20 }} >{page.nombre}</Typography>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {loggedIn ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user img"> <AccountCircleIcon /></Avatar>
               
                </IconButton>
              </Tooltip>
            ) : (
              <Link href="/usuarios/login">
                <Button color="inherit" >Iniciar sesión</Button>
              </Link>
            )}
           <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu} 
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.nombre} onClick={handleCloseUserMenu}> 
                    {setting.nombre === 'Logout' ? (
                      <Link
                        key={setting.ruta}
                        href={setting.ruta}
                        style={{ textDecoration: 'none' }}
                        onClick={() => {
                          router.push('/usuarios/login');
                          localStorage.removeItem('token');
                          setLoggedIn(false);
                        }}
                      >
                        <Typography textAlign="center">{setting.nombre}</Typography>
                      </Link>
                    ) : (
                      <Link key={setting.ruta} href={setting.ruta} style={{ textDecoration: 'none' }}>
                        <Typography textAlign="center">{setting.nombre}</Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
