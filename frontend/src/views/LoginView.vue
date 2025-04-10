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
        <button class="google-btn" @click="signInWithGoogle">
          <img src="@/assets/google-icon.svg" alt="Google" />
          Sign in with Google
        </button>
        

      </template>
    </BaseForm>

    <!-- Create Account -->
    <div class="create-account">
      <span>Don't have an account?</span>
      <router-link to="/register">Create one</router-link> <!-- integrated route -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseForm from '@/components/BaseForm.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { auth, provider } from '@/firebase';
import { signInWithPopup } from "firebase/auth"; 

const router = useRouter()
const form = ref({ email: '', password: '' })


const showSuccess = ref(false);
async function handleSubmit(data) {
  try {
    const res = await fetch('http://juanjobsph.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    });

    const result = await res.json();

    if (res.ok) {
      showSuccess.value = true;  // Use showSuccess here
      setTimeout(() => {
        if (result.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/applicant');
        }
      }, 1500);
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error('Fetch failed:', err);
    alert('❌ Login failed.');
  }
}


async function signInWithGoogle() {
  try {
    // Trigger the Google sign-in popup
    const result = await signInWithPopup(auth, provider); // Google sign-in
    const user = result.user;
    
    // Get the Firebase ID token
    const idToken = await user.getIdToken();
    console.log('Google login success, ID Token:', idToken);

    // Send the ID token to your backend for validation
    const res = await fetch('http://localhost:3000/api/auth/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenId: idToken }),  // Send token to backend
    });

    const data = await res.json();

    if (res.ok && data.token) {
      // Store the JWT token received from backend in localStorage (or Vuex, if needed)
      localStorage.setItem('authToken', data.token);

      // Redirect the user based on their role
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/applicant');
      }
    } else {
      alert('Google login failed');
    }
  } catch (error) {
    console.error('Google login error:', error);
    alert('❌ Google login failed.');
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
