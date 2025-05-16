
<template>
    <button
      class="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md"
      @click="navigateTo(to)"
    >
      {{ label }}
    </button>
  </template>
  
  <script setup>
  defineProps({
    to: String,
    label: String
  });
  
  const navigateTo = (url) => {
    window.location.href = url; // o usa router.push si tienes Vue Router configurado
  };
  </script>