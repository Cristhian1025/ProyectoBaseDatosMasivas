import Dashboard from './components/Dashboard.vue'; // Ajusta la ruta si es necesario

<template>
  <div id="app">
    <Dashboard>
      <h1>Bienvenido a tu Dashboard</h1>
      <p>Este es el contenido principal de tu aplicación.</p>
    </Dashboard>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Dashboard from './components/Dashboard.vue';

export default defineComponent({
  components: {
    Dashboard,
  },
});
</script>