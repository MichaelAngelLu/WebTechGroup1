<template>
  <div>
    <main class="page-container">
      <h1>Create Account</h1>
      <p>Sign up to manage your Applications and Profile</p>
    </main>
  </div>

  <div class="login-card">
    <BaseForm v-model="form" @submit="handleSubmit">
      <template #default="{ formData }">

        <BaseInput 
          v-model="formData.firstName" 
          label="First Name" 
          placeholder="Enter your first name" 
        />

        <BaseInput 
          v-model="formData.lastName" 
          label="Last Name" 
          placeholder="Enter your last name" 
        />

        <BaseInput 
          v-model="formData.email" 
          label="Email" 
          placeholder="Enter your email" 
        />

        <BaseInput 
          v-model="formData.password" 
          label="Password" 
          type="password" 
          placeholder="Create a password" 
        />

        <BaseInput 
          v-model="formData.confirmPassword" 
          label="Confirm Password" 
          type="password" 
          placeholder="Re-enter your password" 
        />

        <BaseButton type="submit" label="Create Account" block />

        <div class="divider">OR</div>

        <button class="google-btn" @click="signInWithGoogle">
          <img src="@/assets/google-icon.svg" alt="Google" />
          Sign up with Google
        </button>

      </template>
    </BaseForm>

    <!-- Already have account -->
    <div class="create-account">
      <span>Already have an account?</span>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseForm from '@/components/BaseForm.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const form = ref({ 
  firstName: '', 
  lastName: '', 
  email: '', 
  password: '', 
  confirmPassword: '' 
})

function handleSubmit(data) {
  console.log('Account created', data)
}

function signInWithGoogle() {
  alert('Redirect to Google OAuth...')
}
</script>

<style scoped>
.page-container {
  margin-top: 100px;
  text-align: center;
}

.login-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  background: #fff;
}

.divider {
  margin: 10px 0;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}

.google-btn {
  width: 100%;
  padding: 10px;
  background: white;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.google-btn:hover {
  background: #f7f7f7;
}

.google-btn img {
  width: 20px;
  height: 20px;
}

.create-account {
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: center;
}

.create-account a, .create-account router-link {
  margin-left: 5px;
  color: #1e3a8a;
  text-decoration: none;
}
</style>
