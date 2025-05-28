import { createRouter, createWebHistory } from 'vue-router';

import Inicio from '../components/Inicio.vue';
import Clientes from '../components/Clientes.vue';
import Empleados from '../components/Empleados.vue';
import Planes from '../components/Planes.vue';
import Usuarios from '../components/Usuarios.vue';
import Medidas from '../components/medidas.vue';
import Subs from '../components/subs.vue'; 
import Gimnasios from '../components/gimnasios.vue'; // Asegúrate que el nombre y path coincidan

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
      path: '/gimnasios',
      name: 'gimnasios',
      component: Gimnasios,
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
    {
      path: '/medidas',
      name: 'medidas',
      component: Medidas,
    },
    {
      path: '/subs',
      name: 'subs',
      component: Subs,
    },
  ],
});

export default router;
