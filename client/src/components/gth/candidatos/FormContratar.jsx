import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import * as LocaleES from 'dayjs/locale/es';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Backdrop, Button, CircularProgress, FormGroup, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { tiposContrato } from '../../common/constantes';
import { FormControlLabel, Checkbox } from '@mui/material';



const FormContratar = ({ candidato, sucursales, contratarCandidato }) => {

  const [loading, setLoading] = React.useState(false);

  const {
    errors: formikErrors, 
    getFieldProps: getFormikProps, 
    handleSubmit: formikSubmit,
    touched: formikTouched,
    resetForm: resetFormikForm,
    values: formikValues,
    setFieldValue: setFormikFieldValue
  } = useFormik({
    initialValues: {
      tipo: Object.values(tiposContrato)[0],
      id_sucursal: sucursales[0].id,
      fecha_inicio: dayjs(),
      contratacion_mision_plus: false,
      salario: 1300000,
    },
    validationSchema: Yup.object({
      tipo: Yup.string().required('Campo obligatorio'),
      id_sucursal: Yup.number().required('Campo obligatorio').oneOf(sucursales.map(sucursal => sucursal.id), 'Sucursal no válida'),
      contratacion_mision_plus: Yup.boolean(),
      salario: Yup.number().required('Campo obligatorio').min(1, 'El salario debe ser mayor a 0'),
    }),
    onSubmit: (inputs) => {
      console.log(inputs);
      setLoading(true);
      contratarCandidato(candidato, { ...inputs })
        .then(() => {
          resetFormikForm();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  React.useEffect(() => {
    console.log(formikValues);
  }, [formikValues]);

  React.useEffect(() => console.log(loading), [loading]);


  return (
    <Stack justifyContent='center' component='form' onSubmit={e => formikSubmit(e)}>
      <Typography 
        variant='h5' 
        textAlign='center' 
        color='primary.dark'
        sx={{ fontWeight: 'bold', mb: 2 }}>
        Contratar candidato
      </Typography>
      <Typography>
        <strong>DNI:</strong> {candidato.dni}
      </Typography>
      <Typography>
        <strong>Nombre:</strong> {candidato.nombre_completo} 
      </Typography>
      <Typography sx={{ mb: 3 }}>
        <strong>Cargo:</strong> {candidato.nombre_cargo} 
      </Typography>
      <TextField
        select
        label='Tipo'
        name='tipo' 
        error={formikTouched.tipo && formikErrors.tipo?.length > 0}
        size='small' 
        helperText={formikErrors.tipo}
        required
        {...getFormikProps('tipo')}
        sx={{ mb: 2 }}
      >
        {Object.values(tiposContrato).map((tipo, index) => (
          <MenuItem key={index} value={tipo}>{tipo}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label='Sucursal'
        name='id_sucursal' 
        error={formikTouched.id_sucursal && formikErrors.id_sucursal?.length > 0}
        size='small' 
        helperText={formikErrors.id_sucursal}
        required
        {...getFormikProps('id_sucursal')}
        sx={{ mb: 2 }}
      >
        {sucursales.map((sucursal, index) => (
          <MenuItem key={index} value={sucursal.id}>{sucursal.nombre}</MenuItem>
        ))}
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={LocaleES.name}>
        <DatePicker
          label='Fecha inicio'
          name='fecha_inicio'
          defaultValue={dayjs()}
          error={formikTouched.fecha_inicio && formikErrors.fecha_inicio?.length > 0}
          size='small' 
          minDate={dayjs()}
          helperText={formikErrors.fecha_inicio}
          required
          onChange={date => setFormikFieldValue('fecha_inicio', date, false)}
          sx={{ mb: 2 }}
        />
      </LocalizationProvider>
      <TextField
        label='Salario'
        name='salario' 
        type='number'
        error={formikTouched.salario && formikErrors.salario?.length > 0}
        size='small' 
        helperText={formikErrors.salario}
        required
        {...getFormikProps('salario')}
        sx={{ mb: 2 }}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name='contratacion_mision_plus' 
              {...getFormikProps('contratacion_mision_plus')}
            />
          }
          label='Contratación Misión Plus'
        />
      </FormGroup>
      <Button 
        variant='contained' 
        color='primary' 
        type='submit' 
        disabled={loading}
        startIcon={loading && <CircularProgress color='primary' size={20} />} 
        sx={{ mt: 3 }}
      >
        Contratar
      </Button>
    </Stack>
  );

};

export default FormContratar;