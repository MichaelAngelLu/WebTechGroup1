<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="input-group">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
    />
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 7px;
}

.input-group label {
  font-size: 0.9rem;
  color: #10204d;
  margin-bottom: 3px;
}

input {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #1e3a8a;
  outline: none;
}
</style>