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
const emit = defineEmits(['close', 'updated'])

const form = ref({
  title: '',
  location: '',
  company: '',
  description: '', 
  status: ''
})


// Pre-fill form when job prop changes
watchEffect(() => {
  if (props.job) {
    form.value = {
    title: props.job.title || '',
    location: props.job.location || '',
    company: props.job.company || '',
    description: props.job.description || '', // <-- add this
    status: props.job.status || ''
  }

  }
})

const handleSubmit = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('Unauthorized: Token missing')
    return
  }

  try {
    const response = await fetch(`http://localhost:3000/api/jobs/${props.job._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      emit('updated', { ...form.value, _id: props.job._id }) // Let parent know about the update
      emit('close')
    } else {
      const error = await response.json()
      console.error('Failed to update job:', error.message)
      alert(error.message || 'Error updating job')
    }
  } catch (err) {
    console.error('Error updating job:', err)
    alert('Error updating job')
  }
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
