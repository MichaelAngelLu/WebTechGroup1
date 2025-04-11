<template>
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="form-grid">
        <!-- LEFT COLUMN -->
        <div class="form-column">
          <BaseInput
            label="Job Title"
            v-model="form.title"
            placeholder="Enter job title"
            required
          />
          <BaseInput
            label="Company"
            v-model="form.company"
            placeholder="Enter company name"
            required
          />
          <BaseInput
            label="Location"
            v-model="form.location"
            placeholder="Enter job location"
            required
          />
        </div>
  
        <!-- RIGHT COLUMN -->
        <div class="form-column">
          <BaseInput
            label="Description"
            v-model="form.description"
            placeholder="Enter job description"
            required
          />
          <BaseSelect
            label="Status"
            v-model="form.status"
            :options="[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' }
            ]"
            required
          />
        </div>
  
        <!-- Submit and Cancel -->
        <div class="action-buttons">
          <BaseButton type="submit" :label="isEditMode ? 'Update Job' : 'Add Job'" />
          <BaseButton label="Cancel" variant="danger" @click="cancel" />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  import BaseInput from '@/components/BaseInput.vue'
  import BaseSelect from '@/components/BaseSelect.vue'
  import BaseButton from '@/components/BaseButton.vue'
  
  const props = defineProps({
    job: Object,       // existing job if editing
    close: Function,   // callback to close modal/form
    refresh: Function  // callback to refresh job list after submit
  })
  
  const form = ref({
    title: '',
    company: '',
    location: '',
    description: '',
    status: 'active'
  })
  
  const isEditMode = ref(false)
  
  watchEffect(() => {
    if (props.job) {
      isEditMode.value = true
      form.value = {
        title: props.job.title || '',
        company: props.job.company || '',
        location: props.job.location || '',
        description: props.job.description || '',
        status: props.job.status || 'active'
      }
    }
  })
  
  const handleSubmit = async () => {
    const url = isEditMode.value
      ? `http://localhost:3000/api/jobs/${props.job._id}`
      : `http://localhost:3000/api/jobs`
  
    const method = isEditMode.value ? 'PUT' : 'POST'
  
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
  
      if (!response.ok) throw new Error('Failed to submit job')
  
      await props.refresh()
      props.close()
    } catch (error) {
      console.error('Error submitting job:', error)
    }
  }
  
  const cancel = () => {
    props.close()
  }
  </script>
  
  <style scoped>
  .form-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .form-column {
    flex: 1 1 300px;
  }
  .action-buttons {
    margin-top: 1rem;
    display: flex;
    gap: 10px;
  }
  </style>
  