<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="modal-title">{{ title }}</h3>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease;
}

.modal-title {
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #1e3a8a;
  text-align: center;
}

.modal-body p,
.modal-body ul {
  margin-bottom: 12px;
  color: #333;
  font-size: 0.95rem;
}

.modal-body ul {
  list-style: none;
  padding: 0;
}

.modal-body ul li a {
  color: #1e3a8a;
  text-decoration: underline;
  transition: color 0.2s;
}

.modal-body ul li a:hover {
  color: #10204d;
}

.modal-body .modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@keyframes fadeIn {
  from { opacity: 0; } 
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
