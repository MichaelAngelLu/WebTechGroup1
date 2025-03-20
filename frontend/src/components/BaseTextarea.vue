<!-- src/components/BaseTextarea.vue -->
<template>
  <div class="base-textarea">
    <label v-if="label">{{ label }}</label>
    <textarea
      :placeholder="placeholder"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-textarea {
  display: flex;
  flex-direction: column;
}

.base-textarea label {
  font-weight: 600;
  margin-bottom: 6px;
  text-align: left;
}

.base-textarea textarea {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;
  resize: vertical;
}
</style>
