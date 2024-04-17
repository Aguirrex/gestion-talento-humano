import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Inicio from './inicio';
import AuthUsuario from './middlewares/AuthUsuario';
import Dashboard from './gh/Dashboard';

const ListaRutas = () => {
  return (
    <Routes>
      <Route path='/' element={<Inicio.Presentacion />} />
      <Route path='/login' element={<Inicio.Login />} />
      <Route path='/gh'>
        <Route index element={<AuthUsuario><Dashboard /></AuthUsuario>} />
      </Route>
    </Routes>
  );
};

export default ListaRutas;