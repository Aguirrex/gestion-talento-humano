import React, { useEffect } from 'react';
import { Grid, Box, Link } from '@mui/material';
import { BreadcrumbsCustom, TablaEditable } from '../../common/Personalizados';
import { useUsuarioContext } from '../../../customHooks/UsuarioProvider';
import { opcionesValidasTabla, tiposContrato, tiposUsuario } from '../../common/constantes';
import { fetchApi } from '../../../tools/connectionApi';
import { AlertaFlotante } from '../../common/Alertas';

const modeloEmpleado = {
  id: 0,
  id_persona: 0, 
  id_sucursal: 0, 
  dni: '',
  nombre_completo: '',
  id_cargo: 0,
  nombre_cargo: '',
  tipo: '',
  fecha_inicio: '',
  fecha_fin: '',
  salario: 1,
  estado: true
};

const empleadosInicial = [
  // { id: 0, id_persona: 0, id_sucursal: 0, dni: '00000000', nombre_completo: 'Empleado 1', id_cargo: 0, nombre_cargo: 'Cargo 1', tipo: 'FIJO', fecha_inicio: '2021-01-01', salario: 3500000.00, estado: true },
];

const cargosInicial = [
  // { value: 0, label: 'Cargo 1' },
  // { value: 1, label: 'Cargo 2' },
  // { value: 2, label: 'Cargo 3' },
  // { value: 3, label: 'Cargo 4' },
  // { value: 4, label: 'Cargo 5' },
  // { value: 5, label: 'Cargo 6' }
];

const personasInicial = [
  // { value: 0, label: '1234567890' },
  // { value: 1, label: '1234567891' },
  // { value: 2, label: '1234567892' }
];

const sucursalesInicial = [
  // { id: 0, 'nombre': 'Sucursal 1' }, 
  // { id: 1, 'nombre': 'Sucursal 2' }, 
  // { id: 2, 'nombre': 'Sucursal 3' },
  // { id: 3, 'nombre': 'Sucursal 4' },
  // { id: 4, 'nombre': 'Sucursal 5' },
  // { id: 5, 'nombre': 'Sucursal 6' },
  // { id: 6, 'nombre': 'Sucursal 7' },
  // { id: 7, 'nombre': 'Sucursal 8' },
  // { id: 8, 'nombre': 'Sucursal 9' },
  // { id: 9, 'nombre': 'Sucursal 10' },
  // { id: 10, 'nombre': 'Sucursal 11' },
  // { id: 11, 'nombre': 'Sucursal 12' },
  // { id: 12, 'nombre': 'Sucursal 13' },
  // { id: 13, 'nombre': 'Sucursal 14' },
  // { id: 14, 'nombre': 'Sucursal 15' },
  // { id: 15, 'nombre': 'Sucursal 16' },
  // { id: 16, 'nombre': 'Sucursal 17' },
  // { id: 17, 'nombre': 'Sucursal 18' },
  // { id: 18, 'nombre': 'Sucursal 19' },
  // { id: 19, 'nombre': 'Sucursal 20' }
];

const getPermisos = (usuario) => {
  return (usuario?.tipo === tiposUsuario.RH)
    ? [opcionesValidasTabla.AGREGAR]
    : [];
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
  const [empleados, setEmpleados] = React.useState(empleadosInicial);
  const [alerta, setAlerta] = React.useState({mensaje: '', severity: 'warning', open: false});
  const [cargos, setCargos] = React.useState(cargosInicial);
  const [personas, setPersonas] = React.useState(personasInicial);
  const [sucursales, setSucursales] = React.useState(sucursalesInicial);

  const opcionesValidas = getPermisos(usuario);

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
      field: 'id_persona',
      headerName: 'DNI',
      minWidth: 150,
      maxWidth: 300,
      editable: getEditable(usuario),
      type: 'singleSelect',
      valueOptions: personas
    },
    {
      field: 'nombre_completo',
      headerName: 'Nombre',
      minWidth: 150,
      maxWidth: 400,
      editable: false
    },
    {
      field: 'id_cargo',
      headerName: 'Cargo',
      minWidth: 150,
      maxWidth: 400,
      editable: getEditable(usuario),
      type: 'singleSelect',
      valueOptions: cargos
    },
    {
      field: 'id_sucursal',
      headerName: 'Sucursal',
      minWidth: 100,
      maxWidth: 250,
      editable: getEditable(usuario)
    },
    {
      field: 'tipo',
      headerName: 'Contrato',
      width: 150,
      editable: getEditable(usuario),
      type: 'singleSelect',
      valueOptions: Object.values(tiposContrato).map(tipo => ({value: tipo, label: tipo}))
    },
    {
      field: 'fecha_inicio',
      headerName: 'Inicio',
      width: 150,
      editable: getEditable(usuario),
      type: 'date',
      valueGetter: value => value && new Date(value)
    },
    {
      field: 'fecha_fin',
      headerName: 'Fin',
      width: 150,
      editable: false,
      type: 'date',
      valueGetter: value => value && new Date(value)
    },
    {
      field: 'salario',
      headerName: 'Salario',
      width: 150,
      editable: getEditable(usuario),
      type: 'number',
      valueFormatter: (value) => formatoMoneda.format(value)
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100,
      editable: false,
      type: 'boolean'
    }
  ];

  

  const getEmpleados = async () => {
    try {
      const response = await fetchApi().get('/empleados');
      if (response?.data) {
        const { empleados: listaEmpleados } = response.data;
        console.log(listaEmpleados)
        setEmpleados(
          listaEmpleados &&
          listaEmpleados
            .map(empleado => ({...empleado, id: parseInt(empleado.id)}))
        );
        setAlerta(alerta => ({...alerta, mensaje: 'Empleados cargadas exitosamente', severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar las empleados', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar las empleados al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }
  }

  const postEmpleado = async (empleado) => {
    const { id_persona, id_cargo, id_sucursal, tipo, fecha_inicio, salario } = empleado;
    try {
      const response = await fetchApi().post('/empleado', {
        id_persona, id_cargo, id_sucursal, tipo, fecha_inicio, salario
      });
      if (response?.data) {
        const { empleado: newEmpleado } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: `Empleado creado exitosamente`, severity: 'success', open: true}));

        return newEmpleado;
      }  else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al agregar el empleado', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar la creación del empleado al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }
  }

  const putEmpleado = async (empleado) => {
    const { id, id_persona, id_cargo, id_sucursal, tipo, fecha_inicio, salario } = empleado;

    try {
      const response = await fetchApi().put(`/empleado/${id}`, {
        id_persona, id_cargo, id_sucursal, tipo, fecha_inicio, salario
      });
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Empleado modificado exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al modificar la empleado', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la modificación de la empleado';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la modificación de la empleado al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const deleteEmpleado = async (empleado) => {
    const { id } = empleado;

    try {
      const response = await fetchApi().delete(`/empleado/${id}`);
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Empleado descartada exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al eliminar la empleado', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la eliminación de la empleado';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la eliminación de la empleado al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const siguienteId = async () => {
    try {
      const response = await fetchApi().get('/empleados/siguienteId');
      if (response?.data) {
        const { siguiente_id_empleados } = response.data;
        return siguiente_id_empleados;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar el siguiente id de la empleado', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar el siguiente id de empleado al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }
  }


  useEffect(() => {
    getEmpleados();
    getCargos()
      .then(cargos => {
        console.log(cargos);
        if (cargos) setCargos(cargos.map(cargo => ({value: cargo.id, label: cargo.nombre})));
      });
    getPersonas()
      .then(personas => {
        console.log(personas);
        if (personas) setPersonas(personas.map(persona => ({value: persona.id, label: persona.dni})));
      });
    getSucursales()
      .then(sucursales => {
        console.log(sucursales);
        if (sucursales) setSucursales(sucursales.map(sucursal => ({value: sucursal.id, label: sucursal.nombre})));
      });
  }, []);

  useEffect(() => {
    console.log(cargos);
    console.log(personas);
    console.log(sucursales);
  }, [cargos, personas, sucursales]);



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
                nombreModelo='empleado'
                encabezados={encabezadosTabla}
                opcionesValidas={opcionesValidas}
                datos={empleados}
                setDatos={setEmpleados}
                modelo={modeloEmpleado}
                siguienteId={siguienteId}
                onAgregar={postEmpleado}
                onEditar={putEmpleado}
                onEliminar={deleteEmpleado}
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