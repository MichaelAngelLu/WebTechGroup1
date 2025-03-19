<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

// Computed proxy for the form data
const formData = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// Emit submit event
function handleSubmit(e) {
  e.preventDefault()
  emit('submit', formData.value)
}
</script>

<template>
  <form @submit="handleSubmit">
    <!-- Example slot to allow flexible input fields -->
    <slot :formData="formData"></slot>

    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
button {
  background-color: #1e3a8a;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #10204d;
}
</style>
