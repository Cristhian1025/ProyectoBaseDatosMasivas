<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />
    <div class="clientes-container p-6 flex-1 py-10 w-full">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Gestión de Clientes</h2>

      <div class="mb-4">
        <button @click="openAddForm"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow">
          Añadir Nuevo Cliente
        </button>
      </div>

      <div v-if="mostrarFormularioAgregar" class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Agregar Nuevo Cliente</h3>
        <form @submit.prevent="agregarCliente">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="add_nombre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre:</label>
              <input v-model="nuevoCliente.nombre" type="text" id="add_nombre" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="add_apellido" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Apellido:</label>
              <input v-model="nuevoCliente.apellido" type="text" id="add_apellido" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="add_fecha_nacimiento" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha de Nacimiento:</label>
              <input v-model="nuevoCliente.fecha_nacimiento" type="date" id="add_fecha_nacimiento" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="add_telefono" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Teléfono:</label>
              <input v-model="nuevoCliente.telefono" type="text" id="add_telefono" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="add_fecha_inscripcion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha de Inscripción:</label>
              <input v-model="nuevoCliente.fecha_inscripcion" type="date" id="add_fecha_inscripcion" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="add_condicion_medica" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Condición Médica:</label>
              <input v-model="nuevoCliente.condicion_medica" type="text" id="add_condicion_medica"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="add_id_gimnasio" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Gimnasio:</label>
              <input v-model.number="nuevoCliente.id_gimnasio" type="number" id="add_id_gimnasio" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
          </div>
          <div class="flex items-center justify-end mt-6 gap-3">
            <button type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-sm">
              Agregar Cliente
            </button>
            <button type="button" @click="closeAddForm"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-sm">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div v-if="mostrarFormularioEditar" class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Editar Cliente</h3>
        <form @submit.prevent="actualizarCliente">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="edit_nombre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre:</label>
              <input v-model="clienteEditado.nombre" type="text" id="edit_nombre" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="edit_apellido" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Apellido:</label>
              <input v-model="clienteEditado.apellido" type="text" id="edit_apellido" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="edit_fecha_nacimiento" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha de Nacimiento:</label>
              <input v-model="clienteEditado.fecha_nacimiento" type="date" id="edit_fecha_nacimiento" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="edit_telefono" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Teléfono:</label>
              <input v-model="clienteEditado.telefono" type="text" id="edit_telefono" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="edit_fecha_inscripcion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha de Inscripción:</label>
              <input v-model="clienteEditado.fecha_inscripcion" type="date" id="edit_fecha_inscripcion" required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="edit_condicion_medica" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Condición Médica:</label>
              <input v-model="clienteEditado.condicion_medica" type="text" id="edit_condicion_medica"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="edit_id_gimnasio" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Gimnasio:</label>
              <input v-model.number="clienteEditado.id_gimnasio" type="number" id="edit_id_gimnasio" required
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
        Cargando clientes...
      </div>
      <div v-else-if="error" class="text-center text-red-500 py-4">
        Error: {{ error }}
      </div>
      <div v-else class="shadow-md overflow-hidden rounded-md">
        <table class="min-w-full bg-white dark:bg-gray-800">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID Cliente
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Apellido
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha de Nacimiento
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Teléfono
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha de Inscripción
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Condición Médica
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID Gimnasio
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="clientes.length === 0">
              <td colspan="9" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic">No se encontraron
                clientes</td>
            </tr>
            <tr v-else v-for="cliente in clientes" :key="cliente.id_cliente">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ cliente.id_cliente }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.nombre }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.apellido }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ formatDate(cliente.fecha_nacimiento) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.telefono }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ formatDate(cliente.fecha_inscripcion) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.condicion_medica }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.id_gimnasio }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center gap-2">
                <button @click="editCliente(cliente)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                <button @click="eliminarCliente(cliente.id_cliente)" class="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
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

    const nuevoCliente = ref({
      nombre: '',
      apellido: '',
      fecha_nacimiento: '', // Expected YYYY-MM-DD format
      telefono: '',
      fecha_inscripcion: '', // Expected YYYY-MM-DD format
      condicion_medica: '',
      id_gimnasio: null,
    });

    const clienteEditado = ref({
      id_cliente: null,
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      telefono: '',
      fecha_inscripcion: '',
      condicion_medica: '',
      id_gimnasio: null,
    });

    const mostrarFormularioAgregar = ref(false);
    const mostrarFormularioEditar = ref(false);

    // Helper to format date for input type="date"
    const formatDateForInput = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Helper to format date for display
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES');
    };

    const fetchClientes = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.get("http://localhost:3000/api/clientes");
        clientes.value = response.data;
      } catch (err) {
        error.value = err.response?.data?.error || err.message;
        console.error("Error al cargar clientes:", err);
        // alert(`Error al cargar clientes: ${error.value}`); // Consider a custom modal for production
      } finally {
        loading.value = false;
      }
    };

    const openAddForm = () => {
      mostrarFormularioAgregar.value = true;
      // Reset form fields when opening
      nuevoCliente.value = {
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        telefono: '',
        condicion_medica: '',
        id_gimnasio: null,
      };
    };

    const closeAddForm = () => {
      mostrarFormularioAgregar.value = false;
    };

    const agregarCliente = async () => {
      try {
        const payload = {
          nombre: nuevoCliente.value.nombre,
          apellido: nuevoCliente.value.apellido,
          fecha_nacimiento: nuevoCliente.value.fecha_nacimiento,
          telefono: nuevoCliente.value.telefono,
          fecha_inscripcion: nuevoCliente.value.fecha_inscripcion,
          condicion_medica: nuevoCliente.value.condicion_medica || null, // Allow null if empty
          id_gimnasio: nuevoCliente.value.id_gimnasio,
        };

        const response = await axios.post("http://localhost:3000/api/clientes", payload);
        clientes.value.push(response.data); // Add new client to the list
        alert('Cliente agregado exitosamente'); // Consider a custom modal
        closeAddForm(); // Close the form
      } catch (err) {
        error.value = err.response?.data?.error || err.message;
        console.error("Error al agregar cliente:", err);
        alert(`Error al agregar cliente: ${error.value}`); // Consider a custom modal
      }
    };

    const editCliente = (cliente) => {
      console.log('Cliente recibido para edición:', cliente); // Línea de depuración
      // Deep copy the client object to avoid direct mutation
      clienteEditado.value = {
        ...cliente,
        fecha_nacimiento: formatDateForInput(cliente.fecha_nacimiento),
        fecha_inscripcion: formatDateForInput(cliente.fecha_inscripcion)
      };
      console.log('clienteEditado.value después de la asignación:', clienteEditado.value); // Línea de depuración
      mostrarFormularioEditar.value = true;
    };

    const closeEditForm = () => {
      mostrarFormularioEditar.value = false;
    };

    const actualizarCliente = async () => {
      try {
        const payload = {
          nombre: clienteEditado.value.nombre,
          apellido: clienteEditado.value.apellido,
          fecha_nacimiento: clienteEditado.value.fecha_nacimiento,
          telefono: clienteEditado.value.telefono,
          fecha_inscripcion: clienteEditado.value.fecha_inscripcion,
          condicion_medica: clienteEditado.value.condicion_medica || null,
          id_gimnasio: clienteEditado.value.id_gimnasio,
        };

        const response = await axios.put(`http://localhost:3000/api/clientes/${clienteEditado.value.id_cliente}`, payload);
        
        // Update the client in the local list
        const index = clientes.value.findIndex(c => c.id_cliente === clienteEditado.value.id_cliente);
        if (index !== -1) {
          clientes.value[index] = { ...response.data }; // Update with response data
        }
        alert('Cliente actualizado exitosamente'); // Consider a custom modal
        closeEditForm(); // Close the form
      } catch (err) {
        error.value = err.response?.data?.error || err.message;
        console.error("Error al actualizar cliente:", err);
        alert(`Error al actualizar cliente: ${error.value}`); // Consider a custom modal
      }
    };

    const eliminarCliente = async (id) => {
      if (window.confirm('¿Estás seguro de que deseas eliminar este cliente? Esta acción es irreversible.')) {
        try {
          await axios.delete(`http://localhost:3000/api/clientes/${id}`);
          clientes.value = clientes.value.filter(cliente => cliente.id_cliente !== id);
          alert('Cliente eliminado exitosamente'); // Consider a custom modal
        } catch (err) {
          error.value = err.response?.data?.error || err.message;
          console.error("Error al eliminar cliente:", err);
          alert(`Error al eliminar cliente: ${error.value}`); // Consider a custom modal
        }
      }
    };

    onMounted(() => {
      fetchClientes();
    });

    return {
      clientes,
      loading,
      error,
      nuevoCliente,
      clienteEditado,
      mostrarFormularioAgregar,
      mostrarFormularioEditar,
      openAddForm,
      closeAddForm,
      agregarCliente,
      editCliente,
      closeEditForm,
      actualizarCliente,
      eliminarCliente,
      formatDate, // Expose formatDate for use in template
    };
  },
};
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