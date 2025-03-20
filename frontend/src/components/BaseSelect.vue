<script setup>
import { computed } from 'vue'

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
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-group {
  display: flex;
  flex-direction: column;
}

.select-group label {
  font-weight: 600;
  margin-bottom: 5px;
  text-align: left;
}

.select-group select {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  min-height: 42px;
  box-sizing: border-box;
  appearance: none;
  background: white;
}
</style>
