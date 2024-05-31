import React, { useEffect } from 'react';
import { Grid, Box, Link } from '@mui/material';
import { BreadcrumbsCustom, TablaEditable } from '../../common/Personalizados';
import { useUsuarioContext } from '../../../customHooks/UsuarioProvider';
import { opcionesValidasTabla, tiposUsuario } from '../../common/constantes';
import { fetchApi } from '../../../tools/connectionApi';
import { AlertaFlotante } from '../../common/Alertas';
import dayjs from 'dayjs';

const modeloNomina = {
  id: 0,
  id_periodo_quincenal: 0,
  url_nomina_pdf: '',
  url_nomina_excel: '',
};

const nominasInicial = [
  { id: 0, id_periodo_quincenal: 0, url_nomina_pdf: 'https://es.wikipedia.org/wiki/PDF', url_nomina_excel: 'https://es.wikipedia.org/wiki/Microsoft_Excel'},
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
  return (usuario?.tipo === tiposUsuario.RH)
  ? [opcionesValidasTabla.AGREGAR]
  : [];
}

const getEditable = (usuario) => {
  return (usuario?.tipo === tiposUsuario.RH) 
    ? true 
    : false;
}

const Main = () => {

  const { usuario } = useUsuarioContext();
  const [nominas, setNominas] = React.useState(nominasInicial);
  const [alerta, setAlerta] = React.useState({mensaje: '', severity: 'warning', open: false});
  const [periodosQuincenales, setPeriodosQuincenales] = React.useState(periodosQuincenalesInicial);

  const opcionesValidas = getPermisos(usuario);

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
      field: 'id_periodo_quincenal',
      headerName: 'Periodo Quincenal',
      width: 200,
      editable: getEditable(usuario),
      type: 'singleSelect',
      valueOptions: periodosQuincenales
    },
    {
      field: 'url_nomina_pdf',
      headerName: 'Nómina PDF',
      width: 200,
      editable: false,
      renderCell: (params) => (
        params?.value ? <Link href={params.value} target='_blank' rel='noopener'>PDF</Link> : null
      )
    },
    {
      field: 'url_nomina_excel',
      headerName: 'Nómina Excel',
      width: 200,
      editable: false,
      renderCell: (params) => (
        params?.value ? <Link href={params.value} target='_blank' rel='noopener'>Excel</Link> : null
      )
    },
  ];

  

  const getNominas = async () => {
    try {
      const response = await fetchApi().get('/nominas');
      if (response?.data) {
        const { nominas: listaNominas } = response.data;
        setNominas(
          listaNominas &&
          listaNominas
            .map((nomina, index) => ({...nomina, id: index}))
        );
        setAlerta(alerta => ({...alerta, mensaje: 'Nóminas cargadas exitosamente', severity: 'success', open: true}));
      } else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al solicitar las nóminas', severity: 'error', open: true}));
        console.log(response);
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar las nóminas al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));
    }
  }

  const postNomina = async (nomina) => {
    const { id_periodo_quincenal } = nomina;

    try {
      const response = await fetchApi().post('/nomina', {
        id_periodo_quincenal
      });
      if (response?.data) {
        const { nomina: newNomina } = response.data;
        setAlerta(alerta => ({...alerta, mensaje: `Nómina ${newNomina.titulo} creada exitosamente`, severity: 'success', open: true}));

        return newNomina;
      }  else {
        setAlerta(alerta => ({...alerta, mensaje: 'Ocurrió algo inesperado al agregar la nómina', severity: 'error', open: true}));
        console.log(response);

        return false;
      }
    } catch (err) {
      let mensajeError = '';
      if(err.response) {
        mensajeError = err.response.data.message;
      } else {
        mensajeError = 'Error al solicitar la creación de la nómina al servidor';
      }
      setAlerta(alerta => ({...alerta, mensaje: mensajeError, severity: 'error', open: true}));

      return false;
    }
  }

  const putNomina = async (nomina) => {
    return false;
  }

  const deleteNomina = async (nomina) => {
    return false;
  }

  const siguienteId = async () => {
    return nominas.length;
  }


  useEffect(() => {
    const nominasPromise = getNominas();
    const periodosPromise = getPeriodosQuincenales();
    Promise.all([nominasPromise, periodosPromise]).then(([nominas, periodos]) => {
      console.log(periodos);
      if (periodosQuincenales && nominas && typeof nominas === Array) {
        setPeriodosQuincenales(
          periodosQuincenales
            .filter(periodoQuincenal => nominas.find(nomina => nomina.id_periodo_quincenal === periodoQuincenal.value) === undefined)
            .map(periodoQuincenal => {
              return {
                value: periodoQuincenal.id, 
                label: `${periodoQuincenal.periodo}° Quin. ${dayjs(new Date(periodoQuincenal.year, periodoQuincenal.mes)).format('MMMM YYYY')}`
              };
            })
        );
      }
    });
  }, []);

  useEffect(() => {
    console.log(periodosQuincenales);
  }, [periodosQuincenales]);



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
                nombreModelo='nomina'
                encabezados={encabezadosTabla}
                opcionesValidas={opcionesValidas}
                datos={nominas}
                setDatos={setNominas}
                modelo={modeloNomina}
                siguienteId={siguienteId}
                onAgregar={postNomina}
                onEditar={putNomina}
                onEliminar={deleteNomina}
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