<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />
    <div class="plans-container p-6 flex-1 py-10 w-full">
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestión de Planes</h2>
  
      <div class="mb-4">
        <button @click="mostrarFormularioAgregar = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Añadir Nuevo Plan
        </button>
      </div>

      <!-- Formulario para agregar plan -->
      <div v-if="mostrarFormularioAgregar" class="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mb-4">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Agregar Nuevo Plan</h3>
        <form @submit.prevent="agregarPlan">
          <div class="mb-4">
            <label for="nombre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre:</label>
            <input v-model="nuevoPlan.nombre" type="text" id="nombre" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="descripcion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Descripción:</label>
            <textarea v-model="nuevoPlan.descripcion" id="descripcion" required
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"></textarea>
          </div>
          <div class="mb-4">
            <label for="precio" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Precio:</label>
            <input v-model="nuevoPlan.precio" type="number" id="precio" required min="0" step="0.01"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="duracion_semanas" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Duración (meses):</label>
            <input v-model="nuevoPlan.duracion_meses" type="number" id="duracion_semanas" required min="1"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Agregar Plan
            </button>
            <button type="button" @click="mostrarFormularioAgregar = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Formulario para editar plan -->
      <div v-if="mostrarFormularioEditar" class="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mb-4">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Editar Plan</h3>
        <form @submit.prevent="actualizarPlan">
          <div class="mb-4">
            <label for="edit_nombre" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre:</label>
            <input v-model="planEditado.nombre" type="text" id="edit_nombre" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_descripcion" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Descripción:</label>
            <textarea v-model="planEditado.descripcion" id="edit_descripcion" required
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"></textarea>
          </div>
          <div class="mb-4">
            <label for="edit_precio" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Precio:</label>
            <input v-model="planEditado.precio" type="number" id="edit_precio" required min="0" step="0.01"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-4">
            <label for="edit_duracion_semanas" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Duración (Semanas):</label>
            <input v-model="planEditado.duracion_meses" type="number" id="edit_duracion_semanas" required min="1"
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
  
      <div class="shadow-md overflow-hidden rounded-md">
        <table class="min-w-full bg-white dark:bg-gray-800">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precio</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duración (Meses)</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Descripción</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="plan in planes" :key="plan.id_plan">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ plan.id_plan }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ plan.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${{ plan.precio }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ plan.duracion_meses }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ plan.descripcion }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editPlan(plan)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                <button @click="eliminarPlan(plan.id_plan)" class="text-red-600 hover:text-red-900">Eliminar</button>
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
  name: "Planes",
  components: {
    Header,
    Footer,
  },
  setup() {
    const planes = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const nuevoPlan = ref({ // Para el formulario de agregar
      nombre: '',
      descripcion: '',
      precio: '',
      duracion_meses: ''
    });
    const planEditado = ref({ // Para el formulario de editar
      id_plan: null,
      nombre: '',
      descripcion: '',
      precio: '',
      duracion_meses: ''
    });
    const mostrarFormularioAgregar = ref(false);
    const mostrarFormularioEditar = ref(false);

    const agregarPlan = () => {
      const payload = {
        nombre: nuevoPlan.value.nombre,
        descripcion: nuevoPlan.value.descripcion,
        precio: parseFloat(nuevoPlan.value.precio),
        duracion_meses: parseInt(nuevoPlan.value.duracion_meses),
      };

      axios.post("http://localhost:3000/api/planes", payload)
        .then(response => {
          planes.value = [...planes.value, response.data];
          nuevoPlan.value = {
            nombre: '',
            descripcion: '',
            precio: '',
            duracion_meses: ''
          };
          mostrarFormularioAgregar.value = false;
          alert('Plan agregado exitosamente');
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al agregar plan:", err);
          alert('Error al agregar plan');
        });
    };

    const editPlan = (plan) => {
      planEditado.value = { ...plan }; // Copiar los datos del plan a editar
      mostrarFormularioEditar.value = true; // Mostrar el formulario de edición
    };

    const actualizarPlan = () => {
      const payload = {
        nombre: planEditado.value.nombre,
        descripcion: planEditado.value.descripcion,
        precio: parseFloat(planEditado.value.precio),
        duracion_semanas: parseInt(planEditado.value.duracion_semanas),
      };

      axios.put(`http://localhost:3000/api/planes/${planEditado.value.id_plan}`, payload)
        .then(response => {
          // Actualizar el plan en la lista local
          const index = planes.value.findIndex(p => p.id_plan === planEditado.value.id_plan);
          if (index !== -1) {
            planes.value[index] = { ...planEditado.value };
          }
          mostrarFormularioEditar.value = false; // Ocultar el formulario
          alert('Plan actualizado exitosamente');
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al actualizar plan:", err);
          alert('Error al actualizar plan');
        });
    };

    const eliminarPlan = (id) => {
      if (!confirm('¿Estás seguro de que deseas eliminar este plan?')) {
        return;
      }

      axios.delete(`http://localhost:3000/api/planes/${id}`)
        .then(response => {
          if (response.status === 200) {
            planes.value = planes.value.filter(plan => plan.id_plan !== id);
            alert('Plan eliminado exitosamente');
          } else {
            alert('No se pudo eliminar el plan');
          }
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error al eliminar plan:", err);
          alert('Error al eliminar plan');
        });
    };

    onMounted(() => {
      axios
        .get("http://localhost:3000/api/planes")
        .then((response) => {
          planes.value = response.data;
          loading.value = false;
        })
        .catch((err) => {
          error.value = err.message;
          loading.value = false;
        });
    });

    return {
      planes,
      loading,
      error,
      nuevoPlan,
      planEditado,
      mostrarFormularioAgregar,
      mostrarFormularioEditar,
      agregarPlan,
      editPlan,
      actualizarPlan,
      eliminarPlan
    };
  },
};
</script>

<style scoped>
.plans-container {
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
input[type="text"],
input[type="number"],
textarea {
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

input[type="text"]:focus,
input[type="number"]:focus,
textarea:focus {
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

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.font-semibold {
  font-weight: 600;
}
</style>