<template>
  <div class="admin-page-container">
    <h2>Manage Jobs</h2>
    <p>Manage Job Listings.</p>

    <div class="card">
      <BaseTable :headers="['ID', 'Title', 'Location', 'Status', 'Actions']">
        <template #default>
          <tr v-for="job in jobListings" :key="job.id">
            <td>{{ job.id }}</td>
            <td>{{ job.title }}</td>
            <td>{{ job.location }}</td>
            <td>{{ job.status }}</td>
            <td>
              <div class="action-buttons">
                <BaseButton label="Edit" size="sm" @click="editJob(job.id)" />
                <BaseButton label="Delete" size="sm" variant="danger" @click="deleteJob(job.id)" />
              </div>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseButton from '@/components/BaseButton.vue'

const jobListings = ref([
  { id: 1, title: "Software Engineer", location: "Manila", status: "Active" },
  { id: 2, title: "HR Specialist", location: "Cebu", status: "Closed" },
])

const editJob = (id) => {
  alert(`Edit job ID: ${id}`)
}

const deleteJob = (id) => {
  jobListings.value = jobListings.value.filter(job => job.id !== id)
  alert(`Deleted job ID: ${id}`)
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
