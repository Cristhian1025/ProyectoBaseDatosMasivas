<template>
    <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div class="gimnasios-container p-6 flex-1 py-10 w-full">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Gestión de Gimnasios</h2>
  
        <div class="mb-4">
          <button @click="openAddForm"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow">
            Añadir Nuevo Gimnasio
          </button>
        </div>
  
        <div v-if="mostrarFormularioAgregar" class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Agregar Nuevo Gimnasio</h3>
          <form @submit.prevent="agregarGimnasio">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="add_nombre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre:</label>
                <input v-model="nuevoGimnasio.nombre" type="text" id="add_nombre" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="add_ubicacion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Ubicación:</label>
                <input v-model="nuevoGimnasio.ubicacion" type="text" id="add_ubicacion" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="add_direccion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Dirección:</label>
                <input v-model="nuevoGimnasio.direccion" type="text" id="add_direccion" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="add_telefono" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Teléfono (opcional):</label>
                <input v-model="nuevoGimnasio.telefono" type="text" id="add_telefono"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="add_horario_apertura" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Horario Apertura:</label>
                <input v-model="nuevoGimnasio.horario_apertura" type="time" id="add_horario_apertura" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="add_horario_cierre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Horario Cierre:</label>
                <input v-model="nuevoGimnasio.horario_cierre" type="time" id="add_horario_cierre" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
            </div>
            <div class="flex items-center justify-end mt-6 gap-3">
              <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-sm">
                Agregar Gimnasio
              </button>
              <button type="button" @click="closeAddForm"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-sm">
                Cancelar
              </button>
            </div>
          </form>
        </div>
  
        <div v-if="mostrarFormularioEditar" class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Editar Gimnasio</h3>
          <form @submit.prevent="actualizarGimnasio">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="edit_nombre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre:</label>
                <input v-model="gimnasioEditado.nombre" type="text" id="edit_nombre" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="edit_ubicacion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Ubicación:</label>
                <input v-model="gimnasioEditado.ubicacion" type="text" id="edit_ubicacion" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="edit_direccion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Dirección:</label>
                <input v-model="gimnasioEditado.direccion" type="text" id="edit_direccion" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="edit_telefono" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Teléfono (opcional):</label>
                <input v-model="gimnasioEditado.telefono" type="text" id="edit_telefono"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="edit_horario_apertura" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Horario Apertura:</label>
                <input v-model="gimnasioEditado.horario_apertura" type="time" id="edit_horario_apertura" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="edit_horario_cierre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Horario Cierre:</label>
                <input v-model="gimnasioEditado.horario_cierre" type="time" id="edit_horario_cierre" required
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
            </div>
            <div class="flex items-center justify-end mt-6 gap-3">
              <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-sm">
                Guardar Cambios
              </button>
              <button type="button" @click="closeEditForm"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-sm">
                Cancelar
              </button>
            </div>
          </form>
        </div>
  
        <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400 py-4">
          Cargando gimnasios...
        </div>
        <div v-else-if="error" class="text-center text-red-500 py-4">
          Error: {{ error }}
        </div>
        <div v-else class="shadow-md overflow-hidden rounded-md">
          <table class="min-w-full bg-white dark:bg-gray-800">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID Gimnasio</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ubicación</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dirección</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teléfono</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Horario Apertura</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Horario Cierre</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-if="gimnasios.length === 0">
                <td colspan="8" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic">No se encontraron
                  gimnasios</td>
              </tr>
              <tr v-else v-for="gimnasio in gimnasios" :key="gimnasio.id_gimnasio">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ gimnasio.id_gimnasio }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ gimnasio.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ gimnasio.ubicacion }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ gimnasio.direccion }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ gimnasio.telefono }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ formatTime(gimnasio.horario_apertura) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ formatTime(gimnasio.horario_cierre) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center gap-2">
                  <button @click="editGimnasio(gimnasio)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                  <button @click="eliminarGimnasio(gimnasio.id_gimnasio)" class="text-red-600 hover:text-red-900">Eliminar</button>
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
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  
  // Reactive states
  const gimnasios = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  const nuevoGimnasio = ref({
    nombre: '',
    ubicacion: '',
    direccion: '',
    telefono: '',
    horario_apertura: '', // HH:MM string
    horario_cierre: '',   // HH:MM string
  });
  
  const gimnasioEditado = ref({
    id_gimnasio: null,
    nombre: '',
    ubicacion: '',
    direccion: '',
    telefono: '',
    horario_apertura: '',
    horario_cierre: '',
  });
  
  const mostrarFormularioAgregar = ref(false);
  const mostrarFormularioEditar = ref(false);
  
  // Helper to format time for display (e.g., "08:00:00" to "08:00")
  const formatTime = (timeString) => {
    if (!timeString) return '';
    // Assuming timeString is in 'HH:MM:SS' or 'HH:MM' format
    return timeString.substring(0, 5); // Take first 5 characters (HH:MM)
  };
  
  // Fetch all gimnasios from the API
  const fetchGimnasios = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("http://localhost:3000/api/gimnasios");
      gimnasios.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.error || err.message;
      console.error("Error al cargar gimnasios:", err);
      // In a real application, consider using a custom modal for user feedback
      // alert(`Error al cargar gimnasios: ${error.value}`);
    } finally {
      loading.value = false;
    }
  };
  
  // Open the add form and reset its data
  const openAddForm = () => {
    mostrarFormularioAgregar.value = true;
    nuevoGimnasio.value = {
      nombre: '',
      ubicacion: '',
      direccion: '',
      telefono: '',
      horario_apertura: '',
      horario_cierre: '',
    };
  };
  
  // Close the add form
  const closeAddForm = () => {
    mostrarFormularioAgregar.value = false;
  };
  
  // Add a new gimnasio
  const agregarGimnasio = async () => {
    try {
      const payload = {
        nombre: nuevoGimnasio.value.nombre,
        ubicacion: nuevoGimnasio.value.ubicacion,
        direccion: nuevoGimnasio.value.direccion,
        telefono: nuevoGimnasio.value.telefono || null, // Allow null if empty
        horario_apertura: nuevoGimnasio.value.horario_apertura,
        horario_cierre: nuevoGimnasio.value.horario_cierre,
      };
  
      const response = await axios.post("http://localhost:3000/api/gimnasios", payload);
      gimnasios.value.push(response.data); // Add new gimnasio to the list
      alert('Gimnasio agregado exitosamente'); // Consider a custom modal
      closeAddForm(); // Close the form
    } catch (err) {
      error.value = err.response?.data?.error || err.message;
      console.error("Error al agregar gimnasio:", err);
      alert(`Error al agregar gimnasio: ${error.value}`); // Consider a custom modal
    }
  };
  
  // Open the edit form and populate it with selected gimnasio data
  const editGimnasio = (gimnasio) => {
    // Deep copy the gimnasio object to avoid direct mutation
    gimnasioEditado.value = {
      ...gimnasio,
      // Ensure time formats are compatible with input type="time" (HH:MM)
      horario_apertura: formatTime(gimnasio.horario_apertura),
      horario_cierre: formatTime(gimnasio.horario_cierre),
    };
    mostrarFormularioEditar.value = true;
  };
  
  // Close the edit form
  const closeEditForm = () => {
    mostrarFormularioEditar.value = false;
  };
  
  // Update an existing gimnasio
  const actualizarGimnasio = async () => {
    try {
      const payload = {
        nombre: gimnasioEditado.value.nombre,
        ubicacion: gimnasioEditado.value.ubicacion,
        direccion: gimnasioEditado.value.direccion,
        telefono: gimnasioEditado.value.telefono || null,
        horario_apertura: gimnasioEditado.value.horario_apertura,
        horario_cierre: gimnasioEditado.value.horario_cierre,
      };
  
      const response = await axios.put(`http://localhost:3000/api/gimnasios/${gimnasioEditado.value.id_gimnasio}`, payload);
      
      // Update the gimnasio in the local list
      const index = gimnasios.value.findIndex(g => g.id_gimnasio === gimnasioEditado.value.id_gimnasio);
      if (index !== -1) {
        gimnasios.value[index] = { ...response.data }; // Update with response data
      }
      alert('Gimnasio actualizado exitosamente'); // Consider a custom modal
      closeEditForm(); // Close the form
    } catch (err) {
      error.value = err.response?.data?.error || err.message;
      console.error("Error al actualizar gimnasio:", err);
      alert(`Error al actualizar gimnasio: ${error.value}`); // Consider a custom modal
    }
  };
  
  // Delete a gimnasio
  const eliminarGimnasio = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este gimnasio? Esta acción es irreversible.')) {
      try {
        await axios.delete(`http://localhost:3000/api/gimnasios/${id}`);
        gimnasios.value = gimnasios.value.filter(gimnasio => gimnasio.id_gimnasio !== id);
        alert('Gimnasio eliminado exitosamente'); // Consider a custom modal
      } catch (err) {
        error.value = err.response?.data?.error || err.message;
        console.error("Error al eliminar gimnasio:", err);
        alert(`Error al eliminar gimnasio: ${error.value}`); // Consider a custom modal
      }
    }
  };
  
  // Fetch data when the component is mounted
  onMounted(() => {
    fetchGimnasios();
  });
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
  
  /* Form Styles */
  input[type="email"],
  input[type="password"],
  input[type="text"],
  input[type="date"],
  input[type="number"],
  select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border-width: 1px;
    border-color: #e0e0e0;
    color: #374151;
    font-size: 0.875rem;
    line-height: 1.25rem;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    transition-property: border-color, box-shadow;
    transition-duration: 150ms;
    outline: none;
  }
  
  input[type="email"]:focus,
  input[type="password"]:focus,
  input[type="text"]:focus,
  input[type="date"]:focus,
  input[type="number"]:focus,
  select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
  
  .bg-blue-500 {
    background-color: #3b82f6;
  }
  .bg-blue-500:hover {
    background-color: #2563eb;
  }
  .bg-gray-300 {
    background-color: #d1d5db;
  }
  .bg-gray-300:hover {
    background-color: #b0b3b8;
  }
  .text-gray-800{
    color: #374151;
  }
  
  .flex{
    display: flex;
  }
  .items-center{
    align-items: center;
  }
  .justify-between{
    justify-content: space-between;
  }
  
  </style>