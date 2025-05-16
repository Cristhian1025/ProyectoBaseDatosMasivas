<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <Header/>

    <main class="flex-1 py-10 w-full">
      <div class="container mx-auto px-4">
        <slot /> </div>
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
export default defineComponent({
  name: 'Dashboard',
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

