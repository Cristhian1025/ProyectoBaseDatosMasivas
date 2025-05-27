<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />
    
    <!-- Modal para Ver Suscripción -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeViewModal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white text-center mb-4">Detalles de Suscripción</h3>
          <div v-if="selectedSuscripcion" class="space-y-3">
            <div><strong>Cliente:</strong> {{ selectedSuscripcion.cliente_nombre }} {{ selectedSuscripcion.cliente_apellido }}</div>
            <div><strong>Teléfono:</strong> {{ selectedSuscripcion.cliente_telefono }}</div>
            <div><strong>Plan:</strong> {{ selectedSuscripcion.plan_nombre }}</div>
            <div><strong>Descripción:</strong> {{ selectedSuscripcion.plan_descripcion }}</div>
            <div><strong>Precio:</strong> ${{ selectedSuscripcion.plan_precio }}</div>
            <div><strong>Fecha Inicio:</strong> {{ formatDate(selectedSuscripcion.fecha_inicio) }}</div>
            <div><strong>Fecha Fin:</strong> {{ formatDate(selectedSuscripcion.fecha_fin) }}</div>
            <div><strong>Estado:</strong> 
              <span :class="getEstadoClass(selectedSuscripcion.estado_suscripcion)" class="px-2 py-1 rounded-full text-xs font-medium">
                {{ selectedSuscripcion.estado_suscripcion }}
              </span>
            </div>
            <div><strong>Días Restantes:</strong> {{ getDiasRestantes(selectedSuscripcion.dias_restantes) }}</div>
          </div>
          <div class="flex justify-end mt-6">
            <button @click="closeViewModal" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Crear/Editar Suscripción -->
    <div v-if="showFormModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeFormModal">
      <div class="relative top-10 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white text-center mb-4">
            {{ isEditing ? 'Editar Suscripción' : 'Nueva Suscripción' }}
          </h3>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ID Cliente</label>
              <input v-model="formData.id_cliente" type="number" required 
                     :disabled="isEditing"
                     class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ID Plan</label>
              <input v-model="formData.id_plan" type="number" required 
                     :disabled="isEditing"
                     class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Inicio</label>
              <input v-model="formData.fecha_inicio" type="date" required
                     class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Fin</label>
              <input v-model="formData.fecha_fin" type="date" required
                     class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div v-if="!isEditing">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">O especificar meses (opcional)</label>
              <input v-model="formData.meses" type="number" min="1" max="24"
                     class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <small class="text-gray-500">Si especifica meses, se calculará automáticamente la fecha fin</small>
            </div>
            <div class="flex justify-end space-x-2 mt-6">
              <button type="button" @click="closeFormModal" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Cancelar
              </button>
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {{ isEditing ? 'Actualizar' : 'Crear' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="subs-container p-6 flex-1 py-10 w-full">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestión de Suscripciones</h2>

      <div class="mb-4 flex gap-4">
        <button @click="addSuscripcion" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Crear Nueva Suscripción
        </button>
        <button @click="toggleFilter" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {{ showOnlyActive ? 'Ver Todas' : 'Solo Activas' }}
        </button>
      </div>
      
      <div class="p-6 flex-1 py-10 w-full">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Lista de Suscripciones {{ showOnlyActive ? 'Activas' : '' }}
        </h1>

        <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400">
          Cargando suscripciones...
        </div>
        <div v-else-if="error" class="text-center text-red-500">
          Error: {{ error }}
        </div>
        <div v-else class="shadow-md overflow-hidden rounded-md">
          <table class="min-w-full bg-white dark:bg-gray-800">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Teléfono
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Plan
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Precio
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha Inicio
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha Fin
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Días Restantes
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="suscripcion in suscripciones" :key="`${suscripcion.id_cliente}-${suscripcion.id_plan}`">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ suscripcion.cliente_nombre }} {{ suscripcion.cliente_apellido }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ suscripcion.cliente_telefono }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <div class="font-medium">{{ suscripcion.plan_nombre }}</div>
                    <div class="text-xs text-gray-500">{{ suscripcion.plan_descripcion }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  ${{ suscripcion.plan_precio }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ formatDate(suscripcion.fecha_inicio) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ formatDate(suscripcion.fecha_fin) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="getEstadoClass(suscripcion.estado_suscripcion)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ suscripcion.estado_suscripcion }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ getDiasRestantes(suscripcion.dias_restantes) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="viewSuscripcion(suscripcion)" class="text-blue-600 hover:text-blue-900 mr-2">Ver</button>
                  <button @click="renovarSuscripcion(suscripcion)" class="text-green-600 hover:text-green-900 mr-2" v-if="suscripcion.estado_suscripcion === 'Activa'">Renovar</button>
                  <button @click="editSuscripcion(suscripcion)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                  <button @click="eliminarSuscripcion(suscripcion.id_cliente, suscripcion.id_plan)" class="text-red-600 hover:text-red-900">Eliminar</button>
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
  name: "Subs",
  components: {
    Header,
    Footer,
  },
  setup() {
    const suscripciones = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const showOnlyActive = ref(false);
    
    // Estados para modales
    const showViewModal = ref(false);
    const showFormModal = ref(false);
    const selectedSuscripcion = ref(null);
    const isEditing = ref(false);
    
    // Datos del formulario
    const formData = ref({
      id_cliente: '',
      id_plan: '',
      fecha_inicio: '',
      fecha_fin: '',
      meses: ''
    });

    const loadSuscripciones = async () => {
      loading.value = true;
      try {
        const endpoint = showOnlyActive.value 
          ? "http://localhost:3000/api/cliente-plan/activas"
          : "http://localhost:3000/api/cliente-plan";
        
        const response = await axios.get(endpoint);
        suscripciones.value = response.data;
        error.value = null;
      } catch (err) {
        error.value = err.message;
        console.error('Error loading suscripciones:', err);
      } finally {
        loading.value = false;
      }
    };

    const addSuscripcion = () => {
      isEditing.value = false;
      formData.value = {
        id_cliente: '',
        id_plan: '',
        fecha_inicio: new Date().toISOString().split('T')[0],
        fecha_fin: '',
        meses: '1'
      };
      showFormModal.value = true;
    };

    const toggleFilter = () => {
      showOnlyActive.value = !showOnlyActive.value;
      loadSuscripciones();
    };

    const viewSuscripcion = (suscripcion) => {
      selectedSuscripcion.value = suscripcion;
      showViewModal.value = true;
    };

    const editSuscripcion = (suscripcion) => {
      isEditing.value = true;
      selectedSuscripcion.value = suscripcion;
      formData.value = {
        id_cliente: suscripcion.id_cliente,
        id_plan: suscripcion.id_plan,
        fecha_inicio: suscripcion.fecha_inicio ? suscripcion.fecha_inicio.split('T')[0] : '',
        fecha_fin: suscripcion.fecha_fin ? suscripcion.fecha_fin.split('T')[0] : '',
        meses: ''
      };
      showFormModal.value = true;
    };

    const renovarSuscripcion = async (suscripcion) => {
      try {
        const meses = prompt('¿Cuántos meses desea renovar?', '1');
        if (meses && !isNaN(meses)) {
          await axios.put(
            `http://localhost:3000/api/cliente-plan/${suscripcion.id_cliente}/${suscripcion.id_plan}/renovar`,
            { meses: parseInt(meses) }
          );
          alert('Suscripción renovada correctamente');
          loadSuscripciones();
        }
      } catch (err) {
        console.error('Error renovando suscripción:', err);
        alert('Error al renovar la suscripción');
      }
    };

    const eliminarSuscripcion = async (idCliente, idPlan) => {
      if (confirm('¿Está seguro de que desea eliminar esta suscripción?')) {
        try {
          await axios.delete(`http://localhost:3000/api/cliente-plan/${idCliente}/${idPlan}`);
          alert('Suscripción eliminada correctamente');
          loadSuscripciones();
        } catch (err) {
          console.error('Error eliminando suscripción:', err);
          alert('Error al eliminar la suscripción');
        }
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('es-ES');
    };

    const getEstadoClass = (estado) => {
      return estado === 'Activa' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800';
    };

    const closeViewModal = () => {
      showViewModal.value = false;
      selectedSuscripcion.value = null;
    };

    const closeFormModal = () => {
      showFormModal.value = false;
      selectedSuscripcion.value = null;
      isEditing.value = false;
      formData.value = {
        id_cliente: '',
        id_plan: '',
        fecha_inicio: '',
        fecha_fin: '',
        meses: ''
      };
    };

    const submitForm = async () => {
      try {
        if (isEditing.value) {
          // Actualizar suscripción existente
          await axios.put(
            `http://localhost:3000/api/cliente-plan/${selectedSuscripcion.value.id_cliente}/${selectedSuscripcion.value.id_plan}`,
            {
              fecha_inicio: formData.value.fecha_inicio,
              fecha_fin: formData.value.fecha_fin
            }
          );
          alert('Suscripción actualizada correctamente');
        } else {
          // Crear nueva suscripción
          const payload = {
            id_cliente: parseInt(formData.value.id_cliente),
            id_plan: parseInt(formData.value.id_plan),
            fecha_inicio: formData.value.fecha_inicio,
            fecha_fin: formData.value.fecha_fin
          };
          
          // Si se especificaron meses en lugar de fecha fin
          if (formData.value.meses && !formData.value.fecha_fin) {
            payload.meses = parseInt(formData.value.meses);
          }
          
          await axios.post('http://localhost:3000/api/cliente-plan', payload);
          alert('Suscripción creada correctamente');
        }
        
        closeFormModal();
        loadSuscripciones();
      } catch (err) {
        console.error('Error en formulario:', err);
        alert(`Error al ${isEditing.value ? 'actualizar' : 'crear'} la suscripción: ${err.response?.data?.error || err.message}`);
      }
    };

    const getDiasRestantes = (dias) => {
      if (!dias) return 'N/A';
      const diasNum = parseInt(dias);
      if (diasNum < 0) return 'Vencida';
      if (diasNum === 0) return 'Hoy';
      return `${diasNum} días`;
    };

    onMounted(() => {
      loadSuscripciones();
    });

    return {
      suscripciones,
      loading,
      error,
      showOnlyActive,
      showViewModal,
      showFormModal,
      selectedSuscripcion,
      isEditing,
      formData,
      addSuscripcion,
      toggleFilter,
      viewSuscripcion,
      editSuscripcion,
      renovarSuscripcion,
      eliminarSuscripcion,
      closeViewModal,
      closeFormModal,
      submitForm,
      formatDate,
      getEstadoClass,
      getDiasRestantes
    };
  },
};
</script>

<style scoped>
.fixed{
  position: fixed;
}
.inset-0{
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-gray-600{
  background-color: #4b5563;
}
.bg-opacity-50{
  background-color: rgba(75, 85, 99, 0.5);
}
.overflow-y-auto{
  overflow-y: auto;
}
.h-full{
  height: 100%;
}
.w-full{
  width: 100%;
}
.z-50{
  z-index: 50;
}
.relative{
  position: relative;
}
.top-20{
  top: 5rem;
}
.top-10{
  top: 2.5rem;
}
.mx-auto{
  margin-left: auto;
  margin-right: auto;
}
.p-5{
  padding: 1.25rem;
}
.border{
  border-width: 1px;
}
.w-96{
  width: 24rem;
}
.shadow-lg{
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.rounded-md{
  border-radius: 0.375rem;
}
.mt-3{
  margin-top: 0.75rem;
}
.text-lg{
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-center{
  text-align: center;
}
.mb-6{
  margin-bottom: 1.5rem;
}
.space-y-3 > * + *{
  margin-top: 0.75rem;
}
.space-y-4 > * + *{
  margin-top: 1rem;
}
.space-x-2 > * + *{
  margin-left: 0.5rem;
}
.flex{
  display: flex;
}
.justify-end{
  justify-content: flex-end;
}
.mt-6{
  margin-top: 1.5rem;
}
.bg-gray-500{
  background-color: #6b7280;
}
.hover\:bg-gray-700:hover{
  background-color: #374151;
}
.block{
  display: block;
}
.mt-1{
  margin-top: 0.25rem;
}
.px-3{
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.border-gray-300{
  border-color: #d1d5db;
}
.focus\:outline-none:focus{
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\:ring-blue-500:focus{
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
.focus\:border-blue-500:focus{
  border-color: #3b82f6;
}
.dark\:bg-gray-700{
  background-color: #374151;
}
.dark\:border-gray-600{
  border-color: #4b5563;
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
.bg-blue-500{
  background-color: #3b82f6;
}
.hover\:bg-blue-700:hover{
  background-color: #1d4ed8;
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
.gap-4{
  gap: 1rem;
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
.bg-green-100{
  background-color: #dcfce7;
}
.text-green-800{
  color: #166534;
}
.bg-red-100{
  background-color: #fee2e2;
}
.text-red-800{
  color: #991b1b;
}
.rounded-full{
  border-radius: 9999px;
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
.text-xs{
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-medium{
  font-weight: 500;
}
.text-gray-700{
  color: #374151;
}
.text-gray-500{
  color: #6b7280;
}
.dark\:text-gray-300{
  color: #d1d5db;
}
.text-right{
  text-align: right;
}
.text-blue-600{
  color: #2563eb;
}
.hover\:text-blue-900:hover{
  color: #1e3a8a;
}
.text-indigo-600{
  color: #4f46e5;
}
.hover\:text-indigo-900:hover{
  color: #3730a3;
}
.text-green-600{
  color: #16a34a;
}
.hover\:text-green-900:hover{
  color: #14532d;
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