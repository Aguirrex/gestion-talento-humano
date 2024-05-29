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
  {icono: PortraitIcon, texto: 'Personas', usuarios: [tiposUsuario.RH], ruta: '/gth/cargos'},
  {icono: HowToRegIcon, texto: 'Selección', children: [
    {icono: BadgeIcon, texto: 'Vacantes', usuarios: [tiposUsuario.GERENCIA], ruta: '/gth/seleccion/vacantes'},
    {icono: HailIcon, texto: 'Candidatos', usuarios: [tiposUsuario.RH], ruta: '/gth/seleccion/candidatos'},
    // {icono: HailIcon, texto: 'Entrevistas', ruta: '/gth/seleccion/entrevistas'},
  ]},
  {icono: GroupIcon, texto: 'Empleados', usuarios: [tiposUsuario.RH], children: [
    {icono: ListIcon, texto: 'Listado', ruta: '/gth/empleados/listado'},
    // {icono: HailIcon, texto: 'Contratos', ruta: '/gth/empleados/contratos'},
    {icono: FiberNewIcon, texto: 'Novedades', ruta: '/gth/empleados/novedades'},
  ]},
  {icono: AttachMoneyIcon, texto: 'Nómina', usuarios: [tiposUsuario.RH, tiposUsuario.CONTABILIDAD, tiposUsuario.GERENCIA], ruta: '/gth/nomina'},
  {icono: PersonOffIcon, texto: 'Liquidación', usuarios: [tiposUsuario.RH], ruta: '/gth/liquidacion'},
  // {icono: HailIcon, texto: 'Certificados', ruta: '/gth/certificados'},
];

const opcionesValidasTabla = {
  EDITAR: 'editar',
  ELIMINAR: 'eliminar'
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

export { 
  opcionesMenuLateral, 
  opcionesValidasTabla, 
  tiposUsuario,
  tiposDocumento,
  accionesCandidato,
  tiposContrato
};