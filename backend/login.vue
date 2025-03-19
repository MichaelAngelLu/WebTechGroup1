<template>
    <div class="login-container">
      <button v-if="!user" @click="signInWithGoogle">Sign in with Google</button>
      <div v-else>
        <h2>Welcome, {{ user.displayName }}!</h2>
        <img :src="user.photoURL" alt="Profile" />
        <button @click="logout">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
  import { auth, provider } from "../firebase"; // Import from firebase.js
  import { signInWithPopup, signOut } from "firebase/auth";
  
  export default {
    data() {
      return {
        user: null
      };
    },
    methods: {
      async signInWithGoogle() {
        try {
          const result = await signInWithPopup(auth, provider);
          this.user = result.user;
          console.log("User logged in:", result.user);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
      async logout() {
        await signOut(auth);
        this.user = null;
        console.log("User signed out");
      }
    }
  };
  </script>
  
  <style>
  .login-container {
    text-align: center;
  }
  button {
    background-color: #4285f4;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #357ae8;
  }
  </style>
  