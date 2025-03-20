<template>
    <div class="form-container">
      <form @submit.prevent="handleUpdate" class="form-grid">
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
          <BaseSelect
            label="Role"
            v-model="form.role"
            :options="[
              { label: 'Admin', value: 'admin' },
              { label: 'Staff', value: 'staff' }
            ]"
            required
          />
        </div>
  
        <!-- Submit and Cancel -->
        <div class="action-buttons">
          <BaseButton type="submit" label="Update User" />
          <BaseButton label="Cancel" variant="danger" @click="$emit('close')" />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import BaseInput from '@/components/BaseInput.vue'
  import BaseSelect from '@/components/BaseSelect.vue'
  import BaseButton from '@/components/BaseButton.vue'
  
  const props = defineProps({
    user: Object // pre-filled user data from parent
  })
  const emit = defineEmits(['updated', 'close'])
  
  const form = ref({
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: ''
})

// Pre-fill form
watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value = { ...newUser }
  }
}, { immediate: true })

  
  async function handleUpdate() {
    emit('updated', { ...form.value })
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
    .action-buttons {
      grid-column: span 1;
    }
  }
  </style>
  