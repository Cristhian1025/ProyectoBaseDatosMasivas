<template>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.3-.87 2.23a4 4 0 0 1-1.13 1.27V22"
              ></path>
              <path
                d="M4 15.94a9.704 9.704 0 0 0 0 8 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 9.7 9.7 0 0 0 0-8"
              ></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/cristhian-andrey-poveda-gaviria-21075a1b0/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              ></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  </template>


<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()  
function navigateTo(path) {
  router.push(path)
}
</script>