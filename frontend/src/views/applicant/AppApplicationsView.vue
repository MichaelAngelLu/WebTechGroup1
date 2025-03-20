<template>
  <div class="admin-page-container">
    <h2>My Applications</h2>
    <p>View the applications you have submitted.</p>

    <div class="card">
      <BaseTable :headers="['ID', 'Job Title', 'Status', 'Date Submitted', 'Actions']">
        <template #default>
          <tr v-for="application in applications" :key="application.id">
            <td>{{ application.id }}</td>
            <td>{{ application.jobTitle }}</td>
            <td>{{ application.status }}</td>
            <td>{{ application.dateSubmitted }}</td>
            <td>
              <div class="action-buttons">
                <!-- View Details Button -->
                <BaseButton label="View" size="sm" variant="primary" @click="viewApplication(application.id)" />
                <!-- Delete Button -->
                <BaseButton label="Delete" size="sm" variant="danger" @click="deleteApplication(application.id)" />
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

const applications = ref([
  { id: 1, jobTitle: "Software Engineer", status: "Pending", dateSubmitted: "2025-03-01" },
  { id: 2, jobTitle: "HR Specialist", status: "Accepted", dateSubmitted: "2025-03-02" },
])

const viewApplication = (id) => {
  alert(`Viewing application ID: ${id}`)
}

const deleteApplication = (id) => {
  alert(`Deleted application ID: ${id}`)
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

/* Stack vertically on small screens */
@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
