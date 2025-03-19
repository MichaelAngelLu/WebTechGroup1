<script setup>
const props = defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  type: {
    type: String,
    default: 'text',
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
    />
  </div>
</template>
