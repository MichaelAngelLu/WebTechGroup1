<script setup>
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'


const route = useRoute()

// Pages where the Navbar should be hidden
const hideNavbarOn = ['/applicant', '/admin']
</script>

<template>
  <div id="app">
    <!-- Conditionally show Navbar -->
    <Navbar v-if="!hideNavbarOn.some(path => route.path.startsWith(path))" />

    <main>
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
