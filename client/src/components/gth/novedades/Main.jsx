import React, { useEffect } from 'react';
import { Grid, Box, Link } from '@mui/material';
import { BreadcrumbsCustom, TablaEditable } from '../../common/Personalizados';
import { useUsuarioContext } from '../../../customHooks/UsuarioProvider';
import { opcionesValidasTabla, tiposNovedad, tiposUsuario } from '../../common/constantes';
import { fetchApi } from '../../../tools/connectionApi';
import { AlertaFlotante } from '../../common/Alertas';

import dayjs from 'dayjs';

const modeloNovedad = {
  id: 0,
  id_contrato: 0,
  id_periodo_quincenal: 0,
  tipo: tiposNovedad.HORAS_EXTRAS,
  cantidad: 0,
  valor: 0,
  es_decuento: false,
  detalles: ''
};

const novedadesInicial = [
  { id: 1, id_contrato: 1, id_periodo_quincenal: 1, tipo: tiposNovedad.HORAS_EXTRAS, cantidad: 2, valor: 10000, es_decuento: false, detalles: 'Horas extras trabajadas' },
];

const empleadosInicial = [
  { value: 0, label: '123456789' },
  { value: 1, label: '435543434' },
  { value: 2, label: '716426341' },
];

const periodosQuincenalesInicial = [
  { value: 0, label: '1° Quin. Mayo 2024'},
  { value: 1, label: '2° Quin. Mayo 2024'},
  { value: 2, label: '1° Quin. Junio 2024'},
  { value: 3, label: '2° Quin. Junio 2024'},
  { value: 4, label: '1° Quin. Julio 2024'},
  { value: 5, label: '2° Quin. Julio 2024'},
];

const getPermisos = (usuario) => {
  return [];
}

const getEditable = (usuario) => {
  return (usuario?.tipo === tiposUsuario.RH) 
    ? true 
    : false;
}

const formatoMoneda = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 2
});

const Main = () => {

  const { usuario } = useUsuarioContext();
  const [novedades, setNovedades] = React.useState(novedadesInicial);
  const [alerta, setAlerta] = React.useState({mensaje: '', severity: 'warning', open: false});
  const [empleados, setEmpleados] = React.useState(empleadosInicial);
  const [periodosQuincenales, setPeriodosQuincenales] = React.useState(periodosQuincenalesInicial);

  const opcionesValidas = getPermisos(usuario);

  const getEmpleados = async () => {
    try {
      const response = await fetchApi().get('/empleados');
      if (response?.data) {
        const { empleados: listaEmpleados } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: 'Empleados cargados exitosamente', severity: 'success', open: true}));
        return listaEmpleados.filter(empleado => empleado.estado === true);
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar los empleados', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar los empleados al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }

    return false;
  }

  const getPeriodosQuincenales = async () => {
    try {
      const response = await fetchApi().get('/periodos_quincenales');
      if (response?.data) {
        const { periodos_quincenales: listaPeriodosQuincenales } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: 'Peridos quincenales cargados exitosamente', severity: 'success', open: true}));
        return listaPeriodosQuincenales;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar los periodos quincenales', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar los periodos quincenales al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }

    return false;
  }

  const encabezadosTabla = [
    {
      field: 'id_contrato',
      headerName: 'DNI Empleado',
      type: 'singleSelect',
      width: 150,
      editable: getEditable(usuario),
      valueOptions: empleados
    },
    {
      field: 'id_periodo_quincenal',
      headerName: 'Periodo Quincenal',
      type: 'singleSelect',
      width: 200,
      editable: getEditable(usuario),
      valueOptions: periodosQuincenales
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      type: 'singleSelect',
      width: 150,
      editable: getEditable(usuario),
      valueOptions: Object.values(tiposNovedad).map(tipo => ({value: tipo, label: tipo}))
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      type: 'number',
      width: 80,
      editable: getEditable(usuario),
    },
    {
      field: 'valor',
      headerName: 'Valor',
      type: 'number',
      width: 150,
      editable: getEditable(usuario),
      valueFormatter: (value) => formatoMoneda.format(value)
    },
    {
      field: 'es_decuento',
      headerName: 'Es descuento',
      type: 'boolean',
      width: 150,
      editable: getEditable(usuario),
    },
    {
      field: 'detalles',
      headerName: 'Detalles',
      type: 'text',
      width: 200,
      editable: getEditable(usuario),
    },
  ];

  

  const getNovedades = async () => {
    try {
      const response = await fetchApi().get('/novedades');
      if (response?.data) {
        const { novedades: listaNovedades } = response.data;
        setNovedades(
          listaNovedades &&
          listaNovedades
            .map(novedad => ({...novedad, id: parseInt(novedad.id)}))
        );
        setAlerta(alerta => ({...alerta, mensaje: 'Novedades cargadas exitosamente', severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar las novedades', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar las novedades al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }
  }

  const postNovedad = async (novedad) => {
    const { id_contrato, id_periodo_quincenal, tipo, cantidad, valor, es_descuento, detalles } = novedad;

    try {
      const response = await fetchApi().post('/novedad', {
        id_contrato, id_periodo_quincenal, tipo, cantidad, valor, es_descuento, detalles
      });
      if (response?.data) {
        const { novedad: newNovedad } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: `Novedad ${newNovedad.titulo} creada exitosamente`, severity: 'success', open: true}));
      }  else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al agregar la novedad', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar la creación de la novedad al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const putNovedad = async (novedad) => {
    const { id, titulo, descripcion } = novedad;

    try {
      const response = await fetchApi().put(`/novedad/${id}`, {
        titulo, descripcion
      });
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Novedad modificado exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al modificar la novedad', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la modificación de la novedad';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la modificación de la novedad al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const deleteNovedad = async (novedad) => {
    const { id } = novedad;

    try {
      const response = await fetchApi().delete(`/novedad/${id}`);
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Novedad descartada exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al eliminar la novedad', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la eliminación de la novedad';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la eliminación de la novedad al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const siguienteId = async () => {
    try {
      const response = await fetchApi().get('/novedades/siguienteId');
      if (response?.data) {
        const { siguiente_id_novedades } = response.data;
        return siguiente_id_novedades;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar el siguiente id de la novedad', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar el siguiente id de novedad al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }
  }


  useEffect(() => {
    getNovedades();
    getEmpleados()
      .then(empleados => {
        console.log(empleados);
        if (empleados) setEmpleados(empleados.map(empleado => ({value: empleado.id, label: empleado.nombre})));
      });
    getPeriodosQuincenales()
      .then(periodosQuincenales => {
        console.log(periodosQuincenales);
        if (periodosQuincenales) setPeriodosQuincenales(periodosQuincenales.map(periodoQuincenal => ({
          value: periodoQuincenal.id, 
          label: `${periodoQuincenal.periodo}° Quin. ${dayjs(new Date(periodoQuincenal.year, periodoQuincenal.mes)).format('MMMM YYYY')}`
        })));
      });
  }, []);

  useEffect(() => {
    console.log(empleados);
    console.log(periodosQuincenales);
  }, [empleados, periodosQuincenales]);



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
                nombreModelo='novedad'
                encabezados={encabezadosTabla}
                opcionesValidas={opcionesValidas}
                datos={novedades}
                setDatos={setNovedades}
                modelo={modeloNovedad}
                siguienteId={siguienteId}
                onAgregar={postNovedad}
                onEditar={putNovedad}
                onEliminar={deleteNovedad}
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