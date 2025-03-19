<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Click Me'
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary' // you can switch between 'primary', 'secondary', etc.
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button :type="type" :class="['base-button', variant]" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<style scoped>
.base-button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Primary button */
.primary {
  background-color: #1e3a8a;
  color: white;
}

.primary:hover {
  background-color: #10204d;
}

</style>
