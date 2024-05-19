import React from 'react';
import { Typography, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box height='100vh' width='100wh' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant='h2' fontWeight='bold' textAlign='center'>Página no encontrada</Typography>
    </Box>
  );
};

export default NotFound;