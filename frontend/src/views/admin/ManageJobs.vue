<script setup>
import { ref } from 'vue'

const jobListings = ref([
  { id: 1, title: "Software Engineer", location: "Manila", status: "Active" },
  { id: 2, title: "HR Specialist", location: "Cebu", status: "Closed" },
])

const showModal = ref(false)
const newJob = ref({ title: '', location: '', description: '' })

const closeModal = () => {
  showModal.value = false
  newJob.value = { title: '', location: '', description: '' }
}

const submitJob = () => {
  if (newJob.value.title && newJob.value.location) {
    jobListings.value.push({
      id: jobListings.value.length + 1,
      title: newJob.value.title,
      location: newJob.value.location,
      description: newJob.value.description || 'No description provided',
      status: 'Active',
    })
    closeModal()
  } else {
    alert('Please fill in all required fields!')
  }
}

const deleteJob = (id) => {
  jobListings.value = jobListings.value.filter((job) => job.id !== id)
}

const editJob = (id) => {
  alert(`Edit job functionality for job ID: ${id}`)
}
</script>

<template>
  <div class="job-listings">
    <h2>Job Listings</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Location</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobListings" :key="job.id">
          <td>{{ job.id }}</td>
          <td>{{ job.title }}</td>
          <td>{{ job.location }}</td>
          <td>{{ job.status }}</td>
          <td>
            <button @click="editJob(job.id)">Edit</button>
            <button @click="deleteJob(job.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="custom-button" @click="showModal = true">Add New Job</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>Add New Job</h2>
        <form @submit.prevent="submitJob">
          <input type="text" class="custom-input" v-model="newJob.title" placeholder="Job Title" required />
          <input type="text" class="custom-input" v-model="newJob.location" placeholder="Location" required />
          <div class="modal-buttons">
            <button class="custom-button" type="submit">Submit</button>
            <button class="custom-button" type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
