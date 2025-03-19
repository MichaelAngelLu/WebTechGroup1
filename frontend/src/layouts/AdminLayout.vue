<!-- AdminLayout.vue -->
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="dashboard-container">
    <!-- Shared Header -->
    <div class="dashboard-header">
      <img src="@/assets/logo.svg" alt="JuanJobsPH Logo" class="logo" />
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage job listings, applications, and users.</p>
      </div>
    </div>
    <div>
    <!-- Shared Admin Menu -->
    <div class="admin-menu">
      <RouterLink to="/admin/manage-jobs">Manage Jobs</RouterLink>
      <RouterLink to="/admin/view-applications">Applications</RouterLink>
      <RouterLink to="/admin/users">Manage Users</RouterLink>
      <RouterLink to="/admin/settings">Settings</RouterLink>
    </div>
  </div>
    <!-- This is where ManageJobs or any other page will be injected -->
    <RouterView />
  </div>
</template>
