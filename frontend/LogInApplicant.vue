<template>
  <div>
    <ErrorAlert v-if="showErrorAlert" message="Invalid credentials" />
    <!-- Your login form here -->
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import ErrorAlert from './ErrorAlert'; // Ensure the correct path

export default {
  name: "LoginPage",
  components: {
    ErrorAlert
  },
  data() {
    return {
      username: '',
      password: '',
      showErrorAlert: false // flag to control error alert visibility
    };
  },
  methods: {
    login() {
      if (this.username === "admin" && this.password === "password") {
        localStorage.setItem("userToken", "authenticated");
        this.$router.push("/");
      } else {
        this.showErrorAlert = true; // trigger the error alert
      }
    }
  }
};
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9fafb;
    color: #242323;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .content {
    margin-left: 270px;
    padding: 40px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-container {
    width: 100%;
    max-width: 400px;
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
    text-align: center;
  }
  
  h1 {
    color: #1f2937;
    font-weight: 700;
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .input-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #242323;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
  }
  
  .login-btn {
    width: 100%;
    padding: 14px;
    background: #10204d;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  
  .login-btn:hover {
    background: #1e3a8a;
  }
  </style>
