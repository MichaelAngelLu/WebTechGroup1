<template>
    <div class="input-group">
      <label v-if="label">{{ label }}</label>
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    modelValue: String,
  });
  </script>
  
  <style scoped>
  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
  .input-group label {
    margin-bottom: 4px;
    font-weight: 600;
    color: #1e3a8a;
  }
  .input-group input {
    padding: 10px;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    font-size: 1rem;
  }
  .input-group input:focus {
    outline: none;
    border-color: #1e3a8a;
  }
  </style>
  