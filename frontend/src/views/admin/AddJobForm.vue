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
            label="Location"
            v-model="form.location"
            placeholder="Enter job location"
            required
          />
        </div>
  
        <!-- RIGHT COLUMN -->
        <div class="form-column">
          <BaseInput
            label="Company"
            v-model="form.company"
            placeholder="Enter company name"
            required
          />
          <BaseInput
            label="Description"
            v-model="form.description"
            placeholder="Enter job description"
            required
          />
        </div>
  
        <!-- Full Width Status Selection -->
        <div class="status-select">
          <BaseSelect
            label="Job Status"
            v-model="form.status"
            :options="[
              { label: 'Select Status', value: '' },
              { label: 'Open', value: 'Open' },
              { label: 'Closed', value: 'Closed' }
            ]"
            required
          />
        </div>
  
        <!-- Submit and Cancel -->
        <div class="action-buttons">
          <BaseButton type="submit" label="Post Job" />
          <BaseButton label="Cancel" variant="danger" @click="$emit('close')" />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import BaseInput from '@/components/BaseInput.vue'
  import BaseSelect from '@/components/BaseSelect.vue'
  import BaseButton from '@/components/BaseButton.vue'
  
  const emit = defineEmits(['close', 'submitted'])
  
  const form = ref({
    title: '',
    description: '',
    location: '',
    company: '',
    status: 'Open', // Default status to "Open"
  })
  
  async function handleSubmit() {
    emit('submitted', { ...form.value }) // PASS DATA CORRECTLY!
  }
  </script>
  
  <style scoped>
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
  
  /* Responsive */
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
  