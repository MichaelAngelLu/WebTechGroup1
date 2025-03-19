<template>
  <table class="base-table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
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
});
</script>

<style scoped>
/* Globalized table styles */

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #10204d;
  color: #ffffff;
}

th,
td {
  padding: 12px;
  border: 1px solid #e7ebe5;
  text-align: left;
}

tbody tr:hover {
  background-color: #f1f5f9;
}
</style>