import React from 'react';
import { Alert } from '@mui/material';

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