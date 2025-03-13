<template>
    <header class="navbar">
      <div class="logo-container">
        <img src="@/assets/logo.svg" alt="JuanJobsPH Logo" class="logo" />
      </div>
  
      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/jobs">Jobs</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { RouterLink } from "vue-router";
  </script>
  