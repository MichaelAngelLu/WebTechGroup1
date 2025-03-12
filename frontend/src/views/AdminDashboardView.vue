<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div>
    <Navbar />
    <main class="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Manage job listings, applications, and users.</p>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  text-align: center;
  margin: 100px auto;
  padding: 30px;
  max-width: 800px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #10204d;
  font-size: 2.2rem;
  font-weight: 700;
}

p {
  font-size: 1.3rem;
  color: #374151;
}
</style>
