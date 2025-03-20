<template>
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="form-grid">
        <!-- LEFT COLUMN -->
        <div class="form-column">
          <BaseInput
            label="First Name"
            v-model="form.firstName"
            placeholder="Enter first name"
            required
          />
          <BaseInput
            label="Last Name"
            v-model="form.lastName"
            placeholder="Enter last name"
            required
          />
        </div>
  
        <!-- RIGHT COLUMN -->
        <div class="form-column">
          <BaseInput
            label="Email"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          />
          <BaseInput
            label="Password"
            v-model="form.password"
            type="password"
            placeholder="Create a password"
            required
          />
        </div>
  
        <!-- Full Width Role Selection -->
        <div class="role-select">
          <BaseSelect
            label="Role"
            v-model="form.role"
            :options="[
              { label: 'Select Role', value: '' },
              { label: 'Admin', value: 'admin' },
              { label: 'Staff', value: 'staff' }
            ]"
            required
          />
        </div>
  
        <!-- Submit and Cancel -->
        <div class="action-buttons">
          <BaseButton type="submit" label="Add User" />
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
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
  
  .role-select {
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
  
    .role-select,
    .action-buttons {
      grid-column: span 1;
    }
  }
  </style>
  