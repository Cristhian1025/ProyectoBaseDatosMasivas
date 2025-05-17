<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />
    <div class="clientes-container p-6 flex-1 py-10 w-full">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestión de Clientes</h2>

    <div class="mb-4">
      <button @click="addCliente" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Añadir Nuevo Cliente
      </button>
    </div>
    
    <div class="p-6 flex-1 py-10 w-full">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Lista de Clientes
      </h1>

      <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400">
        Cargando clientes...
      </div>
      <div v-else-if="error" class="text-center text-red-500">
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
            <tr v-for="cliente in clientes" :key="cliente.id_cliente">
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
                {{ cliente.fecha_nacimiento }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.telefono }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.fecha_inscripcion }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.condicion_medica }}
              </td>
               <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ cliente.id_gimnasio }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editCliente(cliente)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                <button @click="eliminarCliente(cliente.id_cliente)" class="text-red-600 hover:text-red-900">Eliminar</button>
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

    const addEmpleado = () => {
      // Implement your add empleado logic here.  This is just a placeholder
      console.log('Add Empleado clicked');
    };

    const editCliente = (cliente) => {
      // Implement your edit cliente logic here
      console.log('Edit cliente', cliente)
    }

    const eliminarCliente = (id) => {
      // Implement delete cliente logic
      console.log('Delete cliente', id);
    }
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
      addEmpleado,
      editCliente,
      eliminarCliente
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
