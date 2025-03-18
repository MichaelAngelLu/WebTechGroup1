<template>
    <table class="base-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
          <th v-if="hasActions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </template>
  
  <script setup>
  defineProps({
    headers: {
      type: Array,
      required: true,
    },
    hasActions: {
      type: Boolean,
      default: false,
    },
  });
  </script>
  
  <style scoped>
  .base-table {
    width: 100%;
    border-collapse: collapse;
  }
  .base-table th,
  .base-table td {
    padding: 12px;
    border: 1px solid #e5e7eb;
    text-align: left;
  }
  .base-table thead {
    background: #10204d;
    color: white;
  }
  .base-table tbody tr:hover {
    background-color: #f1f5f9;
  }
  </style>
  