import React from 'react';
import { Container, TextField, Button, Stack, Typography, Paper } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useUsuarioContext } from '../../customHooks/UsuarioProvider';
import { AlertaPrincipal } from '../common/Alertas';
import { fetchApi, setTokenUsuario } from '../../tools/connectionApi';

import logo from '../../assets/logo.png';

const Login = () => {
  const { setUsuario } = useUsuarioContext();
  const [alerta, setAlerta] = React.useState(false);
  // const [cargando, setCargando] = React.useState(false);

  const dataAlerta = React.useRef({mensaje: '', severity: 'warning'});

  const navigate = useNavigate();

  const {
    errors: formikErrors, 
    getFieldProps: getFormikProps, 
    handleSubmit: formikSubmit,
    touched: formikTouched,
    resetForm: resetFormikForm 
  } = useFormik({
    initialValues: {
      dni: '',
      password: ''
    },
    validationSchema: Yup.object({
      dni: Yup.number().required('Campo obligatorio'),
      password: Yup.string().required('Campo obligatorio')
    }),
    onSubmit: (inputs) => {
      // setCargando(true);
      fetchApi().post('/login', {
        data: {
          dni: inputs.dni,
          password: inputs.password
        }
      })
      .then(response => {
        // console.log(response);
        if (response.data.usuario && response.data.token !== null && response.data.message.toUpperCase() === 'OK') {
          setTokenUsuario(response.data.token);

          const { dni, tipo } = response.data.usuario;
          setUsuario({ dni, tipo });
          
          navigate('/gh', { replace: true });
        } else {
          setTokenUsuario(null);
          setUsuario(null);
          dataAlerta.current = {msg: 'Datos incorrectos', severity: 'warning'};
          setAlerta(true);
        }
        resetFormikForm();
        // setCargando(false);
      })
      .catch(err => {
        if(err.response) {
          if (err.response.status === 400) {
            dataAlerta.current = {msg: 'Datos incorrectos', severity: 'warning'};
          } else {
            dataAlerta.current = {msg: err.response.data.message, severity: 'error'};
            console.log(err.response);
          }
        } else {
          dataAlerta.current = {msg: 'El servidor no responde', severity: 'error'};
        }
        setAlerta(true);
        // setCargando(false);
      });
    }
  });

  return (
    <Container maxWidth='xs' sx={{ height: '100%' }}>
      <Paper elevation={2} sx={{ p: 5, mt: 10 }}>
        <Stack justifyContent='center' component='form' onSubmit={e => formikSubmit(e)}>
          {alerta && <AlertaPrincipal mensaje={dataAlerta.current.msg} severity={dataAlerta.current.severity} onClose={() => setAlerta(false)} />}
          <img src={logo} alt='logo' style={{ width: 100, height: 100, margin: '0 auto' }} />
          <Typography 
            variant='h4' 
            textAlign='center' 
            color='primary.dark'
            sx={{ fontWeight: 'bold', mb: 4 }}>
            Iniciar sesión
          </Typography>
          <TextField 
            label='Documento' 
            size='small' 
            type='number' 
            required
            name='dni'
            autoFocus
            error={formikTouched.dni && formikErrors.dni}
            helperText={formikTouched.dni && formikErrors.dni}
            {...getFormikProps('dni')}
            sx={{ mb: 3 }} />
          <TextField 
            label='Contraseña' 
            size='small' 
            type='password' 
            required
            name='password'
            error={formikTouched.password && formikErrors.password}
            helperText={formikTouched.password && formikErrors.password}
            {...getFormikProps('password')}
            sx={{ mb: 3 }} />
          <Button variant='contained' color='primary' type='submit' sx={{ mt: 3 }}>Iniciar sesión</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Login;