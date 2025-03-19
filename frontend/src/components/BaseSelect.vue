<script setup>
const props = defineProps({
  modelValue: String,
  options: {
    type: Array,
    required: true
  },
  label: String,
})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <div class="select-group">
    <label v-if="label">{{ label }}</label>
    <select v-model="selected">
      <option disabled value="">Select an option</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<style scoped>
.select-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-weight: 600;
  color: #1e3a8a;
}

select {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

select:focus {
  border-color: #1e3a8a;
  outline: none;
}
</style>
