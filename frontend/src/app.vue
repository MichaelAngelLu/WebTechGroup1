<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div id="app">
    <!-- Reusable Navbar -->
    <Navbar />

    <!-- Page Content -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 JuanJobsPH | No. 1 Recruitment Agency Platform</p>
    </footer>
  </div>
</template>

<style scoped>
/* Global Layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Main Content */
.main-content {
  flex: 1;
  padding-top: 80px; /* Space below navbar */
}

/* Footer */
.footer {
  text-align: center;
  padding: 1rem;
  background: #111827;
  color: white;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
