import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { BreadcrumbsCustom, TablaEditable } from '../../common/Personalizados';
import { useUsuarioContext } from '../../../customHooks/UsuarioProvider';
import { opcionesValidasTabla, tiposDocumento, tiposUsuario } from '../../common/constantes';
import { fetchApi } from '../../../tools/connectionApi';
import { AlertaFlotante } from '../../common/Alertas';

const modeloPersona = {
  id: 0,
  dni: '',
  tipo_documento: '',
  nombre1: '',
  nombre2: '',
  apellido1: '',
  apellido2: '',
  direccion: '',
  telefono: '',
  email: '',
  celular: '',
};

const personasInicial = [
  {id: 0, id_persona: 0, dni: '123456789', tipo_documento: 'CC', email: 'juanpablo@mail.com', nombre1: 'Juan', nombre2: 'Pablo', apellido1: 'Garcia', apellido2: 'Montes', direccion: 'Calle 123', telefono: '1234567', celular: '1234567890'},
  {id: 1, id_persona: 1, dni: '41234123', tipo_documento: 'CC', email: 'juanjose@mail.com', nombre1: 'Juan', nombre2: 'José', apellido1: 'Sierra', apellido2: 'Arroyave', direccion: 'Calle 456', telefono: '7654321', celular: '9876543210'},
  {id: 2, id_persona: 2, dni: '42123534643', tipo_documento: 'CC', email: 'juanmiguel@mail.com', nombre1: 'Juan', nombre2: 'Miguel', apellido1: 'Aguirre', apellido2: 'Bedoya', direccion: 'Calle 789', telefono: '1234123', celular: '1234123412'},
];

const getPermisos = (usuario) => {
  return (usuario?.tipo === tiposUsuario.RH) 
    ? [opcionesValidasTabla.EDITAR, opcionesValidasTabla.AGREGAR] 
    : [];
}

const getEditable = (usuario) => {
  return (usuario?.tipo === tiposUsuario.RH) 
    ? true 
    : false;
}

const Main = () => {

  const { usuario } = useUsuarioContext();
  const [personas, setPersonas] = React.useState(personasInicial);
  const [alerta, setAlerta] = React.useState({mensaje: '', severity: 'warning', open: false});

  const opcionesValidas = getPermisos(usuario);

  const encabezadosTabla = [
    {
      field: 'dni',
      headerName: 'DNI',
      width: 200,
      type: 'number',
      editable: getEditable(usuario),
      valueParser: value => value && value.length <= 15 ? value : value.slice(0, 15),
    },
    {
      field: 'tipo_documento',
      headerName: 'Tipo Doc.',
      width: 100,
      editable: getEditable(usuario),
      type: 'singleSelect',
      valueOptions: Object.values(tiposDocumento).map(tipo => ({value: tipo, label: tipo}))
    },
    {
      field: 'nombre1',
      headerName: 'Primer Nombre',
      width: 200,
      editable: getEditable(usuario),
      valueParser: value => value && value.length <= 50 ? value : value.slice(0, 50),
    },
    {
      field: 'nombre2',
      headerName: 'Segundo Nombre',
      width: 200,
      editable: getEditable(usuario),
      valueParser: value => value && value.length <= 50 ? value : value.slice(0, 50),
    },
    {
      field: 'apellido1',
      headerName: 'Primer Apellido',
      width: 200,
      editable: getEditable(usuario),
      valueParser: value => value && value.length <= 50 ? value : value.slice(0, 50),
    },
    {
      field: 'apellido2',
      headerName: 'Segundo Apellido',
      width: 200,
      editable: getEditable(usuario),
      valueParser: value => value && value.length <= 50 ? value : value.slice(0, 50),
    },
    {
      field: 'direccion',
      headerName: 'Dirección',
      minWidth: 100,
      maxWidth: 300,
      editable: getEditable(usuario),
      valueParser: value => value && value.length <= 100 ? value : value.slice(0, 100),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: getEditable(usuario)
    },
    {
      field: 'celular',
      headerName: 'Celular',
      width: 200,
      type: 'number',
      editable: getEditable(usuario),
      valueParser: value => value && value.length <= 10 ? value : value.slice(0, 10),
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      width: 200,
      type: 'number',
      editable: getEditable(usuario),
      valueParser: value => value && value.length <= 7 ? value : value.slice(0, 7),
    },
  ];

  const getPersonas = async () => {
    try {
      const response = await fetchApi().get('/personas');
      if (response?.data) {
        const { personas: listaPersonas } = response.data;
        setPersonas(
          listaPersonas &&
          listaPersonas
            .filter(persona => persona?.estado ?? true)
            .map(persona => ({...persona, id: parseInt(persona.id)}))
        );
        setAlerta(alerta => ({...alerta, mensaje: 'Personas cargadas exitosamente', severity: 'success', open: true}));
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
  }

  const postPersona = async (persona) => {
    const { dni, tipo_documento, nombre1, nombre2, apellido1, apellido2, direccion, telefono, celular, email } = persona;
    console.log(persona);

    try {
      const response = await fetchApi().post('/persona', {
        dni, tipo_documento, nombre1, nombre2, apellido1, apellido2, direccion, telefono, celular, email
      });
      if (response?.data) {
        const { persona: newPersona } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: `Persona ${newPersona.nombre} creada exitosamente`, severity: 'success', open: true}));
      }  else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al agregar la persona', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar la creación de la persona al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const putPersona = async (persona) => {
    const { id, dni, tipo_documento, nombre1, nombre2, apellido1, apellido2, direccion, telefono, celular, email } = persona;
    console.log(persona);

    try {
      const response = await fetchApi().put(`/persona/${id}`, {
        dni, tipo_documento, nombre1, nombre2, apellido1, apellido2, direccion, telefono, celular, email
      });
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Persona modificada exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al modificar la persona', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la modificación de la persona';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la modificación de la persona al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const deletePersona = async (persona) => {
    const { id } = persona;

    try {
      const response = await fetchApi().delete(`/persona/${id}`);
      if (response?.data) {
        setAlerta(alerta => ({...alerta, mensaje: `Persona eliminada exitosamente`, severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al eliminar la persona', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        if (err.response.status === 400) {
          mensajeError = 'Datos incorrectos para la eliminación de la persona';
        } else {
          mensajeError = err.response.data.message;
        }
      } else {
        mensajeError = 'Error al solicitar la eliminación de la persona al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }

    return true;
  }

  const siguienteId = async () => {
    try {
      const response = await fetchApi().get('/personas/siguienteId');
      if (response?.data) {
        const { siguiente_id_personas } = response.data;
        return siguiente_id_personas;
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar el siguiente id de la persona', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar el siguiente id de persona al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }
  }


  useEffect(() => {
    getPersonas();
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
              nombreModelo='persona'
              encabezados={encabezadosTabla}
              opcionesValidas={opcionesValidas}
              datos={personas}
              setDatos={setPersonas}
              modelo={modeloPersona}
              siguienteId={siguienteId}
              onAgregar={postPersona}
              onEditar={putPersona}
              onEliminar={deletePersona}
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