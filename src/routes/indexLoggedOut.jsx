import MainLayout from '../layouts/MainLayout';
import MainLayoutTop from '../layouts/MainLayoutTop';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import Proyectos from '../pages/Proyectos';
import Miembros from '../pages/Miembros';
import { Login } from '../pages/Login';
import Inicio from '../pages/Inicio';
import Proyecto from '../pages/Proyecto';
import Subir from '../pages/Subir';
import Referencia from '../pages/Referencia';
import EmptyLayout from '../layouts/EmptyLayout';
import Perfil from '../pages/Perfil';
import ProyectoPublico from '../pages/Proyectopublico';
import ProyectosPublicos from '../pages/Proyectopublico';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userAuthenticated } from '../app/authenticationSlice';



const routes = [
  {
    path: '/',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/usuarios',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/Proyectos',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/Proyectos/:id/Proyecto',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/Miembros',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/login',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/inicio',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/Subir',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/referencia',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/Subir',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/Perfil',
    layout: MainLayoutTop,
    element: Perfil,
  },
  {
    path: '/Proyectos/:id/Proyectopublico',
    layout: MainLayoutTop,
    element: ProyectoPublico,
  },
  {
    path: '/Proyectospublicos',
    layout: MainLayoutTop,
    element: ProyectosPublicos,
  },



];

export default routes;
