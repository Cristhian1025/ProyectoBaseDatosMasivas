import { createRouter, createWebHistory } from 'vue-router';

import Inicio from '../components/Inicio.vue';
import Clientes from '../components/Clientes.vue';
import Empleados from '../components/Empleados.vue';
import Planes from '../components/Planes.vue';
import Usuarios from '../components/Usuarios.vue'; // Asegúrate que el nombre y path coincidan

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/inicio',
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: Inicio,
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Usuarios,
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: Clientes,
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: Empleados,
    },
    {
      path: '/planes',
      name: 'planes',
      component: Planes,
    },
  ],
});

export default router;
