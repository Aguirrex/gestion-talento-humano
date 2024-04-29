import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { BreadcrumbsCustom, TablaEditable } from '../../common/Personalizados';
import { useUsuarioContext } from '../../../customHooks/UsuarioProvider';
import { opcionesValidasTabla, tiposUsuario } from '../../common/constantes';
import { fetchApi } from '../../../tools/connectionApi';
import { AlertaFlotante } from '../../common/Alertas';

const modeloSucursal = {
  id: 0,
  nombre: ''
};

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
  return (usuario?.tipo === tiposUsuario.RH || usuario?.tipo === tiposUsuario.GERENCIA) 
    ? [opcionesValidasTabla.EDITAR, opcionesValidasTabla.ELIMINAR] 
    : [];
}

const getEditable = (usuario) => {
  return (usuario?.tipo === tiposUsuario.RH || usuario?.tipo === tiposUsuario.GERENCIA) 
    ? true 
    : false;
}

const Main = () => {

  const { usuario } = useUsuarioContext();
  const [sucursales, setSucursales] = React.useState(sucursalesInicial);
  const [alerta, setAlerta] = React.useState({mensaje: '', severity: 'warning', open: false});

  const opcionesValidas = getPermisos(usuario);

  const encabezadosTabla = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,
      editable: getEditable(usuario)
    }
  ];

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

  const postSucursal = async (sucursal) => {
    const { nombre } = sucursal;

    try {
      const response = await fetchApi().post('/sucursal', {
        data: { nombre }
      });
      if (response?.data) {
        const { sucursal: newSucursal } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: `Sucursal ${newSucursal.nombre} creada exitosamente`, severity: 'success', open: true}));
      }  else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al agregar la sucursal', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar la creación de la sucursal al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const putSucursal = async (sucursal) => {
    const { id, nombre } = sucursal;

    try {
      const response = await fetchApi().put(`/sucursal/${id}`, {
        data: { nombre }
      });
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Sucursal modificada exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al modificar la sucursal', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la modificación de la sucursal';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la modificación de la sucursal al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const deleteSucursal = async (sucursal) => {
    const { id } = sucursal;

    try {
      const response = await fetchApi().delete(`/sucursal/${id}`);
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Sucursal eliminada exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al eliminar la sucursal', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la eliminación de la sucursal';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la eliminación de la sucursal al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const siguienteId = async () => {
    try {
      const response = await fetchApi().get('/sucursales/siguienteId');
      if (response?.data) {
        const { siguiente_id_sucursales } = response.data;
        return siguiente_id_sucursales;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar el siguiente id de la sucursal', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar el siguiente id de sucursal al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }

    return false;
  }


  useEffect(() => {
    getSucursales();
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
              nombreModelo='sucursal'
              encabezados={encabezadosTabla}
              opcionesValidas={opcionesValidas}
              datos={sucursales}
              setDatos={setSucursales}
              modelo={modeloSucursal}
              siguienteId={() => sucursales.length + 1}
              onAgregar={postSucursal}
              onEditar={putSucursal}
              onEliminar={deleteSucursal}
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