import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Inicio from './inicio';
import AuthUsuario from './middlewares/AuthUsuario';
import Dashboard from './gth/Dashboard';
import Navegacion from './gth/Navegacion';
import NotFound from './NotFound';

const ListaRutas = () => {
  return (
    <Routes>
      <Route path='/' element={<Inicio.Presentacion />} />
      <Route path='/login' element={<Inicio.Login />} />
      <Route path='/gth' element={<AuthUsuario><Navegacion /></AuthUsuario>}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default ListaRutas;