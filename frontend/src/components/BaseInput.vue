<template>
  <div class="base-input">
    <label v-if="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  modelValue: String
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
}

.base-input label {
  font-weight: 600;
  margin-bottom: 6px;
  text-align: left;
}

.base-input input {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  min-height: 42px;
  box-sizing: border-box;
}
</style>
