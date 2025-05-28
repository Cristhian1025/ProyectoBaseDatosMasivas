<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header />

    <main class="flex-1 py-10 w-full">
      <div class="container mx-auto px-4">
        <div class="home-container p-6">
          <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Bienvenido a Gim SAS
          </h1>
          <p class="mb-6 text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
            Este es el panel de inicio de tu aplicación de gestión de gimnasio.
            Aquí encontrarás información importante y accesos rápidos a las
            diferentes secciones.
          </p>

          <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400 py-8">
            Cargando datos del dashboard...
          </div>
          <div v-else-if="error" class="text-center text-red-500 py-8">
            Error al cargar los datos: {{ error }}
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              class="card bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105"
            >
              <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Clientes Activos
              </h3>
              <p class="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                {{ totalClients }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Total de clientes con suscripciones activas.
              </p>
            </div>

            <div
              class="card bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105"
            >
              <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Planes Disponibles
              </h3>
              <p class="text-4xl font-extrabold text-green-600 dark:text-green-400">
                {{ totalPlans }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Número de planes de entrenamiento ofrecidos.
              </p>
            </div>

            <div
              class="card bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105"
            >
              <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Empleados Registrados
              </h3>
              <p class="text-4xl font-extrabold text-purple-600 dark:text-purple-400">
                {{ totalInstructors }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Número total de empleados en el sistema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

// Reactive states for dashboard data
const totalClients = ref(0);
const totalPlans = ref(0);
const totalInstructors = ref(0); // Renamed from instructors to be more general for employees
const loading = ref(true);
const error = ref(null);

// Function to fetch all dashboard data
const fetchDashboardData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const [clientsRes, plansRes, employeesRes] = await Promise.all([
      axios.get('http://localhost:3000/api/cliente-plan'), // Get all client-plans to count unique active clients
      axios.get('http://localhost:3000/api/planes'),
      axios.get('http://localhost:3000/api/empleados')
    ]);

    // Calculate total active clients
    // Assuming 'estado_suscripcion' is 'Activa' for active subscriptions
    const activeSubscriptions = clientsRes.data.filter(sub => sub.estado_suscripcion === 'Activa');
    const uniqueClientIds = new Set(activeSubscriptions.map(sub => sub.id_cliente));
    totalClients.value = uniqueClientIds.size;

    // Get total number of plans
    totalPlans.value = plansRes.data.length;

    // Get total number of employees (assuming all are instructors for now, or could filter by 'puesto')
    totalInstructors.value = employeesRes.data.length;
    // If you need to filter by a specific 'puesto' (e.g., 'Instructor'), you would do:
    // totalInstructors.value = employeesRes.data.filter(emp => emp.puesto === 'Instructor').length;

  } catch (err) {
    error.value = err.response?.data?.error || err.message;
    console.error('Error al cargar datos del dashboard:', err);
  } finally {
    loading.value = false;
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchDashboardData();
});
</script>


  
  <style scoped>
  .home-container {
    padding: 2rem;
  }
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  .font-bold {
    font-weight: 700;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .text-gray-900 {
    color: #111827;
  }
  .dark\:text-white {
    color: #fff;
  }
  .text-gray-700 {
    color: #374151;
  }
  .dark\:text-gray-300 {
    color: #d1d5db;
  }
  .grid {
    display: grid;
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 768px) {
    .md\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .lg\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  .gap-6 {
    gap: 1.5rem;
  }
  .card {
    border-radius: 0.5rem;
  }
  .bg-white {
    background-color: #fff;
  }
  .dark\:bg-gray-800 {
    background-color: #1f2937;
  }
  .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .p-6 {
    padding: 1.5rem;
  }
  .flex {
    display: flex;
  }
  .flex-col {
    flex-direction: column;
  }
  .justify-between {
    justify-content: space-between;
  }
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .text-blue-500 {
    color: #3b82f6;
  }
  .dark\:text-blue-400 {
    color: #60a5fa;
  }
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .text-gray-500 {
    color: #6b7280;
  }
  .dark\:text-gray-400 {
    color: #9ca3af;
  }
  .mt-2 {
    margin-top: 0.5rem;
  }
  .text-green-500 {
    color: #16a34a;
  }
  .dark\:text-green-400 {
    color: #22c55e;
  }
  .text-purple-500 {
    color: #8b5cf6;
  }
  .dark\:text-purple-400 {
    color: #a855f7;
  }
  .w-full {
    width: 100%;
  }
  </style>