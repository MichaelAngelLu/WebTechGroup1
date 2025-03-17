<script setup>
</script>

<template>
  <div class="dashboard-container">
    <!-- Header Section with Logo and Text -->
    <div class="dashboard-header">
      <img src="@/assets/logo.svg" alt="JuanJobsPH Logo" class="dashboard-logo" />
      <div>
        <h1>Applicant Dashboard</h1>
        <p>Track your job applications, browse jobs, and manage your profile.</p>
      </div>
    </div>

    <!-- Applicant Menu -->
    <div class="admin-menu">
      <RouterLink to="/applicant/jobs">Job Listings</RouterLink>
      <RouterLink to="/applicant/applications">My Applications</RouterLink>
      <RouterLink to="/applicant/profile">My Profile</RouterLink>
      <RouterLink to="/applicant/settings">Settings</RouterLink>
    </div>
  </div>
</template>