import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { BreadcrumbsCustom, TablaEditable } from '../../common/Personalizados';
import { useUsuarioContext } from '../../../customHooks/UsuarioProvider';
import { opcionesValidasTabla, tiposUsuario } from '../../common/constantes';
import { fetchApi } from '../../../tools/connectionApi';
import { AlertaFlotante } from '../../common/Alertas';

const modeloCargo = {
  id: 0,
  nombre: '',
  descripcion: ''
};

const cargosInicial = [
  { id: 0, 'nombre': 'Cargo 1' }, 
  { id: 1, 'nombre': 'Cargo 2' }, 
  { id: 2, 'nombre': 'Cargo 3' },
  { id: 3, 'nombre': 'Cargo 4' },
  { id: 4, 'nombre': 'Cargo 5' },
  { id: 5, 'nombre': 'Cargo 6' },
  { id: 6, 'nombre': 'Cargo 7' },
  { id: 7, 'nombre': 'Cargo 8' },
  { id: 8, 'nombre': 'Cargo 9' },
  { id: 9, 'nombre': 'Cargo 10' },
  { id: 10, 'nombre': 'Cargo 11' },
  { id: 11, 'nombre': 'Cargo 12' },
  { id: 12, 'nombre': 'Cargo 13' },
  { id: 13, 'nombre': 'Cargo 14' },
  { id: 14, 'nombre': 'Cargo 15' },
  { id: 15, 'nombre': 'Cargo 16' },
  { id: 16, 'nombre': 'Cargo 17' },
  { id: 17, 'nombre': 'Cargo 18' },
  { id: 18, 'nombre': 'Cargo 19' },
  { id: 19, 'nombre': 'Cargo 20' }
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
  const [cargos, setCargos] = React.useState(cargosInicial);
  const [alerta, setAlerta] = React.useState({mensaje: '', severity: 'warning', open: false});

  const opcionesValidas = getPermisos(usuario);

  const encabezadosTabla = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,
      editable: getEditable(usuario)
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 200,
      maxWidth: 400,
      editable: getEditable(usuario)
    }
  ];

  const getCargos = async () => {
    try {
      const response = await fetchApi().get('/cargos');
      if (response?.data) {
        const { cargos: listaCargos } = response.data;
        setCargos(
          listaCargos &&
          listaCargos
            .map(cargo => ({...cargo, id: parseInt(cargo.id)}))
        );
        setAlerta(alerta => ({...alerta, mensaje: 'Cargos cargados exitosamente', severity: 'success', open: true}));
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
  }

  const postCargo = async (cargo) => {
    const { nombre, descripcion } = cargo;

    try {
      const response = await fetchApi().post('/cargo', {
        data: { nombre, descripcion }
      });
      if (response?.data) {
        const { cargo: newCargo } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: `Cargo ${newCargo.nombre} creado exitosamente`, severity: 'success', open: true}));
      }  else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al agregar el cargo', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar la creación del cargo al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const putCargo = async (cargo) => {
    const { id, nombre } = cargo;

    try {
      const response = await fetchApi().put(`/cargo/${id}`, {
        data: { nombre }
      });
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Cargo modificado exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al modificar el cargo', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la modificación del cargo';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la modificación del cargo al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const deleteCargo = async (cargo) => {
    const { id } = cargo;

    try {
      const response = await fetchApi().delete(`/cargo/${id}`);
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Cargo eliminado exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al eliminar el cargo', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la eliminación del cargo';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la eliminación del cargo al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const siguienteId = async () => {
    try {
      const response = await fetchApi().get('/cargos/siguienteId');
      if (response?.data) {
        const { siguiente_id_cargos } = response.data;
        return siguiente_id_cargos;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar el siguiente id del cargo', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar el siguiente id de cargo al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }
  }


  useEffect(() => {
    getCargos();
  }, []);



  return (
    <>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <BreadcrumbsCustom />
        </Grid>
        <Grid item xs={12}>
          <Box height='calc(99vh - 140px)'>
            <TablaEditable 
              nombreModelo='cargo'
              encabezados={encabezadosTabla}
              opcionesValidas={opcionesValidas}
              datos={cargos}
              setDatos={setCargos}
              modelo={modeloCargo}
              siguienteId={siguienteId}
              onAgregar={postCargo}
              onEditar={putCargo}
              onEliminar={deleteCargo}
              sx={{ bgcolor: 'background.paper' }}
            />
          </Box>
        </Grid>
      </Grid>
      <AlertaFlotante 
        {...alerta}
        setOpen={open => setAlerta({...alerta, open})}
      />
    </>
  );
};

export default Main;