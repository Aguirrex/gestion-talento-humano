import React from 'react';
import './App.css'
import { Box, CssBaseline } from '@mui/material';
import Theme from './components/Theme'
import ListaRutas from './components/ListaRutas';
import UsuarioProvider from './customHooks/UsuarioProvider';

function App() {
  return (
    <Theme>
      <CssBaseline />
      <UsuarioProvider>
        <Box>
          <ListaRutas />
        </Box>
      </UsuarioProvider>
    </Theme>
  );
}

export default App;
