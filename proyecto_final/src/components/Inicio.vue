<template>
    <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header/>
  
      <main class="flex-1 py-10 w-full">
        <div class="container mx-auto px-4">
          <div class="home-container p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Bienvenido a Gim SAS
            </h2>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              Este es el panel de inicio de tu aplicación de gestión de gimnasio.
              Aquí encontrarás información importante y accesos rápidos a las
              diferentes secciones.
            </p>
  
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                class="card bg-white dark:bg-gray-800 shadow-md rounded-md p-6 flex flex-col justify-between"
              >
                <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Clientes Activos
                </h3>
                <p class="text-xl font-bold text-blue-500 dark:text-blue-400">
                  150
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Total de clientes activos.
                </p>
              </div>
  
              <div
                class="card bg-white dark:bg-gray-800 shadow-md rounded-md p-6 flex flex-col justify-between"
              >
                <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Planes Disponibles
                </h3>
                <p class="text-xl font-bold text-green-500 dark:text-green-400">
                  10
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Número de planes de entrenamiento.
                </p>
              </div>
  
              <div
                class="card bg-white dark:bg-gray-800 shadow-md rounded-md p-6 flex flex-col justify-between"
              >
                <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Instructores
                </h3>
                <p class="text-xl font-bold text-purple-500 dark:text-purple-400">
                  5
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Número de instructores activos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <Footer/>
    </div>
  </template>
  
  <script setup>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  </script>
  


  <script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Inicio',
  setup() {
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      navigateTo,
    };
  },
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