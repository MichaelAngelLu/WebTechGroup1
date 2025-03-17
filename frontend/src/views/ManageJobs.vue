<script setup>
import { ref } from 'vue';

// Example data for job listings
const jobListings = ref([
  { id: 1, title: "Software Engineer", location: "Manila", status: "Active" },
  { id: 2, title: "HR Specialist", location: "Cebu", status: "Closed" },
]);

// Reactive variables for the modal
const showModal = ref(false); // Controls the visibility of the modal
const newJob = ref({ title: '', location: '', description: '' }); // Form data for new job

// Function to close the modal
const closeModal = () => {
  showModal.value = false; // Close the modal
  newJob.value = { title: '', location: '', description: '' }; // Clear the form data
};

// Function to add a new job to the job listings
const submitJob = () => {
  if (newJob.value.title && newJob.value.location) {
    jobListings.value.push({
      id: jobListings.value.length + 1,
      title: newJob.value.title,
      location: newJob.value.location,
      description: newJob.value.description || 'No description provided',
      status: 'Active',
    });
    alert(`Job "${newJob.value.title}" added successfully!`);
    closeModal();
  } else {
    alert('Please fill in all required fields!');
  }
};

// Function to delete a job from the job listings
const deleteJob = (id) => {
  jobListings.value = jobListings.value.filter((job) => job.id !== id);
};

// Function to edit a job (stub for future implementation)
const editJob = (id) => {
  alert(`Edit job functionality for job ID: ${id} (to be implemented).`);
};
</script>

<style scoped>
  .search-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .search-container input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 60%;
  }
  
  .search-container button {
    background-color: #1e3a8a;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .search-container button:hover {
    background: #10204d;
  }
  </style>

<template>
  <div class="dashboard-container">
    <!-- Header Section with Logo and Text -->
    <div class="dashboard-header">
      <img src="@/assets/logo.svg" alt="JuanJobsPH Logo" class="dashboard-logo" />
      <div>
        <h1>Manage Jobs</h1>
        <p>Manage job listings, applications, and users.</p>
      </div>
    </div>

    <!-- Admin Menu -->
    <div class="admin-menu">
      <RouterLink to="/admin/jobs">Manage Jobs</RouterLink>
      <RouterLink to="/admin/applications">Applications</RouterLink>
      <RouterLink to="/admin/users">Manage Users</RouterLink>
      <RouterLink to="/admin/settings">Settings</RouterLink>
    </div>

    <!-- Job Listings Section -->
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
    </div>

    <div>
    <!-- Button to Open Modal -->
    <button  class="custom-button" @click="showModal = true">Add New Job</button>

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

  </div>
</template>
