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
import { Candidatos } from './gth/candidatos';
import { Personas } from './gth/personas';
import { Empleados } from './gth/empleados';
import { Novedades } from './gth/novedades';
import { Nomina } from './gth/nomina';



const ListaRutas = () => {
  return (
    <Routes>
      <Route path='/' element={<Inicio.Presentacion />} />
      <Route path='/login' element={<Inicio.Login />} />
      <Route path='/gth' element={<AuthUsuario><Navegacion /></AuthUsuario>}>
        <Route index element={<Dashboard />} />
        <Route path='sucursales' element={<Sucursales />} />
        <Route path='cargos' element={<Cargos />} />
        <Route path='personas' element={<Personas />} />
        <Route path='seleccion'>
          <Route path='vacantes' element={<Vacantes />} />
          <Route path='candidatos' element={<Candidatos />} />
        </Route>
        <Route path='empleados'>
          <Route path='listado' element={<Empleados />} />
          <Route path='novedades' element={<Novedades />} />
        </Route>
        <Route path='nomina' element={<Nomina />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default ListaRutas;