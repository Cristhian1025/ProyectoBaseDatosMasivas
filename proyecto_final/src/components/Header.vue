<template>
    <header class="bg-white dark:bg-gray-800 shadow-md py-4 px-6 w-full">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Gim SAS</h1>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <button
                class="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"
                @click="navigateTo('/inicio')"
              >
                Inicio
              </button>
            </li>
            <li>
              <button
              class="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"


                @click="navigateTo('/clientes')"
              >
                Clientes
              </button>
            </li>
            <li>
              <button
              class="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"
                @click="navigateTo('/empleados')"
              >
                Empleados
              </button>
            </li>
            <li>
              <button
              class="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"
                @click="navigateTo('/planes')"
              >
                Planes
              </button>
            </li>
            <li>
              <button
              class="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"
                @click="navigateTo('/Usuarios')"
              >
                Usuarios
              </button>
            </li>

            <li>
              <button
              class="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"
                @click="navigateTo('/gimnasios')"
              >
                Gimnasios
              </button>
            </li>

            <li>
              <button
              class="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"
                @click="navigateTo('/medidas')"
              >
                Medidas
              </button>
            </li>
            <li>
              <button
              class="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"
                @click="navigateTo('/subs')"
              >
                Suscripciones
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .flex {
    display: flex;
  }
  .flex-col {
    flex-direction: column;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .bg-gray-100 {
    background-color: #f3f4f6;
  }
  .dark\:bg-gray-900 {
    background-color: #111827;
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
  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .justify-between {
    justify-content: space-between;
  }
  
  .items-center {
    align-items: center;
  }
  
  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  
  .font-bold {
    font-weight: 700;
  }
  
  .text-gray-900 {
    color: #111827;
  }
  
  .dark\:text-white {
    color: #fff;
  }
  
  nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .space-x-4 > * + * {
    margin-left: 1rem;
  }
  .text-gray-700 {
    color: #374151;
  }
  .dark\:text-gray-300 {
    color: #d1d5db;
  }
  .hover\:bg-gray-100:hover {
    background-color: #f9fafb;
  }
  .dark\:hover\:bg-gray-700:hover {
    background-color: #374151;
  }
  .rounded-md {
    border-radius: 0.375rem;
  }
  .flex-1 {
    flex: 1;
  }
  
  .py-10 {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  
  .text-gray-600 {
    color: #4b5563;
  }
  
  .dark\:text-gray-400 {
    color: #9ca3af;
  }
  
  .md\:mb-0 {
    margin-bottom: 0;
  }
  
  .md\:flex-row {
    flex-direction: row;
  }
  
  .text-center {
    text-align: center;
  }
  
  .md\:text-left {
    text-align: left;
  }
  .items-center {
    align-items: center;
  }
  .space-x-4 > * + * {
    margin-left: 1rem;
  }
  .hover\:text-blue-500:hover {
    color: #3b82f6;
  }
  .dark\:hover\:text-blue-400:hover {
    color: #60a5fa;
  }
  .transition-colors {
    transition-property: color;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  .h-5 {
    height: 1.25rem;
    width: 1.25rem;
  }
  .hover\:text-blue-700:hover {
    color: #1d4ed8;
  }
  .dark\:hover\:text-blue-300:hover {
    color: #86efac;
  }
  .w-full {
    width: 100%;
  }
  </style>
  

  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()  
  function navigateTo(path) {
    router.push(path)
  }
  </script>
  