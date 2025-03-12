<template>
    <div class="search-container">
      <input type="text" placeholder="Search for jobs..." />
      <button>Search</button>
    </div>
  </template>
  
  <style scoped>
  /* Job Search Bar */
  .search-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .search-container input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 60%;
  }
  
  .search-container button {
    background-color: #1e3a8a;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .search-container button:hover {
    background: #10204d;
  }
  </style>
  