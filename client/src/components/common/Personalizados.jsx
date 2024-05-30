import React from 'react';
import { Link as LinkRouter, useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Button } from '@mui/material';
import { DataGrid, GridRowModes, GridActionsCellItem, GridRowEditStopReasons, GridToolbarContainer } from '@mui/x-data-grid';
import { NavigateNext as NavigateNextIcon, SaveOutlined as SaveIcon, Close as CancelIcon, EditOutlined as EditIcon, DeleteOutlined as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { opcionesMenuLateral } from './constantes';
import { AlertaConfirmacion } from './Alertas';
import { opcionesValidasTabla } from './constantes';

const LinkCustom = React.forwardRef((itemProps, ref) => {
  return <LinkRouter ref={ref} {...itemProps} role={undefined} />;
});

const getTitulosRuta = (opciones, ruta, titulos) => {
  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i]?.ruta === ruta) {
      titulos.push({titulo: opciones[i].texto, ruta: opciones[i].ruta});
      break;
    };
    if (opciones[i]?.children) {
      getTitulosRuta(opciones[i].children, ruta, titulos);
    }

    if (titulos.length > 0) break;
  }

  return titulos;
};

const BreadcrumbsCustom = () => {
  const location = useLocation();
  const [titulos, setTitulos] = React.useState([]);

  React.useEffect(() => {
    const newTitulos = getTitulosRuta(opcionesMenuLateral, location.pathname, []);
    setTitulos(newTitulos.reverse());
  }, [location]);

  return (
    <>
      {
        titulos && 
        <Breadcrumbs 
          aria-label='miga de pan' 
          separator={<NavigateNextIcon />}
          sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 1, 
            p: 1,
            pl: 2, 
            border: theme => `1px solid ${theme.palette.grey['300']}` }}>
          <Link component={LinkCustom} to='/gth'>Inicio</Link>
          {titulos.map((opcion, index) => (
            index < titulos.length - 1 ?  
            <Link key={index} component={LinkCustom} to={opcion.ruta}>
              {opcion.titulo}
            </Link> : 
            <Typography key={index}>
              {opcion.titulo}
            </Typography>
          ))}
        </Breadcrumbs>
      }
    </>
  );
};


const TablaToolbar = ({ setDatos, setModosFilas, siguienteId, modelo, nombreModelo }) => {

  const manejarClick = () => {
    siguienteId().then((newId) => {
      console.log(newId);
      if (!newId) return;

      setDatos((oldFilas) => [...oldFilas, { ...modelo, id: newId, isNew: true }]);
      setModosFilas((oldModel) => ({
        ...oldModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: Object.keys(modelo)[1] },
      }));
    });
  };

  return (
    <GridToolbarContainer>
      <Button 
        color='primary' 
        startIcon={<AddIcon />} 
        onClick={manejarClick}
        variant='contained'
        sx={{ m: 1, mb: 1 }}>
        Agregar {nombreModelo ? nombreModelo[0].toUpperCase() + nombreModelo.slice(1): ''}
      </Button>
    </GridToolbarContainer>
  );
};


const TablaEditable = ({ nombreModelo, encabezados, datos, setDatos, opcionesValidas, modelo, onAgregar, onEditar, onEliminar, siguienteId, sx }) => {

  // const [filas, setDatos] = React.useState(datos);
  const [modosFilas, setModosFilas] = React.useState({});
  const filasEditadas = React.useRef({});
  const [cargando, setCargando] = React.useState(false);
  const [alertaEliminar, setAlertaEliminar] = React.useState(false);

  const filaEliminar = React.useRef(null);
  
  
  const manejarClickEditar = ({ row: filaActual }) => () => {
    setModosFilas({ ...modosFilas, [filaActual.id]: { mode: GridRowModes.Edit } });
  };

  const manejarClickGuardar = ({ row: filaActual, ...otros }) => () => {
    setModosFilas({ ...modosFilas, [filaActual.id]: { mode: GridRowModes.View } });
  };

  const manejarClickCancelar = ({ row: filaActual }) => () => {
    setModosFilas({ ...modosFilas, [filaActual.id]: { mode: GridRowModes.View, ignoreModifications: true } });
    const filaEditada = datos.find((fila) => fila.id === filaActual.id);
    if (filaEditada?.isNew) {
      setDatos(datos.filter((fila) => fila.id !== filaActual.id));
    }
    filaEliminar.current = null;
  };

  const manejarClickEliminar = ({ row: filaActual }) => () => {
    setAlertaEliminar(true);
    filaEliminar.current = filaActual;
  };

  const manejarConfirmarEliminar = () => {
    setAlertaEliminar(false);
    const { id } = filaEliminar.current;

    setCargando(true);

    let resultado = false;
    resultado = onEliminar(filaEliminar.current);

    resultado.then((res) => {
      if (!res) return;
      setDatos(oldDatos => oldDatos.filter((fila) => fila.id !== id));
    })
    .finally(() => {
      setCargando(false);
    });

    filaEliminar.current = null;
  };

  const procesarCambiosFila = (newFila) => {
    let filaModif = { ...newFila, isNew: newFila.isNew ? true : false};

    setCargando(true);

    let resultado = false;
    if (newFila?.isNew) {
      resultado = onAgregar(newFila);
    } else {
      resultado = onEditar(newFila);
    }

    resultado.then((res) => {
      if (res) {
        if (res !== true) {
          filaModif = { ...filaModif, ...res };
        }
        setModosFilas({ ...modosFilas, [newFila.id]: { mode: GridRowModes.View } });
      } else {
        setModosFilas({ ...modosFilas, [newFila.id]: { mode: GridRowModes.Edit } });
      }
      setDatos(oldDatos => oldDatos.map(fila => (fila.id === newFila.id ? filaModif : fila)));
      return filaModif;
    })
    .finally(() => {
      setCargando(false);
    });

    return filaModif;
  };

  const manejarCambioModos = (newModos) => {
    setModosFilas(newModos);
  };
    

  const manejarEditStop = (params, event) => {
    console.log(params);
    console.log(event);
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
    if (params.reason === GridRowEditStopReasons.escapeKeyDown) {
      setDatos(oldDatos => oldDatos.filter((fila) => fila.id !== params.row.id));
    }
  };

  const opciones = opcionesValidas ? {
    field: 'opciones',
    headerName: 'Opciones',
    width: 150,
    type: 'actions',
    getActions: (fila) => {
      const modoEditar = modosFilas[fila.id]?.mode === GridRowModes.Edit;

      if (modoEditar) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label='Guardar'
            sx={{
              color: 'primary.main',
            }}
            onClick={manejarClickGuardar(fila)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label='Cancelar'
            onClick={manejarClickCancelar(fila)}
          />,
        ];
      }

      let opcionesModoVista = [];
      if (opcionesValidas.includes(opcionesValidasTabla.EDITAR)) {
        opcionesModoVista.push(
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Editar'
            onClick={manejarClickEditar(fila)}
          />
        );
      }
      if (opcionesValidas.includes(opcionesValidasTabla.ELIMINAR)) {
        opcionesModoVista.push(
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Eliminar'
            onClick={manejarClickEliminar(fila)}
          />
        );
      }

      return opcionesModoVista;
    },
  } : null;

  const encabezadosTabla = [...encabezados, opciones];

  return (
    <>
      <DataGrid
        density='compact'
        rows={datos}
        columns={encabezadosTabla}
        editMode='row'
        rowModesModel={modosFilas}
        onRowModesModelChange={manejarCambioModos}
        onRowEditStop={manejarEditStop}
        processRowUpdate={procesarCambiosFila}
        onProcessRowUpdateError={(params) => console.log(params)}
        isCellEditable={opcionesValidas.includes(opcionesValidasTabla.EDITAR) ? () => true : params => params.row.isNew}
        loading={cargando}
        getRowClassName={params => modosFilas[params.row.id]?.mode === GridRowModes.Edit ? 'fila-editando' : ''}
        slotProps={{
          toolbar: {
            setDatos, setModosFilas, siguienteId, modelo, nombreModelo
          }
        }}
        slots={{
          toolbar: TablaToolbar
        }}
        sx={{
          ...sx,
          '& .MuiDataGrid-toolbarContainer': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeader': {
            bgcolor: 'background.paper',            
            borderRight: theme => `1px solid ${theme.palette.grey['300']}`,
          },
          '& .MuiDataGrid-cell': {
            bgcolor: 'background.paper',       
            borderRight: theme => `1px solid ${theme.palette.grey['300']}`,
          },
          '& .MuiDataGrid-filler': {
            bgcolor: 'background.paper',
          },
          '& .MuiDataGrid-cellEmpty': {       
            borderRight: 'none',
          },
          '& .fila-editando': {
            '& .MuiDataGrid-cell': {
              bgcolor: 'secondary.light',
            },
          },
          '& .MuiDataGrid-main': {
            m: 1,
            border: theme => `1px solid ${theme.palette.grey['300']}`,
            borderRadius: 1,
          },
        }}
      />
      <AlertaConfirmacion
        titulo='Eliminar registro'
        mensaje='¿Está seguro que desea eliminar  el registro?'
        open={alertaEliminar}
        setOpen={setAlertaEliminar}
        onConfirmar={manejarConfirmarEliminar}
        onCancelar={manejarConfirmarEliminar} 
        />
    </>
  );
};

export { LinkCustom, BreadcrumbsCustom, TablaEditable };