import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Container } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';

import logo from '../../assets/logo.png';

const opcionesMenu = [
  { titulo: 'Iniciar Sesión', url: '/login' },
];

const LinkCustom = React.forwardRef((itemProps, ref) => {
  return <LinkRouter ref={ref} {...itemProps} role={undefined} />;
});

const Presentacion = () => {
  return (
    <>
      <AppBar 
        component='nav'
        color='transparent' 
        sx={{ backdropFilter: 'blur(8px)', boxShadow: 'none' }}>
        <Toolbar>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <img src={logo} alt='logo' style={{ width: 30, height: 30 }} />
            <Typography 
              component='div' 
              sx={{ color: 'primary.dark', flexGrow: 1, fontSize: '1.6em', fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
              Gestión Talento Humano
            </Typography>
            <Typography 
              variant='h4' 
              component='h1' 
              sx={{ color: 'primary.dark', fontSize: '1.4em', fontWeight: 'bold', display: { sm: 'none' } }}>
              GH
            </Typography>
          </Stack>

          <Stack direction='row' sx={{ ml: 'auto' }}>
            {opcionesMenu.map((opcion, index) => (
              <Button key={index} variant='contained' component={LinkCustom} to={opcion.url} sx={{ borderRadius: 100 }}>
                {opcion.titulo}
              </Button>
            ))}
          </Stack>

        </Toolbar>
      </AppBar>

      <Container sx={{ mt: { xs: 20, md: 25 }, px: { xs: 3, md: 1 } }} maxWidth='md'>
        <Typography 
          variant='h2' 
          fontWeight='bold' 
          color='primary.main' 
          textAlign='center'>
          {'El mejor partner para '}
          <Typography
            variant='h2' 
            fontWeight='bold' 
            component='span' 
            color='secondary.main'>
            la gestión de talento y nómina
          </Typography>
        </Typography>
        <Typography textAlign='center' variant='subtitle1'>
          Ofrecemos soluciones integrales para el manejo de candidatos, colaboradores, nómina y más.
        </Typography>
      </Container>
    </>
  );
};

export default Presentacion;