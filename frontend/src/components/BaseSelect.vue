<template>
    <div class="select-group">
      <label v-if="label">{{ label }}</label>
      <select
        v-model="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option value="" disabled>Select an option</option>
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    options: Array,
    modelValue: String,
  });
  </script>
  
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
  