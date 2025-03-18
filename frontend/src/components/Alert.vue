<template>
    <div :class="['alert', type]">
      <slot />
    </div>
  </template>
  
  <script setup>
  defineProps({
    type: {
      type: String,
      default: 'info' // Options: 'info', 'success', 'error'
    }
  });
  </script>
  
  <style scoped>
  .alert {
    padding: 12px;
    border-radius: 6px;
    margin: 10px 0;
  }
  
  .alert.info {
    background-color: #e0f2fe;
    color: #0369a1;
  }
  
  .alert.success {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .alert.error {
    background-color: #fee2e2;
    color: #991b1b;
  }
  </style>
  