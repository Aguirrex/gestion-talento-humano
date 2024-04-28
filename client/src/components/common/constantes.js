import { Hail as HailIcon } from '@mui/icons-material';

const tiposUsuario = {
  RH: 'RH',
  GERENCIA: 'GERENCIA',
  PSICOLOGIA: 'PSICOLOGIA',
  CONTABILIDAD: 'CONTABILIDAD'
};

const opcionesMenuLateral = [
  {icono: HailIcon, texto: 'Sucursales', usuarios: [tiposUsuario.RH, tiposUsuario.GERENCIA], ruta: '/gth/sucursales'},
  {icono: HailIcon, texto: 'Cargos', usuarios: [tiposUsuario.RH, tiposUsuario.GERENCIA], ruta: '/gth/cargos'},
  {icono: HailIcon, texto: 'Selección', children: [
    {icono: HailIcon, texto: 'Vacantes', usuarios: [tiposUsuario.GERENCIA], ruta: '/gth/seleccion/vacantes'},
    {icono: HailIcon, texto: 'Candidatos', ruta: '/gth/seleccion/candidatos'},
    {icono: HailIcon, texto: 'Entrevistas', ruta: '/gth/seleccion/entrevistas'},
  ]},
  {icono: HailIcon, texto: 'Empleados', usuarios: [tiposUsuario.RH], children: [
    {icono: HailIcon, texto: 'Listado', ruta: '/gth/empleados/listado'},
    {icono: HailIcon, texto: 'Contratos', ruta: '/gth/empleados/contratos'},
    {icono: HailIcon, texto: 'Novedades', ruta: '/gth/empleados/novedades'},
  ]},
  {icono: HailIcon, texto: 'Nómina', ruta: '/gth/nomina'},
  {icono: HailIcon, texto: 'Liquidación', ruta: '/gth/liquidacion'},
  {icono: HailIcon, texto: 'Certificados', ruta: '/gth/certificados'},
];

const opcionesValidasTabla = {
  EDITAR: 'editar',
  ELIMINAR: 'eliminar'
};

export { opcionesMenuLateral, opcionesValidasTabla, tiposUsuario };