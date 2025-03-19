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
  }
});
</script>
<style scoped>
/* BaseTable styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: auto;
  font-family: 'Poppins', sans-serif;
  color: #10204d;
}

/* Grid lines for all cells */
th,
td {
  padding: 12px;
  border: 1px solid #ffffff;
  text-align: center;
  background-color: #ffffff;
}

/* Header with background */
thead th {
  background-color: #ADE4FD;
}

/* Zebra-striping effect */
tbody tr:nth-child(odd) td {
  background-color: #f9f9f9;
}

tbody tr:nth-child(even) td {
  background-color: #ffffff;
}

/* Hover row effect */
tbody tr:hover td {
  background-color: #f1f5f9 !important;
}

/* ID column */
th:first-child,
td:first-child {
  white-space: nowrap;
  width: 50px;
  text-align: center;
}

/* Fix the Actions column */
th:last-child,
td:last-child {
  width: 180px;
  text-align: center;
}

/* Flexbox for action buttons */
.action-buttons {
  display: inline-flex; /* 👈 inline-flex will center inside the cell */
  gap: 6px;
  justify-content: center;
  align-items: center;
}



</style>
