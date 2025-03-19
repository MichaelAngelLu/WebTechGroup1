<template>
  <div class="admin-page-container">
    <!-- Page Header -->
    <h2>Manage Jobs</h2>
    <p>Manage Job Listings.</p>

    <!-- Card-like Table -->
    <div class="card">
      <BaseTable :headers="['ID', 'Title', 'Location', 'Status', 'Actions']">
        <template #default>
          <tr v-for="job in jobListings" :key="job.id">
            <td>{{ job.id }}</td>
            <td>{{ job.title }}</td>
            <td>{{ job.location }}</td>
            <td>{{ job.status }}</td>
            <td>
              <BaseButton label="Edit" size="sm" @click="editJob(job.id)" />
              <BaseButton label="Delete" size="sm" variant="secondary" @click="deleteJob(job.id)" />
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

// Sample data
const jobListings = ref([
  { id: 1, title: "Software Engineer", location: "Manila", status: "Active" },
  { id: 2, title: "HR Specialist", location: "Cebu", status: "Closed" },
])

// Action handlers
const editJob = (id) => {
  alert(`Edit job with ID: ${id}`)
}

const deleteJob = (id) => {
  jobListings.value = jobListings.value.filter(job => job.id !== id)
  alert(`Deleted job with ID: ${id}`)
}
</script>
