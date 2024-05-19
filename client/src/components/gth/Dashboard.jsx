import React from 'react';

import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ width: '100%', p: 1, display: 'flex', alignItems: 'center' }}>
      <Typography variant='h2' fontWeight='bold' textAlign='center' sx={{ flexGrow: 1 }}>Dashboard</Typography>
    </Box>
  );
}

export default Dashboard;