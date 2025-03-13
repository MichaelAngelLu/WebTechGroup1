<script setup>
import { ref } from 'vue';

// Toggle sidebar for mobile
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <aside :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]">
    <button class="toggle-btn" @click="toggleSidebar">☰</button>

    <ul class="menu">
      <li><RouterLink to="/admin">Dashboard</RouterLink></li>
      <li><RouterLink to="/admin/jobs">Manage Jobs</RouterLink></li>
      <li><RouterLink to="/admin/applications">Applications</RouterLink></li>
      <li><RouterLink to="/admin/users">Manage Users</RouterLink></li>
      <li><RouterLink to="/admin/settings">Settings</RouterLink></li>
    </ul>
  </aside>
</template>

<style scoped>
/* Sidebar Container */
.sidebar {
  width: 260px;
  height: 100vh;
  background: #10204d;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
}

/* Sidebar Closed (For Mobile) */
.sidebar-closed {
  width: 80px;
}

/* Toggle Button */
.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 30px;
  text-align: left;
  display: block;
}

/* Menu List */
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  padding: 15px 20px;
}

.menu li a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  display: block;
  transition: 0.3s ease-in-out;
}

.menu li a:hover {
  background: #1e3a8a;
  border-radius: 5px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .sidebar-closed {
    width: 50px;
  }
}
</style>
