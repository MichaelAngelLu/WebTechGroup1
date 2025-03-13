<template>
    <footer class="footer">
      <p>© 2025 JuanJobsPH | No. 1 Recruitment Agency Platform</p>
    </footer>
  </template>
  
  <style scoped>
  /* Footer Styling */
  .footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%); /* Centers it horizontally */
    width: 100%;
    background-color: transparent;
    color: white;
    text-align: center;
    padding: 15px 0;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
  }
  
  /* Responsive Footer */
  @media (max-width: 768px) {
    .footer {
      font-size: 12px;
      padding: 10px 0;
    }
  }
  </style>
  