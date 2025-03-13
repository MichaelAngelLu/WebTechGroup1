<script setup>
</script>

<template>
  <div class="dashboard-container">
    <!-- Header Section with Logo and Text -->
    <div class="dashboard-header">
      <img src="@/assets/logo.svg" alt="JuanJobsPH Logo" class="dashboard-logo" />
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage job listings, applications, and users.</p>
      </div>
    </div>

    <!-- Admin Menu -->
    <div class="admin-menu">
      <RouterLink to="/admin/jobs">Manage Jobs</RouterLink>
      <RouterLink to="/admin/applications">Applications</RouterLink>
      <RouterLink to="/admin/users">Manage Users</RouterLink>
      <RouterLink to="/admin/settings">Settings</RouterLink>
    </div>
  </div>
</template>