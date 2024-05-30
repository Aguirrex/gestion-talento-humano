import React, { useEffect } from 'react';
import { Grid, Box, Link } from '@mui/material';
import { BreadcrumbsCustom, TablaEditable } from '../../common/Personalizados';
import { useUsuarioContext } from '../../../customHooks/UsuarioProvider';
import { opcionesValidasTabla, tiposUsuario } from '../../common/constantes';
import { fetchApi } from '../../../tools/connectionApi';
import { AlertaFlotante } from '../../common/Alertas';

const modeloVacante = {
  id: 0,
  titulo: '',
  id_cargo: 0,
  url_perfil: '',
  fecha_apertura: '',
  fecha_cierre: '',
  estado: true
};

const vacantesInicial = [
  { id: 0, 'titulo': 'Vacante 1', 'id_cargo': 0, 'fecha_apertura': '2021-10-01', 'fecha_cierre': '2021-10-31', 'estado': false },
  { id: 1, 'titulo': 'Vacante 2', 'id_cargo': 1, 'url_perfil': '', 'fecha_apertura': '2021-10-01', 'fecha_cierre': null, 'estado': true },
  { id: 2, 'titulo': 'Vacante 3', 'id_cargo': 2, 'url_perfil': 'https://www.google.com', 'fecha_apertura': '2021-10-01', 'fecha_cierre': '2021-10-31', 'estado': false },
  { id: 3, 'titulo': 'Vacante 4', 'id_cargo': 3, 'url_perfil': null, 'fecha_apertura': '2021-10-01', 'fecha_cierre': null, 'estado': true },
];

const cargosInicial = [
  { value: 0, label: 'Cargo 1' },
  { value: 1, label: 'Cargo 2' },
  { value: 2, label: 'Cargo 3' },
  { value: 3, label: 'Cargo 4' },
  { value: 4, label: 'Cargo 5' },
  { value: 5, label: 'Cargo 6' }
];

const getPermisos = (usuario) => {
  return (usuario?.tipo === tiposUsuario.GERENCIA) 
    ? [opcionesValidasTabla.EDITAR] 
    : [];
}

const getEditable = (usuario) => {
  return (usuario?.tipo === tiposUsuario.GERENCIA) 
    ? true 
    : false;
}

const Main = () => {

  const { usuario } = useUsuarioContext();
  const [vacantes, setVacantes] = React.useState(vacantesInicial);
  const [alerta, setAlerta] = React.useState({mensaje: '', severity: 'warning', open: false});
  const [cargos, setCargos] = React.useState(cargosInicial);

  const opcionesValidas = getPermisos(usuario);

  const getCargos = async () => {
    try {
      const response = await fetchApi().get('/cargos');
      if (response?.data) {
        const { cargos: listaCargos } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: 'Cargos cargados exitosamente', severity: 'success', open: true}));
        return listaCargos;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar los cargos', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar los cargos al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }

    return false;
  }

  const encabezadosTabla = [
    {
      field: 'titulo',
      headerName: 'Título',
      minWidth: 250,
      maxWidth: 400,
      editable: getEditable(usuario)
    },
    {
      field: 'id_cargo',
      headerName: 'Cargo',
      minWidth: 200,
      maxWidth: 400,
      editable: getEditable(usuario),
      type: 'singleSelect',
      valueOptions: cargos
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 250,
      maxWidth: 400,
      editable: getEditable(usuario)
    },
    // {
    //   field: 'url_perfil',
    //   headerName: 'Perfil',
    //   minWidth: 150,
    //   maxWidth: 400,
    //   editable: false,
    //   renderCell: (params) => (
    //     params?.value ? <Link href={params.value} target='_blank' rel='noopener'>Perfil</Link> : null
    //   )
    // },
    {
      field: 'fecha_apertura',
      headerName: 'Apertura',
      width: 150,
      editable: false,
      type: 'date',
      valueGetter: value => value && new Date(value)
    },
    {
      field: 'fecha_cierre',
      headerName: 'Cierre',
      width: 150,
      editable: false,
      type: 'date',
      valueGetter: value => value && new Date(value)
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100,
      editable: getEditable(usuario),
      type: 'boolean'
    }
  ];

  

  const getVacantes = async () => {
    try {
      const response = await fetchApi().get('/vacantes');
      if (response?.data) {
        const { vacantes: listaVacantes } = response.data;
        setVacantes(
          listaVacantes &&
          listaVacantes
            .map(vacante => ({...vacante, id: parseInt(vacante.id)}))
        );
        setAlerta(alerta => ({...alerta, mensaje: 'Vacantes cargadas exitosamente', severity: 'success', open: true}));
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
  }

  const postVacante = async (vacante) => {
    const { titulo, descripcion, id_cargo } = vacante;

    try {
      const response = await fetchApi().post('/vacante', {
        titulo, descripcion, id_cargo
      });
      if (response?.data) {
        const { vacante: newVacante } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: `Vacante ${newVacante.titulo} creada exitosamente`, severity: 'success', open: true}));
      }  else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al agregar la vacante', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar la creación de la vacante al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const putVacante = async (vacante) => {
    const { id, titulo, descripcion, estado } = vacante;

    try {
      const response = await fetchApi().put(`/vacante/${id}`, {
        titulo, descripcion, estado
      });
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Vacante modificado exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al modificar la vacante', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la modificación de la vacante';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la modificación de la vacante al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const deleteVacante = async (vacante) => {
    const { id } = vacante;

    try {
      const response = await fetchApi().delete(`/vacante/${id}`);
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Vacante descartada exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al eliminar la vacante', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la eliminación de la vacante';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la eliminación de la vacante al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const siguienteId = async () => {
    try {
      const response = await fetchApi().get('/vacantes/siguienteId');
      if (response?.data) {
        const { siguiente_id_vacantes } = response.data;
        return siguiente_id_vacantes;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar el siguiente id de la vacante', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar el siguiente id de vacante al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }
  }


  useEffect(() => {
    getVacantes();
    getCargos()
      .then(cargos => {
        console.log(cargos);
        if (cargos) setCargos(cargos.map(cargo => ({value: cargo.id, label: cargo.nombre})));
      })
  }, []);

  useEffect(() => {
    console.log(cargos);
  }, [cargos]);



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
                nombreModelo='vacante'
                encabezados={encabezadosTabla}
                opcionesValidas={opcionesValidas}
                datos={vacantes}
                setDatos={setVacantes}
                modelo={modeloVacante}
                siguienteId={siguienteId}
                onAgregar={postVacante}
                onEditar={putVacante}
                onEliminar={deleteVacante}
                sx={{ bgcolor: 'background.paper' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <AlertaFlotante 
        {...alerta}
        setOpen={open => setAlerta({...alerta, open})}
      />
    </>
  );
};

export default Main;