<template>
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="form-grid">
        <div class="form-column">
          <BaseInput label="Job Title" v-model="form.title" required />
          <BaseInput label="Location" v-model="form.location" required />
        </div>
  
        <div class="form-column">
          <BaseInput label="Company Name" v-model="form.company" required />
        </div>
  
        <div class="status-select">
          <BaseSelect
            label="Status"
            v-model="form.status"
            :options="[
              { label: 'Open', value: 'open' },
              { label: 'Closed', value: 'closed' }
            ]"
            required
          />
        </div>
  
        <div class="action-buttons">
          <BaseButton type="submit" label="Update Job" />
          <BaseButton label="Cancel" variant="danger" @click="$emit('close')" />
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
    job: Object
  })
  const emit = defineEmits(['close', 'refresh'])
  
  const form = ref({
    title: '',
    location: '',
    company: '',
    status: ''
  })
  
  watchEffect(() => {
    if (props.job) {
      form.value = {
        title: props.job.title || '',
        location: props.job.location || '',
        company: props.job.company || '',
        status: props.job.status || ''
      }
    }
  })
  
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/jobs/${props.job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
      })
  
      if (response.ok) {
        emit('refresh')
        emit('close')
      } else {
        console.error('Failed to update job')
      }
    } catch (err) {
      console.error('Error updating job:', err)
    }
  }
  </script>
  
  <style scoped>
  /* Same style as AddJobForm */
  .form-container {
    padding: 20px;
  }
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .form-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .status-select {
    grid-column: span 2;
  }
  .action-buttons {
    grid-column: span 2;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    .status-select,
    .action-buttons {
      grid-column: span 1;
    }
  }
  </style>
  