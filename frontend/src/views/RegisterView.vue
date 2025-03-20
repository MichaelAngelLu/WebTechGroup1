<template>
  <div>
    <main class="page-container">
      <h1>Create Account</h1>
      <p>Sign up to manage your Applications and Profile</p>
    </main>
  </div>

  <div class="login-card">
    <BaseForm v-model="form" @submit="handleSubmit">
      <template #default>
        <BaseInput v-model="form.firstName" label="First Name" placeholder="Enter your first name" />
        <BaseInput v-model="form.lastName" label="Last Name" placeholder="Enter your last name" />
        <BaseInput v-model="form.email" label="Email" placeholder="Enter your email" />
        <BaseInput v-model="form.password" label="Password" type="password" placeholder="Create a password" />
        <BaseInput v-model="form.confirmPassword" label="Confirm Password" type="password" placeholder="Re-enter your password" />
        <BaseButton :disabled="loading" type="submit" label="Create Account" block />
      </template>
    </BaseForm>

    <!-- Error Message -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Modal Success -->
    <div v-if="showSuccess" class="modal">
      <div class="modal-content">
        <h3>🎉 Account created successfully!</h3>
        <p>You can now log in to your account.</p>
        <BaseButton label="Go to Login" @click="goToLogin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiRequest } from '@/utils/api'
import BaseForm from '@/components/BaseForm.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  if (loading.value) return;
  loading.value = true;

  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = '❌ Passwords do not match!';
    loading.value = false;
    return;
  }

  const { ok, data } = await apiRequest('applicants/register', 'POST', {
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    password: form.value.password
  });

  if (ok) {
    showSuccess.value = true;
    errorMessage.value = '';
  } else {
    errorMessage.value = data.message;
  }

  loading.value = false;
}

function goToLogin() {
  showSuccess.value = false;
  router.push('/login');
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}
</style>
