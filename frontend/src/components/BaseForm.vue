<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const formData = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function handleSubmit(e) {
  e.preventDefault()
  emit('submit', formData.value)
}
</script>


<template>
  <form @submit="handleSubmit" class="base-form">
    <!-- Flexible slot for injecting fields -->
    <slot :formData="formData"></slot>

  <!-- fallback button -->
  <template v-if="$slots.default === undefined">
    <button type="submit">Submit</button>
  </template>

  </form>
</template>

<style scoped>
.base-form {
  display: flex;
  flex-direction: column;
  gap: .2rem;
  background: #ffffff;
  padding: 30px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.submit-btn {
  background-color: #1e3a8a;
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #10204d;
}
</style>
