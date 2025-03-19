<script setup>
const props = defineProps({
  modelValue: String, // or Array depending on your use case
  label: String,
  options: {
    type: Array,
    default: () => [],
  }
})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="selected">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

  
  <style scoped>
  .select-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
  .select-group label {
    margin-bottom: 4px;
    font-weight: 600;
    color: #1e3a8a;
  }
  .select-group select {
    padding: 10px;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    font-size: 1rem;
  }
  .select-group select:focus {
    outline: none;
    border-color: #1e3a8a;
  }
  </style>
  