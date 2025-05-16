<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />
    <div class="employees-container p-6 flex-1 py-10 w-full">
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestión de Empleados</h2>
  
      <div class="mb-4">
        <button @click="addEmpleado" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Añadir Nuevo Empleado
        </button>
      </div>
  
      <div class="shadow-md overflow-hidden rounded-md">
        <table class="min-w-full bg-white dark:bg-gray-800">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Apellido</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Puesto</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="empleado in empleados" :key="empleado.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ empleado.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.apellido }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.puesto }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editEmpleado(empleado)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                <button @click="eliminarEmpleado(empleado.id)" class="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const empleados = ref([
  { id: 1, nombre: 'Ana', apellido: 'Pérez', puesto: 'Gerente' },
  { id: 2, nombre: 'Carlos', apellido: 'López', puesto: 'Instructor' },
  { id: 3, nombre: 'Sofía', apellido: 'Gómez', puesto: 'Recepcionista' },
  { id: 4, nombre: 'Javier', apellido: 'Rodríguez', puesto: 'Entrenador Personal' },
])

const nuevoEmpleado = reactive({
  id: null,
  nombre: '',
  apellido: '',
  puesto: ''
})

const addEmpleado = () => {
  const maxId = Math.max(...empleados.value.map(e => e.id), 0);
  nuevoEmpleado.id = maxId + 1;
  empleados.value.push({ ...nuevoEmpleado });
  limpiarFormulario();
}

const editEmpleado = (empleado) => {
  // Implementar la lógica de edición aquí
  console.log('Editar empleado:', empleado);
}

const eliminarEmpleado = (id) => {
  empleados.value = empleados.value.filter(empleado => empleado.id !== id);
}

const limpiarFormulario = () => {
  nuevoEmpleado.nombre = '';
  nuevoEmpleado.apellido = '';
  nuevoEmpleado.puesto = '';
}
</script>

<style scoped>
.employees-container {
  padding: 2rem;
}
.text-2xl{
  font-size: 1.5rem;
  line-height: 2rem;
}
.font-bold{
  font-weight: 700;
}
.mb-4{
  margin-bottom: 1rem;
}
.text-gray-900{
  color: #111827;
}
.dark\:text-white{
  color: #fff;
}
.bg-green-500{
  background-color: #16a34a;
}
.hover\:bg-green-700:hover{
  background-color: #15803d;
}
.text-white{
  color: #fff;
}
.py-2{
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.px-4{
  padding-left: 1rem;
  padding-right: 1rem;
}
.rounded{
  border-radius: 0.25rem;
}
.shadow-md{
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.overflow-hidden{
  overflow: hidden;
}
.min-w-full{
  min-width: 100%;
}
.bg-white{
  background-color: #fff;
}
.dark\:bg-gray-800{
  background-color: #1f2937;
}
.bg-gray-50{
  background-color: #f9fafb;
}
.dark\:bg-gray-700{
  background-color: #374151;
}
thead tr th{
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  text-align: left;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: #6b7280;
}
tbody tr td{
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  white-space: nowrap;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #111827;
}
tbody tr{
  border-bottom-width: 1px;
  border-color: #e5e7eb;
}
tbody tr:last-child{
  border-bottom-width: 0;
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