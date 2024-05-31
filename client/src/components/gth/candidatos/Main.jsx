import React, { useEffect } from 'react';
import { Grid, Box, Button, Dialog, DialogContent } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { BreadcrumbsCustom, TablaEditable } from '../../common/Personalizados';
import { useUsuarioContext } from '../../../customHooks/UsuarioProvider';
import { opcionesValidasTabla, tiposUsuario, accionesCandidato } from '../../common/constantes';
import { fetchApi } from '../../../tools/connectionApi';
import { AlertaFlotante } from '../../common/Alertas';
import FormContratar from './FormContratar';

const modeloCandidato = {
  id: 0,
  id_vacante: 0,
  id_persona: 0,
  dni: '',
  email: '',
  nombre_completo: '',
  titulo_vacante: '',
  nombre_cargo: '',
  estado: true
};

const candidatosInicial = [
  {id: 0, id_vacante: 0, id_persona: 0, dni: '123456789', nombre_completo: 'Juan Pablo Garcia Montes', email: 'juanpablo@mail.com', titulo_vacante: 'Vacante 1', nombre_cargo: 'Cargo', estado: true},
  {id: 1, id_vacante: 0, id_persona: 1, dni: '41234123', nombre_completo: 'Juan José Sierra Arroyave', email: 'juanjose@mail.com', titulo_vacante: 'Vacante 1', nombre_cargo: 'Cargo', estado: true},
  {id: 2, id_vacante: 0, id_persona: 2, dni: '42123534643', nombre_completo: 'Juan Miguel Aguirre Bedoya', email: 'juanmiguel@mail.com', titulo_vacante: 'Vacante 1', nombre_cargo: 'Cargo', estado: true},
];

const vacantesInicial = [
  { value: 0, label: 'Vacante 1' },
  { value: 1, label: 'Vacante 2' },
  { value: 2, label: 'Vacante 3' }
];

const personasInicial = [
  { value: 0, label: '1234567890' },
  { value: 1, label: '1234567891' },
  { value: 2, label: '1234567892' }
];

const sucursalesInicial = [
  { id: 0, 'nombre': 'Sucursal 1' }, 
  { id: 1, 'nombre': 'Sucursal 2' }, 
  { id: 2, 'nombre': 'Sucursal 3' },
  { id: 3, 'nombre': 'Sucursal 4' },
  { id: 4, 'nombre': 'Sucursal 5' },
  { id: 5, 'nombre': 'Sucursal 6' },
  { id: 6, 'nombre': 'Sucursal 7' },
  { id: 7, 'nombre': 'Sucursal 8' },
  { id: 8, 'nombre': 'Sucursal 9' },
  { id: 9, 'nombre': 'Sucursal 10' },
  { id: 10, 'nombre': 'Sucursal 11' },
  { id: 11, 'nombre': 'Sucursal 12' },
  { id: 12, 'nombre': 'Sucursal 13' },
  { id: 13, 'nombre': 'Sucursal 14' },
  { id: 14, 'nombre': 'Sucursal 15' },
  { id: 15, 'nombre': 'Sucursal 16' },
  { id: 16, 'nombre': 'Sucursal 17' },
  { id: 17, 'nombre': 'Sucursal 18' },
  { id: 18, 'nombre': 'Sucursal 19' },
  { id: 19, 'nombre': 'Sucursal 20' }
];

const getPermisos = (usuario) => {
  return (usuario?.tipo === tiposUsuario.RH) 
    ? [opcionesValidasTabla.ELIMINAR, opcionesValidasTabla.AGREGAR] 
    : [];
}

const getEditable = (usuario) => {
  return (usuario?.tipo === tiposUsuario.RH) 
    ? true 
    : false;
}

const Main = () => {

  const { usuario } = useUsuarioContext();
  const [candidatos, setCandidatos] = React.useState(candidatosInicial);
  const [alerta, setAlerta] = React.useState({mensaje: '', severity: 'warning', open: false});
  const [vacantes, setVacantes] = React.useState(vacantesInicial);
  const [personas, setPersonas] = React.useState(personasInicial);
  const [sucursales, setSucursales] = React.useState(sucursalesInicial);

  const [openFormContratar, setOpenFormContratar] = React.useState(false);
  const candidatoContratar = React.useRef({});

  const opcionesValidas = getPermisos(usuario);

  const getVacantes = async () => {
    try {
      const response = await fetchApi().get('/vacantes');
      if (response?.data) {
        const { vacantes: listaVacantes } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: 'Vacantes cargados exitosamente', severity: 'success', open: true}));
        return listaVacantes;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar las vacantes', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar las vacantes al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }

    return false;
  }

  const getPersonas = async () => {
    try {
      const response = await fetchApi().get('/personas');
      if (response?.data) {
        const { personas: listaPersonas } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: 'Personas cargados exitosamente', severity: 'success', open: true}));
        return listaPersonas;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar las personas', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar las personas al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }

    return false;
  }

  const getSucursales = async () => {
    try {
      const response = await fetchApi().get('/sucursales');
      if (response?.data) {
        const { sucursales: listaSucursales } = response.data;
        setSucursales(
          listaSucursales &&
          listaSucursales
            .filter(sucursal => sucursal?.estado ?? true)
            .map(sucursal => ({...sucursal, id: parseInt(sucursal.id)}))
        );
        setAlerta(alerta => ({...alerta, mensaje: 'Sucursales cargadas exitosamente', severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar las sucursales', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar las sucursales al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }
  }

  const encabezadosTabla = [
    {
      field: 'id_persona',
      headerName: 'DNI',
      minWidth: 200,
      maxWidth: 300,
      editable: getEditable(usuario),
      type: 'singleSelect',
      valueOptions: personas
    },
    {
      field: 'id_vacante',
      headerName: 'Vacante',
      minWidth: 200,
      maxWidth: 400,
      editable: getEditable(usuario),
      type: 'singleSelect',
      valueOptions: vacantes
    },
    {
      field: 'nombre_completo',
      headerName: 'Nombre',
      minWidth: 250,
      maxWidth: 400,
      editable: false
    },
    {
      field: 'email',
      headerName: 'Correo',
      minWidth: 150,
      maxWidth: 300,
      editable: false,
    },
    {
      field: 'nombre_cargo',
      headerName: 'Cargo aplicado',
      width: 200,
      editable: false
    },
    {
      field: 'estado',
      headerName: 'Contratar',
      width: 120,
      editable: false,
      renderCell: (params) => {
        return (
          <Button
            variant='text'
            color='primary'
            size='small'
            startIcon={<WorkIcon />}
            onClick={() => {
              if (params.row.nombre_completo === '' || params.row.nombre_completo === null) return;
              candidatoContratar.current = params.row;
              setOpenFormContratar(true);
            }}
          >
            Contratar 
          </Button>
        );
      }
    }
  ];

  

  const getCandidatos = async () => {
    try {
      const response = await fetchApi().get('/candidatos');
      if (response?.data) {
        const { candidatos: listaCandidatos } = response.data;
        setCandidatos(
          listaCandidatos &&
          listaCandidatos
            .map((candidato, index) => ({...candidato, id: index}))
        );
        setAlerta(alerta => ({...alerta, mensaje: 'Candidatos cargados exitosamente', severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar los candidatos', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar los candidatos al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }
  }

  const postCandidato = async (candidato) => {
    const { id_vacante, id_persona } = candidato;

    try {
      const response = await fetchApi().post('/candidato', {
        id_vacante, id_persona
      });
      if (response?.data) {
        const { candidato: newCandidato } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: `Candidato con DNI ${newCandidato.dni} creado exitosamente`, severity: 'success', open: true}));

        return newCandidato;
      }  else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al agregar el candidato', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar la creación de el candidato al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }
  }

  const contratarCandidato = async (candidato, contrato) => {
    const { id_vacante, id_persona } = candidato;
    let body = { id_vacante, id_persona, accion: accionesCandidato.CONTRATAR };
    const { tipo, id_sucursal, fecha_inicio, contratacion_mision_plus, salario } = contrato;
    body = { ...body, tipo, id_sucursal, fecha_inicio: fecha_inicio.format('YYYY-MM-DD'), contratacion_mision_plus, salario };

    try {
      const response = await fetchApi().put(`/candidato`, body);
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Candidato contratado exitosamente`, severity: 'success', open: true}));
        setCandidatos(candidatos => candidatos.filter(c => c.id !== candidato.id));
        setTimeout(() => setOpenFormContratar(false), 800);
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al contratar el candidato', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la contratación del candidato';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la contratación del candidato al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));


      return false;
    }


    return true;
  }

  const deleteCandidato = async (candidato) => {
    const { id_vacante, id_persona } = candidato;

    try {
      const response = await fetchApi().put(`/candidato`, {
        id_vacante, id_persona, accion: accionesCandidato.DESCARTAR
      });
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Candidato descartado exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al descartar el candidato', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para descartar el candidato';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar descartar el candidato al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const siguienteId = async () => {
    return candidatos.length;
  }


  useEffect(() => {
    getCandidatos();
    getPersonas()
      .then(personas => {
        console.log(personas);
        if (personas) setPersonas(personas.map(persona => ({value: persona.id, label: persona.dni})));
      });
    getVacantes()
      .then(vacantes => {
        console.log(vacantes);
        if (vacantes) setVacantes(vacantes.map(vacante => ({value: vacante.id, label: vacante.titulo})));
      });
    getSucursales()
      .then(sucursales => {
        console.log(sucursales);
        if (sucursales) setSucursales(sucursales.map(sucursal => ({id: sucursal.id, label: sucursal.nombre})));
      });
  }, []);

  useEffect(() => {
    console.log(vacantes);
  }, [vacantes]);

  useEffect(() => {
    console.log(personas);
  }, [personas]);


  return (
    <>
      <Box >
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <BreadcrumbsCustom />
          </Grid>
          <Grid item xs={12}>
            <Box height='calc(99vh - 140px)'>
              <TablaEditable 
                nombreModelo='candidato'
                encabezados={encabezadosTabla}
                opcionesValidas={opcionesValidas}
                datos={candidatos}
                setDatos={setCandidatos}
                modelo={modeloCandidato}
                siguienteId={siguienteId}
                onAgregar={postCandidato}
                onEditar={() => Promise.resolve(false)}
                onEliminar={deleteCandidato}
                sx={{ bgcolor: 'background.paper' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={openFormContratar}
        onClose={() => setOpenFormContratar(false)}
      >
        <DialogContent>
          <FormContratar
            candidato={candidatoContratar.current}
            sucursales={sucursales}
            contratarCandidato={contratarCandidato}
          />
        </DialogContent>
      </Dialog>
      <AlertaFlotante 
        {...alerta}
        setOpen={open => setAlerta({...alerta, open})}
      />
    </>
  );
};

export default Main;