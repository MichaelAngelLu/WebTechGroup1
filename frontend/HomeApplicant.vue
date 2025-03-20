<template>
    <main class="home-container">
      <h1 class="home-title">Welcome to JuanJobsPH</h1>
      <p class="home-description">Find and apply for jobs that match your skills.</p>
      <div class="button-container">
        <button class="dashboard-btn">Browse Jobs</button>
        <button class="dashboard-btn">Apply Now</button>
        <button class="dashboard-btn">Log In</button>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    name: "Home",
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  
  .home-container {
    width: 60%;
    margin: auto;
    background: white;
    padding: 50px;
    border-radius: 16px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
    text-align: center;
  }
  
  .home-title {
    color: #1f2937;
    font-weight: 700;
    margin-bottom: 15px;
    font-size: 28px;
  }
  
  .home-description {
    color: #4b5563;
    font-size: 18px;
    margin-bottom: 30px;
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
  
