<script setup>
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/footer.vue';

const route = useRoute();
</script>

<template>
  <div id="app">
    <!-- Show Navbar Only If Not in Admin Pages -->
    <Navbar v-if="!route.path.startsWith('/admin')" />

    <main>
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
