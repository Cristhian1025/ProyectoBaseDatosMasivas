<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow-md py-4 px-6 w-full">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Gim SAS</h1>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <button class="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
                Inicio
              </button>
            </li>
            <li>
              <button class="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
                Clientes
              </button>
            </li>
            <li>
              <button class="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
                Empleados
              </button>
            </li>
             <li>
              <button class="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md">
                Planes
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-1 py-10 w-full">
      <div class="container mx-auto px-4">
        <slot /> </div>
    </main>

    <footer class="bg-white dark:bg-gray-800 py-4 px-6 border-t border-gray-200 dark:border-gray-700 w-full">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
          &copy; {{ new Date().getFullYear() }} Gim SAS. Todos los derechos reservados.
        </p>
        <div class="flex items-center space-x-4">
          <a
            href="https://github.com/Cristhian1025"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.3-.87 2.23a4 4 0 0 1-1.13 1.27V22"></path><path d="M4 15.94a9.704 9.704 0 0 0 0 8 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 9.7 9.7 0 0 0 0-8"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
          <a
            href="https://www.linkedin.com/in/cristhian-andrey-poveda-gaviria-21075a1b0/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
  setup() {
    return {};
  },
});
</script>

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
.flex-col{
  flex-direction: column;
}
.min-h-screen{
  min-height: 100vh;
}
.bg-gray-100{
  background-color: #f3f4f6;
}
.dark\:bg-gray-900{
  background-color: #111827;
}
.bg-white{
  background-color: #fff;
}
.dark\:bg-gray-800{
  background-color: #1f2937;
}
.shadow-md{
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.py-4{
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.px-6{
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
.text-gray-700{
  color: #374151;
}
.dark\:text-gray-300{
  color: #d1d5db;
}
.hover\:bg-gray-100:hover{
  background-color: #f9fafb;
}
.dark\:hover\:bg-gray-700:hover{
  background-color: #374151;
}
.rounded-md{
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
.items-center{
  align-items: center;
}
.space-x-4 > * + *{
  margin-left: 1rem;
}
.hover\:text-blue-500:hover{
  color: #3b82f6;
}
.dark\:hover\:text-blue-400:hover{
  color: #60a5fa;
}
.transition-colors{
  transition-property: color;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.h-5{
  height: 1.25rem;
  width: 1.25rem;
}
.hover\:text-blue-700:hover{
  color: #1d4ed8;
}
.dark\:hover\:text-blue-300:hover{
  color: #86efac;
}
.w-full{
  width: 100%;
}
</style>
