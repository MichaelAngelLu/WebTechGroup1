<template>
  <div>
    <main class="page-container">
      <h1>Login</h1>
      <p>Login to manage your Applications and Profile</p>
    </main>
  </div>

  <div class="login-card">
    <BaseForm v-model="form" @submit="handleSubmit">
      <template #default="{ formData }">
        <BaseInput 
          v-model="formData.email" 
          label="Email" 
          placeholder="Enter your email" 
        />

        <BaseInput 
          v-model="formData.password" 
          label="Password" 
          type="password" 
          placeholder="Enter your password" 
        />

        <BaseButton type="submit" label="Login" block />

        <div class="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>

        <div class="divider">OR</div>

        <!-- Google login button -->
        <a class="google-btn" href="http://localhost:3000/api/auth/google">
          <img src="@/assets/google-icon.svg" alt="Google" />
          Sign in with Google
        </a>
      </template>
    </BaseForm>

    <!-- Create Account -->
    <div class="create-account">
      <span>Don't have an account?</span>
      <router-link to="/register">Create one</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseForm from '@/components/BaseForm.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const form = ref({ email: '', password: '' })

const showSuccess = ref(false);

async function handleSubmit(data) {
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    });

    const result = await res.json();

    if (res.ok) {
      // Store the token and role in localStorage for future requests
      localStorage.setItem('token', result.token);  // Assuming token is in result.token
      localStorage.setItem('role', result.user.role); // Store the role

      console.log('Logged in role:', localStorage.getItem('role'));

      // Check if user object exists in the response and has the role
      if (result.user && result.user.role) {
        showSuccess.value = true;
        
        // Route based on the user's role
        setTimeout(() => {
      if (result.user.role === 'admin' || result.user.role === 'staff') {
        router.push('/admin');  // Both admin and staff users route to the admin page
      } else {
        router.push('/applicant');  // Default route for other roles (e.g., applicant)
      }
    }, 1500);
      } else {
        alert('❌ Role not found or user data is incomplete.');
      }
    } else {
      alert(result.message || '❌ Login failed, please try again.');
    }
  } catch (err) {
    console.error('Fetch failed:', err);
    alert('❌ Login failed due to a network error.');
  }
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

.forgot-password {
  margin-top: 0;
  text-align: right;
}

.forgot-password a {
  font-size: 0.9rem;
  color: #1e3a8a;
  text-decoration: none;
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
