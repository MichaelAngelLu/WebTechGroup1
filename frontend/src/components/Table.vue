<script setup>
defineProps({
  columns: Array, // ["ID", "Title", "Location", "Status"]
  rows: Array,    // Array of objects [{ id: 1, title: "...", location: "...", status: "..." }]
  actions: Boolean // Whether to show action buttons (Edit/Delete)
});
const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">{{ col }}</th>
          <th v-if="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="col in columns" :key="col">{{ row[col.toLowerCase()] }}</td>
          <td v-if="actions">
            <button class="btn-edit" @click="emit('edit', row)">Edit</button>
            <button class="btn-delete" @click="emit('delete', row.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background: #10204d;
  color: white;
}
tr:hover {
  background-color: #f1f5f9;
}
.btn-edit, .btn-delete {
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-edit {
  background-color: #1e3a8a;
  color: white;
}
.btn-delete {
  background-color: crimson;
  color: white;
}
@media (max-width: 768px) {
  table {
    font-size: 14px;
  }
  .btn-edit, .btn-delete {
    padding: 4px 8px;
  }
}
</style>
