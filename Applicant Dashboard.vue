<template>
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <h2>
          <img src="/assets/logo.png" alt="JuanJobsPH Logo" class="logo">
        </h2>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/job-listings">Job Listings</router-link></li>
          <li><router-link to="/job-application">Job Application</router-link></li>
          <li><router-link to="/application-status">Application Status</router-link></li>
          <li><router-link to="/login">Log out</router-link></li>
        </ul>
      </aside>
  
      <!-- Main Content -->
      <div class="content">
        <main>
          <h1>Applicant Dashboard</h1>
          <div class="button-container">
            <router-link to="/job-listings" class="dashboard-btn">View Job Listings</router-link>
            <router-link to="/job-application" class="dashboard-btn">Apply for a Job</router-link>
            <router-link to="/application-status" class="dashboard-btn">Check Application Status</router-link>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ApplicantDashboard"
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
  }
  
  .sidebar {
    width: 250px;
    height: 100vh;
    background: #f8f8f8;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.2);
  }
  
  .logo {
    width: 220px;
    display: block;
    margin: 0 auto;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar ul li {
    margin: 15px 0;
  }
  
  .sidebar ul li a {
    color: rgb(20, 24, 66);
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    display: block;
    padding: 10px;
    border-radius: 8px;
    transition: background 0.3s;
  }
  
  .sidebar ul li a:hover {
    background: #a9a8b9;
    color: #111827;
  }
  
  .content {
    margin-left: 270px;
    padding: 40px;
    flex-grow: 1;
  }
  
  main {
    width: 60%;
    margin: auto;
    background: white;
    padding: 50px;
    border-radius: 16px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
  }
  
  h1 {
    text-align: center;
    color: #1f2937;
    font-weight: 700;
    margin-bottom: 30px;
    font-size: 28px;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .dashboard-btn {
    width: 100%;
    max-width: 300px;
    padding: 14px 20px;
    background: #10204d;
    color: white;
    text-align: center;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    text-decoration: none;
    display: block;
  }
  
  .dashboard-btn:hover {
    background: #1e3a8a;
  }
  </style>
  