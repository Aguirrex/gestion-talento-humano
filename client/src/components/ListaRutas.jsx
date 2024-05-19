import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Inicio from './inicio';
import AuthUsuario from './middlewares/AuthUsuario';
import Dashboard from './gth/Dashboard';
import Navegacion from './gth/Navegacion';
import NotFound from './NotFound';

import { Sucursales } from './gth/sucursales';
import { Cargos } from './gth/cargos';
import { Vacantes } from './gth/vacantes';



const ListaRutas = () => {
  return (
    <Routes>
      <Route path='/' element={<Inicio.Presentacion />} />
      <Route path='/login' element={<Inicio.Login />} />
      <Route path='/gth' element={<AuthUsuario><Navegacion /></AuthUsuario>}>
        <Route index element={<Dashboard />} />
        <Route path='sucursales' element={<Sucursales />} />
        <Route path='cargos' element={<Cargos />} />
        <Route path='seleccion'>
          <Route path='vacantes' element={<Vacantes />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default ListaRutas;