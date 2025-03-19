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
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['xs', 'sm', 'md', 'lg'].includes(val)
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button :type="type" :class="['base-button', variant, size]" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<style scoped>
.base-button {
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 5px;
  display: inline-flex;
  justify-content: center;
  min-width: 80px;
}

/* Sizes */
.xs { padding: 4px 8px; font-size: 0.75rem; min-width: auto;}
.sm { padding: 6px 12px; font-size: 0.85rem; }
.md { padding: 10px 20px; font-size: 1rem; }
.lg { padding: 14px 28px; font-size: 1.15rem; }

/* Variants */
.primary {
  background-color: #1e3a8a;
  color: white;
}
.primary:hover {
  background-color: #10204d;
}

.secondary {
  background-color: #64748b;
  color: white;
}
.secondary:hover {
  background-color: #475569;
}

.success {
  background-color: #16a34a;
  color: white;
}
.success:hover {
  background-color: #15803d;
}

.danger {
  background-color: #dc2626;
  color: white;
}
.danger:hover {
  background-color: #b91c1c;
}

.warning {
  background-color: #f59e0b;
  color: white;
}
.warning:hover {
  background-color: #d97706;
}
</style>
