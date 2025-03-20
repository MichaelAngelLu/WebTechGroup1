<template>
  <div class="admin-page-container">
    <h2>Job Listings</h2>
    <p>Explore and apply for available job listings.</p>

    <div class="card">
      <BaseTable :headers="['ID', 'Job Title', 'Location', 'Status', 'Actions']">
        <template #default>
          <tr v-for="job in jobListings" :key="job.id">
            <td>{{ job.id }}</td>
            <td>{{ job.title }}</td>
            <td>{{ job.location }}</td>
            <td>{{ job.status }}</td>
            <td>
              <div class="action-buttons">
                <BaseButton
                  label="Apply"
                  size="sm"
                  variant="primary"
                  @click="applyForJob(job.id)"
                />
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
import { useRouter } from 'vue-router'
import BaseTable from '@/components/BaseTable.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const jobListings = ref([
  { id: 1, title: "Software Engineer", location: "Manila", status: "Active" },
  { id: 2, title: "HR Specialist", location: "Cebu", status: "Active" },
])

const applyForJob = (id) => {
  router.push({ path: '/applicant/job-application', query: { jobId: id } })
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
