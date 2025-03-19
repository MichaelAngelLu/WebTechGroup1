<template>
  <div class="admin-page-container">
    <h2>Applications</h2>
    <p>View and manage job applications.</p>

    <div class="card">
      <BaseTable :headers="['ID', 'Applicant Name', 'Position', 'Status', 'Actions']">
        <template #default>
          <tr v-for="app in applications" :key="app.id">
            <td>{{ app.id }}</td>
            <td>{{ app.name }}</td>
            <td>{{ app.position }}</td>
            <td>
              <span :class="['status-badge', app.status.toLowerCase()]">{{ app.status }}</span>
            </td>
            <td>
              <div class="action-buttons">
                <BaseButton label="View" size="sm" @click="openModal(app)" />
                <BaseButton label="Reject" size="sm" variant="danger" @click="rejectApplication(app.id)" />
              </div>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <!-- Modal -->
    <BaseModal v-model="showModal" title="Application Details" v-if="selectedApp">
      <div class="modal-body">
        <p><strong>Applicant Name:</strong> {{ selectedApp.name }}</p>
        <p><strong>Position:</strong> {{ selectedApp.position }}</p>
        <p><strong>Status:</strong> {{ selectedApp.status }}</p>
        <p><strong>Uploaded Files:</strong></p>

        <div v-if="selectedApp.files.length">
          <ul class="file-list">
            <li v-for="(file, index) in selectedApp.files" :key="index">
              <a :href="file.url" target="_blank">{{ file.name }}</a>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No files uploaded.</p>
        </div>

        <div class="modal-actions">
          <BaseButton label="Close" size="sm" variant="secondary" @click="showModal = false" />
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'

const applications = ref([
  {
    id: 1,
    name: "Juan Dela Cruz",
    position: "Software Engineer",
    status: "Pending",
    files: [{ name: "Resume.pdf", url: "#" }]
  },
  {
    id: 2,
    name: "Maria Clara",
    position: "HR Specialist",
    status: "Reviewed",
    files: [{ name: "Resume.pdf", url: "#" }]
  }
])

const showModal = ref(false)
const selectedApp = ref(null)

const openModal = (app) => {
  selectedApp.value = app
  showModal.value = true
}

const rejectApplication = (id) => {
  alert(`Rejected application ID: ${id}`)
}
</script>

<style scoped>
.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  color: white;
  text-transform: capitalize;
}
.status-badge.pending {
  background-color: #facc15;
  color: #333;
}
.status-badge.reviewed {
  background-color: #16a34a;
}

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

.modal-body p {
  margin: 8px 0;
}

.file-list {
  list-style: none;
  padding-left: 0;
  margin-top: 5px;
}

.file-list li {
  margin-bottom: 5px;
}

.file-list li a {
  color: #1e3a8a;
  text-decoration: underline;
  font-weight: 500;
}

.modal-actions {
  margin-top: 20px;
  text-align: right;
}
</style>
