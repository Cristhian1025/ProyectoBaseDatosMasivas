<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />
    <div class="employees-container p-6 flex-1 py-10 w-full">
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestión de Empleados</h2>
  
      <div class="mb-4">
        <button @click="mostrarFormularioAgregar = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Añadir Nuevo Empleado
        </button>
      </div>

      <div v-if="mostrarFormularioAgregar" class="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mb-4">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Agregar Nuevo Empleado</h3>
        <form @submit.prevent="agregarEmpleado">
          <div class="mb-4">
            <label for="add_nombre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre:</label>
            <input v-model="nuevoEmpleado.nombre" type="text" id="add_nombre" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="add_apellido" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Apellido:</label>
            <input v-model="nuevoEmpleado.apellido" type="text" id="add_apellido" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="add_telefono" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Teléfono:</label>
            <input v-model="nuevoEmpleado.telefono" type="text" id="add_telefono" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="add_fecha_contratacion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha de Contratación:</label>
            <input v-model="nuevoEmpleado.fecha_contratacion" type="date" id="add_fecha_contratacion" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="add_puesto" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Puesto:</label>
            <input v-model="nuevoEmpleado.puesto" type="text" id="add_puesto" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="add_id_gimnasio" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Gimnasio:</label>
            <input v-model.number="nuevoEmpleado.id_gimnasio" type="number" id="add_id_gimnasio" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="add_id_usuario" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Usuario (opcional):</label>
            <input v-model.number="nuevoEmpleado.id_usuario" type="number" id="add_id_usuario"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Agregar Empleado
            </button>
            <button type="button" @click="mostrarFormularioAgregar = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div v-if="mostrarFormularioEditar" class="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mb-4">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Editar Empleado</h3>
        <form @submit.prevent="actualizarEmpleado">
          <div class="mb-4">
            <label for="edit_nombre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre:</label>
            <input v-model="empleadoEditado.nombre" type="text" id="edit_nombre" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_apellido" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Apellido:</label>
            <input v-model="empleadoEditado.apellido" type="text" id="edit_apellido" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_telefono" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Teléfono:</label>
            <input v-model="empleadoEditado.telefono" type="text" id="edit_telefono" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_fecha_contratacion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha de Contratación:</label>
            <input v-model="empleadoEditado.fecha_contratacion" type="date" id="edit_fecha_contratacion" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_puesto" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Puesto:</label>
            <input v-model="empleadoEditado.puesto" type="text" id="edit_puesto" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_id_gimnasio" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Gimnasio:</label>
            <input v-model.number="empleadoEditado.id_gimnasio" type="number" id="edit_id_gimnasio" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_id_usuario" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">ID Usuario (opcional):</label>
            <input v-model.number="empleadoEditado.id_usuario" type="number" id="edit_id_usuario"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Guardar Cambios
            </button>
            <button type="button" @click="mostrarFormularioEditar = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400">
        Cargando empleados...
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        Error: {{ error }}
      </div>
      <div v-else class="shadow-md overflow-hidden rounded-md">
        <table class="min-w-full bg-white dark:bg-gray-800">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID Empleado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID Usuario</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Apellido</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teléfono</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha Contratación</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Puesto</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID Gimnasio</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="empleado in empleados" :key="empleado.id_empleado">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ empleado.id_empleado }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.id_usuario }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.apellido }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.telefono }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.fecha_contratacion }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.puesto }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ empleado.id_gimnasio }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editEmpleado(empleado)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                <button @click="eliminarEmpleado(empleado.id_empleado)" class="text-red-600 hover:text-red-900">Eliminar</button>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: "Empleados",
  components: {
    Header,
    Footer,
  },
  setup() {
    const empleados = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const nuevoEmpleado = ref({
      id_usuario: null, // Optional, can be null
      nombre: '',
      apellido: '',
      telefono: '',
      fecha_contratacion: '', // YYYY-MM-DD format
      puesto: '',
      id_gimnasio: null,
    });

    const empleadoEditado = ref({
      id_empleado: null,
      id_usuario: null,
      nombre: '',
      apellido: '',
      telefono: '',
      fecha_contratacion: '',
      puesto: '',
      id_gimnasio: null,
    });

    const mostrarFormularioAgregar = ref(false);
    const mostrarFormularioEditar = ref(false);

    const fetchEmpleados = () => {
      axios.get("http://localhost:3000/api/empleados")
        .then((response) => {
          empleados.value = response.data;
          loading.value = false;
        })
        .catch((err) => {
          error.value = err.message;
          loading.value = false;
          console.error("Error al cargar empleados:", err);
          alert('Error al cargar empleados');
        });
    };

    const agregarEmpleado = () => {
      const payload = {
        id_usuario: nuevoEmpleado.value.id_usuario || null, // Ensure null if not provided
        nombre: nuevoEmpleado.value.nombre,
        apellido: nuevoEmpleado.value.apellido,
        telefono: nuevoEmpleado.value.telefono,
        fecha_contratacion: nuevoEmpleado.value.fecha_contratacion,
        puesto: nuevoEmpleado.value.puesto,
        id_gimnasio: nuevoEmpleado.value.id_gimnasio,
      };

      axios.post("http://localhost:3000/api/empleados", payload)
        .then(response => {
          empleados.value.push(response.data);
          nuevoEmpleado.value = { // Reset form
            id_usuario: null,
            nombre: '',
            apellido: '',
            telefono: '',
            fecha_contratacion: '',
            puesto: '',
            id_gimnasio: null,
          };
          mostrarFormularioAgregar.value = false;
          alert('Empleado agregado exitosamente');
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al agregar empleado:", err);
          alert('Error al agregar empleado');
        });
    };

    const editEmpleado = (empleado) => {
      // Ensure date format is YYYY-MM-DD for input type="date"
      empleadoEditado.value = { 
        ...empleado,
        fecha_contratacion: empleado.fecha_contratacion ? new Date(empleado.fecha_contratacion).toISOString().split('T')[0] : ''
      }; 
      mostrarFormularioEditar.value = true;
    };

    const actualizarEmpleado = () => {
      const payload = {
        id_usuario: empleadoEditado.value.id_usuario || null,
        nombre: empleadoEditado.value.nombre,
        apellido: empleadoEditado.value.apellido,
        telefono: empleadoEditado.value.telefono,
        fecha_contratacion: empleadoEditado.value.fecha_contratacion,
        puesto: empleadoEditado.value.puesto,
        id_gimnasio: empleadoEditado.value.id_gimnasio,
      };

      axios.put(`http://localhost:3000/api/empleados/${empleadoEditado.value.id_empleado}`, payload)
        .then(response => {
          const index = empleados.value.findIndex(e => e.id_empleado === empleadoEditado.value.id_empleado);
          if (index !== -1) {
            empleados.value[index] = { ...empleadoEditado.value };
          }
          mostrarFormularioEditar.value = false;
          alert('Empleado actualizado exitosamente');
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al actualizar empleado:", err);
          alert('Error al actualizar empleado');
        });
    };

    const eliminarEmpleado = (id) => {
      axios.delete(`http://localhost:3000/api/empleados/${id}`)
        .then(response => {
          if (response.status === 200) {
            empleados.value = empleados.value.filter(empleado => empleado.id_empleado !== id);
            alert('Empleado eliminado exitosamente');
          } else {
            alert('No se pudo eliminar el empleado');
          }
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al eliminar empleado:", err);
          alert('Error al eliminar empleado');
        });
    };

    onMounted(() => {
      fetchEmpleados();
    });

    return {
      empleados,
      loading,
      error,
      nuevoEmpleado,
      empleadoEditado,
      mostrarFormularioAgregar,
      mostrarFormularioEditar,
      agregarEmpleado,
      editEmpleado,
      actualizarEmpleado,
      eliminarEmpleado,
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
