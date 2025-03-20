<template>
  <div class="admin-page-container">
    <h2>Apply for Job</h2>
    <p>Complete the form to submit your job application.</p>

    <div class="form-container">
      <form @submit.prevent="submitApplication" class="form-grid">

        <!-- LEFT COLUMN -->
        <div class="form-column">
          <BaseInput
            label="Full Name"
            v-model="form.name"
            placeholder="Enter your full name"
            required
          />

          <BaseInput
            label="Phone Number"
            v-model="form.phone"
            type="tel"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <!-- RIGHT COLUMN -->
        <div class="form-column">
          <BaseInput
            label="Email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <BaseSelect
            label="Applying for Position"
            v-model="form.position"
            :options="[
              { label: 'Select a Position', value: '' },
              { label: 'Software Developer', value: 'Software Developer' },
              { label: 'UI/UX Designer', value: 'UI/UX Designer' },
              { label: 'Project Manager', value: 'Project Manager' }
            ]"
            required
          />
        </div>

        <!-- Uploads Side by Side -->
        <div class="upload-grid">
          <div class="custom-field">
            <label>Upload Resume (PDF/DOCX)</label>
            <input type="file" @change="handleFileUpload" />
          </div>

          <div class="custom-field">
            <label>Upload Other Documents</label>
            <input type="file" @change="handleFileUploadOtherDocs" />
          </div>
        </div>

        <!-- Cover Letter full-width -->
        <div class="cover-letter-full">
          <BaseTextarea
            label="Cover Letter"
            v-model="form.coverLetter"
            placeholder="Write your cover letter"
          />
        </div>

        <!-- Submit Button -->
        <div class="action-buttons">
          <BaseButton label="Submit Application" type="submit" block />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseTextarea from '@/components/BaseTextarea.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  resume: null,
  otherDocs: null,
  coverLetter: '',
  position: ''
})

const route = useRoute()

onMounted(() => {
  const jobId = route.query.jobId
  if (jobId) {
    if (jobId === '1') form.value.position = 'Software Developer'
    if (jobId === '2') form.value.position = 'HR Specialist'
  }
})

function handleFileUpload(event) {
  form.value.resume = event.target.files[0]
}

function handleFileUploadOtherDocs(event) {
  form.value.otherDocs = event.target.files[0]
}

function submitApplication() {
  alert('Application submitted successfully!')
}
</script>

<style scoped>
.form-container {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload-grid {
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.cover-letter-full {
  grid-column: span 2;
}

.custom-field {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.custom-field label {
  font-weight: 600;
  margin-bottom: 5px;
  text-align: left;
  
}

.custom-field input[type="file"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.action-buttons {
  grid-column: span 2;
  margin-top: 20px;
}

/* ✅ Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .upload-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .cover-letter-full {
    grid-column: span 1;
  }

  .action-buttons {
    grid-column: span 1;
  }
}
</style>
