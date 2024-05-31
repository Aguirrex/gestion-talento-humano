import React from 'react';
import { Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const AlertaPrincipal = ({ severity, onClose, mensaje }) => {
  return (
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{ mb: 2 }}
    >
      {mensaje}
    </Alert>
  );
};

export const AlertaConfirmacion = ({ titulo, mensaje, open, setOpen, onConfirmar, onCancelar }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        onCancelar();
      }}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {titulo}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {mensaje}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => {
            setOpen(false);
            onCancelar();
          }}
          variant='contained'>
          Cancelar
        </Button>
        <Button 
          onClick={() => {
            setOpen(false);
            onConfirmar();
          }} 
          variant='contained'
          color='error'
          autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export const AlertaFlotante = ({ mensaje, severity, open, setOpen }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <Alert 
        onClose={() => setOpen(false)}
        severity={severity}
        variant='filled'
        sx={{ width: '100%' }}>
        {mensaje}
      </Alert>
    </Snackbar>
  );
}