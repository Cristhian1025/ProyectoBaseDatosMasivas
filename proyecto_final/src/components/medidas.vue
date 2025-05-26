<template>
    <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div class="p-6 flex-1 py-10 w-full">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestión de Medidas de Clientes</h2>
    
        <div class="mb-4">
          <button @click="mostrarFormularioAgregar = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Añadir Nueva Medida
          </button>
        </div>
    
        <div v-if="mostrarFormularioAgregar" class="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mb-4">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Agregar Nueva Medida</h3>
          <form @submit.prevent="agregarMedida">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="id_cliente" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Cliente:</label>
                <input v-model="nuevaMedida.id_cliente" type="number" id="id_cliente" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="ID del cliente">
              </div>
              <div class="mb-4">
                <label for="fecha_medicion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha de Medición:</label>
                <input v-model="nuevaMedida.fecha_medicion" type="date" id="fecha_medicion" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="peso" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Peso (kg):</label>
                <input v-model="nuevaMedida.peso" type="number" step="0.1" id="peso" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 75.5">
              </div>
              <div class="mb-4">
                <label for="altura" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Altura (m):</label>
                <input v-model="nuevaMedida.altura" type="number" step="0.01" id="altura" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 1.75">
              </div>
              <div class="mb-4">
                <label for="porcentaje_grasa" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Porcentaje Grasa (%):</label>
                <input v-model="nuevaMedida.porcentaje_grasa" type="number" step="0.1" id="porcentaje_grasa" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 15.5">
              </div>
              <div class="mb-4">
                <label for="masa_muscular" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Masa Muscular (%):</label>
                <input v-model="nuevaMedida.masa_muscular" type="number" step="0.1" id="masa_muscular" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 45.2">
              </div>
              <div class="mb-4">
                <label for="cintura" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Cintura (cm):</label>
                <input v-model="nuevaMedida.cintura" type="number" step="0.1" id="cintura" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 80.0">
              </div>
              <div class="mb-4">
                <label for="cadera" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Cadera (cm):</label>
                <input v-model="nuevaMedida.cadera" type="number" step="0.1" id="cadera" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 95.5">
              </div>
              <div class="mb-4">
                <label for="brazo" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Brazo (cm):</label>
                <input v-model="nuevaMedida.brazo" type="number" step="0.1" id="brazo" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 30.2">
              </div>
            </div>
            <div class="flex items-center justify-between mt-6">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Agregar Medida
              </button>
              <button type="button" @click="mostrarFormularioAgregar = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancelar
              </button>
            </div>
          </form>
        </div>
    
        <div v-if="mostrarFormularioEditar" class="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mb-4">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Editar Medida</h3>
          <form @submit.prevent="actualizarMedida">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="edit_id_cliente" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Cliente:</label>
                <input v-model="medidaEditada.id_cliente" type="number" id="edit_id_cliente" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="ID del cliente">
              </div>
              <div class="mb-4">
                <label for="edit_fecha_medicion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha de Medición:</label>
                <input v-model="medidaEditada.fecha_medicion" type="date" id="edit_fecha_medicion" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="edit_peso" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Peso (kg):</label>
                <input v-model="medidaEditada.peso" type="number" step="0.1" id="edit_peso" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 75.5">
              </div>
              <div class="mb-4">
                <label for="edit_altura" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Altura (m):</label>
                <input v-model="medidaEditada.altura" type="number" step="0.01" id="edit_altura" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 1.75">
              </div>
              <div class="mb-4">
                <label for="edit_porcentaje_grasa" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Porcentaje Grasa (%):</label>
                <input v-model="medidaEditada.porcentaje_grasa" type="number" step="0.1" id="edit_porcentaje_grasa" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 15.5">
              </div>
              <div class="mb-4">
                <label for="edit_masa_muscular" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Masa Muscular (%):</label>
                <input v-model="medidaEditada.masa_muscular" type="number" step="0.1" id="edit_masa_muscular" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 45.2">
              </div>
              <div class="mb-4">
                <label for="edit_cintura" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Cintura (cm):</label>
                <input v-model="medidaEditada.cintura" type="number" step="0.1" id="edit_cintura" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 80.0">
              </div>
              <div class="mb-4">
                <label for="edit_cadera" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Cadera (cm):</label>
                <input v-model="medidaEditada.cadera" type="number" step="0.1" id="edit_cadera" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 95.5">
              </div>
              <div class="mb-4">
                <label for="edit_brazo" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Brazo (cm):</label>
                <input v-model="medidaEditada.brazo" type="number" step="0.1" id="edit_brazo" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       placeholder="Ej: 30.2">
              </div>
            </div>
            <div class="flex items-center justify-between mt-6">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Guardar Cambios
              </button>
              <button type="button" @click="mostrarFormularioEditar = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancelar
              </button>
            </div>
          </form>
        </div>
    
        <div class="shadow-md overflow-hidden rounded-md">
          <table class="min-w-full bg-white dark:bg-gray-800">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID Medida
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID Cliente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Peso (kg)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Altura (m)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Porcentaje Grasa (%)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Masa Muscular (%)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cintura (cm)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cadera (cm)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Brazo (cm)
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="medida in medidas" :key="medida.id_medidas">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ medida.id_medidas }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ medida.id_cliente }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ formatearFecha(medida.fecha_medicion) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ medida.peso }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ medida.altura }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ medida.porcentaje_grasa }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ medida.masa_muscular }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ medida.cintura }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ medida.cadera }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ medida.brazo }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="editarMedida(medida)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                  <button @click="eliminarMedida(medida.id_medidas)" class="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    
        <div v-if="loading" class="text-center mt-4">
          <p class="text-gray-600 dark:text-gray-400">Cargando medidas...</p>
        </div>
        <div v-if="error" class="text-center mt-4">
          <p class="text-red-600">{{ error }}</p>
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
    name: "Medidas",
    components: {
      Header,
      Footer,
    },
    setup() {
      const medidas = ref([]);
      const loading = ref(true);
      const error = ref(null);
      const nuevaMedida = ref({
        id_cliente: '',
        fecha_medicion: '',
        peso: '',
        altura: '',
        porcentaje_grasa: '', // Renombrado de grasa_corporal
        masa_muscular: '',
        cintura: '', // Nuevo campo
        cadera: '',  // Nuevo campo
        brazo: ''    // Nuevo campo
      });
      const medidaEditada = ref({
        id_medidas: null,
        id_cliente: '',
        fecha_medicion: '',
        peso: '',
        altura: '',
        porcentaje_grasa: '', // Renombrado de grasa_corporal
        masa_muscular: '',
        cintura: '', // Nuevo campo
        cadera: '',  // Nuevo campo
        brazo: ''    // Nuevo campo
      });
      const mostrarFormularioAgregar = ref(false);
      const mostrarFormularioEditar = ref(false);
  
      // Función para formatear fecha
      const formatearFecha = (fecha) => {
        if (!fecha) return '';
        const date = new Date(fecha);
        // Asegurarse de que la fecha se formatee correctamente para evitar desfases de zona horaria
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('es-ES');
      };
  
      // Función para obtener todas las medidas
      const obtenerMedidas = async () => {
        try {
          loading.value = true;
          const response = await axios.get("http://localhost:3000/api/medidas-clientes");
          medidas.value = response.data;
          error.value = null;
        } catch (err) {
          error.value = err.response?.data?.error || err.message;
          console.error("Error al obtener medidas:", err);
        } finally {
          loading.value = false;
        }
      };
  
      // Función para agregar nueva medida
      const agregarMedida = async () => {
        try {
          const payload = {
            id_cliente: parseInt(nuevaMedida.value.id_cliente),
            fecha_medicion: nuevaMedida.value.fecha_medicion,
            peso: parseFloat(nuevaMedida.value.peso),
            altura: parseFloat(nuevaMedida.value.altura),
            porcentaje_grasa: parseFloat(nuevaMedida.value.porcentaje_grasa), // Renombrado
            masa_muscular: parseFloat(nuevaMedida.value.masa_muscular),
            cintura: parseFloat(nuevaMedida.value.cintura), // Nuevo campo
            cadera: parseFloat(nuevaMedida.value.cadera),   // Nuevo campo
            brazo: parseFloat(nuevaMedida.value.brazo)     // Nuevo campo
          };
  
          const response = await axios.post("http://localhost:3000/api/medidas-clientes", payload); // Cambiado a /medidas-clientes
          medidas.value.push(response.data);
          
          // Resetear formulario
          nuevaMedida.value = {
            id_cliente: '',
            fecha_medicion: '',
            peso: '',
            altura: '',
            porcentaje_grasa: '',
            masa_muscular: '',
            cintura: '',
            cadera: '',
            brazo: ''
          };
          
          mostrarFormularioAgregar.value = false;
          alert('Medida agregada exitosamente');
        } catch (err) {
          error.value = err.response?.data?.error || err.message;
          console.error("Error al agregar medida:", err);
          alert('Error al agregar medida: ' + (err.response?.data?.error || err.message));
        }
      };
  
      // Función para preparar edición
      const editarMedida = (medida) => {
        medidaEditada.value = { 
          ...medida,
          // Asegurarse de que la fecha_medicion esté en formato ISO (YYYY-MM-DD) para el input type="date"
          fecha_medicion: medida.fecha_medicion ? new Date(medida.fecha_medicion).toISOString().split('T')[0] : '',
          porcentaje_grasa: medida.porcentaje_grasa // Asegurarse de que el nombre sea correcto al copiar
        };
        mostrarFormularioEditar.value = true;
      };
  
      // Función para actualizar medida
      const actualizarMedida = async () => {
        try {
          const payload = {
            id_cliente: parseInt(medidaEditada.value.id_cliente),
            fecha_medicion: medidaEditada.value.fecha_medicion,
            peso: parseFloat(medidaEditada.value.peso),
            altura: parseFloat(medidaEditada.value.altura),
            porcentaje_grasa: parseFloat(medidaEditada.value.porcentaje_grasa), // Renombrado
            masa_muscular: parseFloat(medidaEditada.value.masa_muscular),
            cintura: parseFloat(medidaEditada.value.cintura), // Nuevo campo
            cadera: parseFloat(medidaEditada.value.cadera),   // Nuevo campo
            brazo: parseFloat(medidaEditada.value.brazo)     // Nuevo campo
          };
  
          const response = await axios.put(
            `http://localhost:3000/api/medidas-clientes/${medidaEditada.value.id_medidas}`, // Cambiado a /medidas-clientes
            payload
          );
          
          // Actualizar medida en la lista local
          const index = medidas.value.findIndex(m => m.id_medidas === medidaEditada.value.id_medidas);
          if (index !== -1) {
            // Reemplazar el objeto completo con la respuesta de la API (que debería ser el objeto actualizado)
            medidas.value[index] = response.data; 
          }
          
          mostrarFormularioEditar.value = false;
          alert('Medida actualizada exitosamente');
        } catch (err) {
          error.value = err.response?.data?.error || err.message;
          console.error("Error al actualizar medida:", err);
          alert('Error al actualizar medida: ' + (err.response?.data?.error || err.message));
        }
      };
  
      // Función para eliminar medida
      const eliminarMedida = async (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta medida?')) {
          try {
            await axios.delete(`http://localhost:3000/api/medidas-clientes/${id}`); // Cambiado a /medidas-clientes
            medidas.value = medidas.value.filter(medida => medida.id_medidas !== id);
            alert('Medida eliminada exitosamente');
          } catch (err) {
            error.value = err.response?.data?.error || err.message;
            console.error("Error al eliminar medida:", err);
            alert('Error al eliminar medida: ' + (err.response?.data?.error || err.message));
          }
        }
      };
  
      // Cargar medidas al montar el componente
      onMounted(() => {
        obtenerMedidas();
      });
  
      return {
        medidas,
        loading,
        error,
        nuevaMedida,
        medidaEditada,
        mostrarFormularioAgregar,
        mostrarFormularioEditar,
        formatearFecha,
        agregarMedida,
        editarMedida,
        actualizarMedida,
        eliminarMedida
      };
    },
  };
  </script>
    
  <style scoped>
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
  .grid{
    display: grid;
  }
  .grid-cols-1{
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .gap-4{
    gap: 1rem;
  }
  .mt-6{
    margin-top: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .md\:grid-cols-2{
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
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
  input[type="number"],
  input[type="date"],
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
  input[type="number"]:focus,
  input[type="date"]:focus,
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
  .text-center{
    text-align: center;
  }
  .text-gray-600{
    color: #4b5563;
  }
  .dark\:text-gray-400{
    color: #9ca3af;
  }
  
  </style>
  