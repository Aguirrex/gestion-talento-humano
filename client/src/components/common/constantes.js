import { Hail as HailIcon, HowToReg as HowToRegIcon, Work as WorkIcon, Apartment as ApartmentIcon, Badge as BadgeIcon, Group as GroupIcon, List as ListIcon, FiberNew as FiberNewIcon, AttachMoney as AttachMoneyIcon, PersonOff as PersonOffIcon, Portrait as PortraitIcon } from '@mui/icons-material';

const tiposUsuario = {
  RH: 'RH',
  GERENCIA: 'GERENCIA',
  PSICOLOGIA: 'PSICOLOGIA',
  CONTABILIDAD: 'CONTABILIDAD'
};

const opcionesMenuLateral = [
  {icono: ApartmentIcon, texto: 'Sucursales', usuarios: [tiposUsuario.RH, tiposUsuario.GERENCIA], ruta: '/gth/sucursales'},
  {icono: WorkIcon, texto: 'Cargos', usuarios: [tiposUsuario.GERENCIA], ruta: '/gth/cargos'},
  {icono: PortraitIcon, texto: 'Personas', usuarios: [tiposUsuario.RH], ruta: '/gth/personas'},
  {icono: HowToRegIcon, texto: 'Selección', children: [
    {icono: BadgeIcon, texto: 'Vacantes', usuarios: [tiposUsuario.GERENCIA], ruta: '/gth/seleccion/vacantes'},
    {icono: HailIcon, texto: 'Candidatos', usuarios: [tiposUsuario.RH], ruta: '/gth/seleccion/candidatos'},
  ]},
  {icono: GroupIcon, texto: 'Empleados', usuarios: [tiposUsuario.RH], children: [
    {icono: ListIcon, texto: 'Listado Empleados', ruta: '/gth/empleados/listado'},
    {icono: FiberNewIcon, texto: 'Novedades', ruta: '/gth/empleados/novedades'},
  ]},
  {icono: AttachMoneyIcon, texto: 'Nómina', usuarios: [tiposUsuario.RH, tiposUsuario.CONTABILIDAD, tiposUsuario.GERENCIA], ruta: '/gth/nomina'},
  {icono: PersonOffIcon, texto: 'Liquidación', usuarios: [tiposUsuario.RH], ruta: '/gth/liquidacion'},
];

const opcionesValidasTabla = {
  EDITAR: 'editar',
  ELIMINAR: 'eliminar',
  AGREGAR: 'agregar',
};

const tiposDocumento = {
  CC: 'CC',
  CE: 'CE',
  TI: 'TI',
  PAS: 'PAS',
};

const accionesCandidato = {
  CONTRATAR: 'CONTRATAR',
  DESCARTAR: 'DESCARTAR',
};

const tiposContrato = {
  FIJO: 'FIJO',
  INDEFINIDO: 'INDEFINIDO',
  OBRA: 'OBRA',
  APRENDIZAJE: 'APRENDIZAJE',
};

const tiposNovedad = {
  RODAMIENTO: 'RODAMIENTO', 
  FONDO: 'FONDO CRECER', 
  COMISION: 'COMISIÓN', 
  BONIFICACION: 'BONIFICACIÓN', 
  HORAS_EXTRAS: 'HORAS EXTRAS', 
  INCAPACIDAD: 'INCAPACIDAD', 
  PRIMA: 'PRIMA', 
  VACACIONES: 'VACACIONES', 
  OTRO: 'OTRO'
};

export { 
  opcionesMenuLateral, 
  opcionesValidasTabla, 
  tiposUsuario,
  tiposDocumento,
  accionesCandidato,
  tiposContrato,
  tiposNovedad
};