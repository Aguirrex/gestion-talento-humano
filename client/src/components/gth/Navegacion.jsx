import React, { useEffect } from 'react';
import { Toolbar, Typography, Button, Stack, Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Hail as HailIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { LinkCustom } from '../common/Personalizados';
import { useUsuarioContext } from '../../customHooks/UsuarioProvider';
import { setTokenUsuario } from '../../tools/connectionApi';

import logo from '../../assets/logo.png';


const opcionesMenuLateral = [
  {icono: HailIcon, texto: 'Selección', children: [
    {icono: HailIcon, texto: 'Vacantes', ruta: '/gth/seleccion/vacantes'},
    {icono: HailIcon, texto: 'Candidatos', ruta: '/gth/seleccion/candidatos'},
    {icono: HailIcon, texto: 'Entrevistas', ruta: '/gth/seleccion/entrevistas'},
  ]},
  {icono: HailIcon, texto: 'Empleados', usuarios: ['RH'], children: [
    {icono: HailIcon, texto: 'Listado', ruta: '/gth/empleados/listado'},
    {icono: HailIcon, texto: 'Contratos', ruta: '/gth/empleados/contratos'},
    {icono: HailIcon, texto: 'Novedades', ruta: '/gth/empleados/novedades'},
  ]},
  {icono: HailIcon, texto: 'Nómina', ruta: '/gth/nomina'},
  {icono: HailIcon, texto: 'Liquidación', ruta: '/gth/liquidacion'},
  {icono: HailIcon, texto: 'Certificados', ruta: '/gth/certificados'},
];

var menuLateralInicial = {};

opcionesMenuLateral
  .filter(opcion => opcion.children?.length > 0)
  .forEach((opcion, index) => menuLateralInicial[index] = false);


const getTituloPorRuta = (opciones, ruta) => {
  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i]?.ruta === ruta) return opciones[i].texto;
    if (opciones[i]?.children) return getTituloPorRuta(opciones[i].children, ruta);
    return 'GTH'
  }
};



const Navegacion = () => {

  const { usuario, setUsuario } = useUsuarioContext();
  const refBarraSuperior = React.useRef({ clientHeight: 48});
  const navigate = useNavigate();
  const [menuLateral, setMenuLateral] = React.useState(menuLateralInicial);
  const location = useLocation();
  const [titulo, setTitulo] = React.useState('GTH');

  const cerrarSesion = () => {
    setUsuario(null);
    setTokenUsuario(null);
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    const newTitulo = getTituloPorRuta(opcionesMenuLateral, location.pathname);
    setTitulo(newTitulo);
  }, [location]);

  return (
    <>
      <Box 
        width='100%'
        bgcolor='background.paper'
        borderBottom={theme => `1px solid ${theme.palette.grey['300']}`}
        ref={refBarraSuperior}>

        <Toolbar variant='dense'>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <img src={logo} alt='logo' style={{ width: 30, height: 30 }} />
            <Typography 
              component='h1' 
              sx={{ color: 'primary.dark', flexGrow: 1, fontSize: '1.4em', fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
              {titulo}
            </Typography>
          </Stack>

          <Stack direction='row' sx={{ ml: 'auto' }}>
            <Button 
              variant='text' 
              size='small' 
              color='primary'
              onClick={cerrarSesion}>
              Cerrar sesión
            </Button>
          </Stack>

        </Toolbar>

      </Box>

      <Box
        sx={{ 
          display: 'flex', 
          height: `calc(99vh - ${refBarraSuperior.current?.clientHeight}px)`,
          overflowX: 'auto' }}>

        <List
          component='nav'
          sx={{ 
            width: '100%', 
            maxWidth: '300px', 
            display: { xs: 'none', md: 'block' }, 
            height: '100%',
            bgcolor: 'background.paper',
            borderRight: theme => `1px solid ${theme.palette.grey['300']}` }}>

          {opcionesMenuLateral.map((opcion, index) => (opcion?.usuarios === undefined || opcion.usuarios.includes(usuario.tipo)) && (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => setMenuLateral({ ...menuLateralInicial, [index]: !menuLateral?.[index] })}>
                <ListItemIcon>
                  <HailIcon />
                </ListItemIcon>
                <ListItemText primary={opcion.texto} />
                {opcion.children && (
                  <ListItemIcon>
                    {menuLateral?.[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemIcon>
                )}
              </ListItemButton>
              {opcion.children && (
                <Collapse in={menuLateral?.[index]} timeout='auto' unmountOnExit>
                  <List component='div' dense disablePadding>
                    {opcion.children.map((subOpcion, subIndex) => (
                      <ListItemButton key={subIndex} component={LinkCustom} to={subOpcion.ruta} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <HailIcon />
                        </ListItemIcon>
                        <ListItemText primary={subOpcion.texto} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}

        </List>

        <Outlet />

      </Box>
      
    </>
  );
};

export default Navegacion;