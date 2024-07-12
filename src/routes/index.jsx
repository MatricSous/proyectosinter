import MainLayout from '../layouts/MainLayout';
import MainLayoutTop from '../layouts/MainLayoutTop';
import MainLayoutAdmin from '../layouts/MainLayoutAdmin';
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
import ImageGallery from '../pages/TesterImagenes';


//import Referencia from '../pages/Referencia';
const routes = [
  {
    path: '/',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/usuarios',
    layout: MainLayoutTop,
    element: Usuarios,
  },
  {
    path: '/PerfilAdmin',
    layout: MainLayoutAdmin,
    element: Perfil,
  },
  {
    path: '/Proyectos',
    layout: MainLayoutTop,
    element: Proyectos,
  },
  {
    path: '/Proyecto/:id',
    layout: MainLayoutTop,
    element: Proyecto,
  },
  {
    path: '/Proyecto/Referencia/:id',
    layout: MainLayoutTop,
    element: Referencia,
  },
  {
    path: '/Miembros',
    layout: MainLayoutTop,
    element: Miembros,
  },
  {
    path: '/login',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/inicio',
    layout: MainLayoutTop,
    element: Inicio,
  },
  {
    path: '/Subir',
    layout: MainLayoutTop,
    element: Subir,
  },
  {
    path: '/referencia',
    layout: MainLayoutTop,
    element: Referencia,
  },
  {
    path: '/Subir',
    layout: MainLayout,
    element: Subir,
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
  {
    path: '/TestImg',
    layout: MainLayoutTop,
    element: ImageGallery,
  },
  {
    path: '/Proyecto/:id',
    layout: MainLayoutTop,
    element: Proyecto,
  },


];

export default routes;
