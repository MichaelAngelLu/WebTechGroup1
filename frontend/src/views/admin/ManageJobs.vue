<template>
  <div class="admin-page-container">
    <div class="header-container">
      <h2>Manage Jobs</h2>
      <p>Manage Job Listings.</p>
    </div>

    <div class="add-job-container">
      <BaseButton label="Add Job" variant="primary" @click="showAddForm = true" />
    </div>

    <BaseTable :headers="['Title', 'Company', 'Location', 'Status', 'Actions']">
      <template #default>
        <tr v-for="job in jobListings" :key="job._id">
          <td>{{ job.title }}</td>
          <td>{{ job.company }}</td>
          <td>{{ job.location }}</td>
          <td>{{ job.status }}</td>
          <td>
            <div class="action-buttons">
              <BaseButton label="Edit" size="sm" variant="primary" @click="editJob(job)" />
              <BaseButton label="Delete" size="sm" variant="danger" @click="deleteJob(job._id)" />
            </div>
          </td>
        </tr>
      </template>
    </BaseTable>

    <!-- Add Job Modal -->
    <div v-if="showAddForm" class="modal">
      <div class="modal-content">
        <AddJobForm @submitted="handleJobSubmit" @close="showAddForm = false" />
      </div>
    </div>

    <!-- Edit Job Modal -->
    <div v-if="showEditForm" class="modal">
      <div class="modal-content">
        <EditJobForm v-if="selectedJob" :job="selectedJob" @updated="handleEditSubmit" @close="closeEditForm" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import AddJobForm from './AddJobForm.vue'
import EditJobForm from './EditJobForm.vue'

const jobListings = ref([]) 
const showAddForm = ref(false) 
const showEditForm = ref(false) 
const selectedJob = ref(null)
const token = localStorage.getItem('token');

const authHeader = token ? { Authorization: `Bearer ${token}` } : {}

// Fetch all jobs with token included in the headers
const fetchJobs = async () => {
  const res = await fetch('http://localhost:3000/api/jobs/', {
    headers: {
        'Content-Type': 'application/json',
        ...authHeader, // Include token in the request headers
    }
  })
  jobListings.value = await res.json()
}

// Add job handler
const handleJobSubmit = async (formData) => {
  const res = await fetch('http://localhost:3000/api/jobs/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        ...authHeader, // Include token in the request headers
    },
    body: JSON.stringify(formData)
  })
  if (res.ok) {
    await fetchJobs()
    showAddForm.value = false
    alert('✅ Job added successfully!')
  } else {
    const error = await res.json()
    alert(error.message || 'Error adding job')
  }
}

// Edit job handler
const handleEditSubmit = async (formData) => {
  const res = await fetch(`http://localhost:3000/api/jobs/${formData._id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        ...authHeader, // Include token in the request headers
    },
    body: JSON.stringify(formData)
  })
  if (res.ok) {
    await fetchJobs()
    showEditForm.value = false
    selectedJob.value = null
    alert('✅ Job updated successfully!')
  } else {
    const error = await res.json()
    alert(error.message || 'Error updating job')
  }
}

// Open edit modal
const editJob = (job) => {
  selectedJob.value = job
  showEditForm.value = true
}

const closeEditForm = () => {
  showEditForm.value = false
  selectedJob.value = null
}

// Delete job handler with token in headers
const deleteJob = async (id) => {
  if (!confirm('Are you sure you want to delete this job?')) return
  const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        ...authHeader, // Include token in the request headers
    }
  })
  if (res.ok) {
    await fetchJobs()
    alert('✅ Job deleted successfully!')
  } else {
    const error = await res.json()
    alert(error.message || 'Error deleting job')
  }
}

onMounted(() => fetchJobs())
</script>

<style scoped>
.header-container {
  text-align: center;
  margin-bottom: 0.5rem;
}

.add-job-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 600px;
  max-width: 90%;
}
</style>
