<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestión de Empleados</h2>
    <div class="mb-4">
        <button @click="addEmpleado" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Añadir Nuevo Empleado
        </button>
      </div>
    
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
      Lista de Clientes
    </h1>

    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400">
      Cargando clientes...
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      Error: {{ error }}
    </div>
    <div v-else>
      <div class="overflow-x-auto">
        <table class="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider"
              >
                ID Cliente
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Apellido
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Fecha de Nacimiento
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Teléfono
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Fecha de Inscripción
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Condición Médica
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider"
              >
                ID Gimnasio
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones

              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr v-for="cliente in clientes" :key="cliente.id_cliente">
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <span class="text-gray-900 dark:text-white">{{
                  cliente.id_cliente
                }}</span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <span class="text-gray-900 dark:text-white">{{
                  cliente.nombre
                }}</span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <span class="text-gray-900 dark:text-white">{{
                  cliente.apellido
                }}</span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <span class="text-gray-900 dark:text-white">{{
                  cliente.fecha_nacimiento
                }}</span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <span class="text-gray-900 dark:text-white">{{
                  cliente.telefono
                }}</span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <span class="text-gray-900 dark:text-white">{{
                  cliente.fecha_inscripcion
                }}</span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <span class="text-gray-900 dark:text-white">{{
                  cliente.condicion_medica
                }}</span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <span class="text-gray-900 dark:text-white">{{
                  cliente.id_gimnasio
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editCliente(cliente)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                <button @click="eliminarCliente(cliente.id)" class="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: "Clientes",
  components: {
    Header,
    Footer,
  },
  setup() {
    const clientes = ref([]);
    const loading = ref(true);
    const error = ref(null);

    onMounted(() => {
      axios
        .get("http://localhost:3000/api/clientes")
        .then((response) => {
          clientes.value = response.data;
          loading.value = false;
        })
        .catch((err) => {
          error.value = err.message;
          loading.value = false;
        });
    });

    return {
      clientes,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
/* Estilos scoped para el componente Clientes */
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.text-3xl {
  font-size: 1.875rem; /* 30px */
  line-height: 2.25rem; /* 36px */
  font-weight: 700; /* bold */
}

.mb-6 {
  margin-bottom: 1.5rem; /* 24px */
}

.text-center {
  text-align: center;
}

.text-gray-800 {
  color: #1e293b; /* Gray 800 */
}

.dark\:text-white {
  color: #fff; /* White */
}

.text-red-500 {
  color: #ef4444; /* Red 500 */
}

.bg-gray-200 {
  background-color: #edf2f7; /* Gray 200 */
}

.text-gray-700 {
  color: #4a5568; /* Gray 700 */
}

.dark\:bg-gray-700 {
  background-color: #4a5568; /* Dark Gray 700 */
}

.dark\:text-gray-200 {
  color: #edf2f7; /* Dark Gray 200 */
}

.px-5 {
  padding-left: 1.25rem; /* 20px */
  padding-right: 1.25rem; /* 20px */
}

.py-3 {
  padding-top: 0.75rem; /* 12px */
  padding-bottom: 0.75rem; /* 12px */
}

.border-b-2 {
  border-bottom-width: 2px;
}

.border-gray-200 {
  border-color: #edf2f7; /* Gray 200 */
}

.text-left {
  text-align: left;
}

.text-xs {
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
}

.font-semibold {
  font-weight: 600; /* Semibold */
}

.uppercase {
  text-transform: uppercase;
}

.tracking-wider {
  letter-spacing: 0.05em; /* Ajusta según sea necesario */
}

.bg-white {
  background-color: #fff;
}

.dark\:bg-gray-800 {
  background-color: #1e293b; /* Dark Gray 800 */
}

.text-sm {
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
}

.text-gray-900 {
  color: #1a202c; /* Gray 900 */
}

.dark\:text-white {
  color: #fff; /* White */
}

.overflow-x-auto {
  overflow-x: auto;
}

.min-w-full {
  min-width: 100%;
}

.leading-normal {
  line-height: 1.5; /* Normal */
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.rounded-lg {
  border-radius: 0.5rem; /* 8px */
}

.overflow-hidden {
  overflow: hidden;
}
.dark\:text-gray-400{
  color: #9ca3af;
}
.uppercase{
  text-transform: uppercase;
}
.tracking-wider{
  letter-spacing: 0.05em;
}
.divide-y > * + *{
  border-top-width: 1px;
  border-color: #e5e7eb;
}
.dark\:divide-gray-700 > * + *{
  border-color: #374151;
}
.text-sm{
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.font-medium{
  font-weight: 500;
}
.text-gray-700{
  color: #374151;
}
.dark\:text-gray-300{
  color: #d1d5db;
}
.text-right{
  text-align: right;
}
.text-indigo-600{
  color: #4f46e5;
}
.hover\:text-indigo-900:hover{
  color: #3730a3;
}
.mr-2{
  margin-right: 0.5rem;
}
.text-red-600{
  color: #dc2626;
}
.hover\:text-red-900:hover{
  color: #b91c1c;
}
</style>
