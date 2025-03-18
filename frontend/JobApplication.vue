<template>
  <div class="layout">
    <header class="header">
      <img src="logo.png" alt="JuanJobsPH Logo" class="logo" />
      <h1>Job Application</h1>
    </header>

    <!-- Sidebar Menu -->
    <nav class="sidebar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/job-listings">Job Listings</router-link></li>
        <li><router-link to="/job-details">Job Details</router-link></li>
        <li><router-link to="/admin-dashboard">Admin Dashboard</router-link></li>
        <li>
          <router-link to="/job-application">Job Application</router-link>
          <ul class="sub-menu">
            <li><router-link to="/application-status">Application Status</router-link></li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="content">
      <form @submit.prevent="submitApplication">
        <label for="name">Full Name:</label>
        <input type="text" id="name" v-model="form.name" required />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />

        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" v-model="form.phone" required />

        <label for="resume">Upload Resume (PDF/DOCX):</label>
        <input type="file" id="resume" @change="handleFileUpload" />

        <label for="coverLetter">Cover Letter:</label>
        <textarea id="coverLetter" v-model="form.coverLetter"></textarea>

        <label for="position">Applying for Position:</label>
        <select id="position" v-model="form.position">
          <option value="">Select a Position</option>
          <option value="Software Developer">Software Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Project Manager">Project Manager</option>
        </select>

        <button type="submit" class="submit-btn">Submit Application</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
        position: ''
      }
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.resume = event.target.files[0];
    },
    submitApplication() {
      alert('Application submitted successfully!');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.logo {
  width: 150px;
}

.sidebar {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
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
  width: 60%;
  margin: 20px auto;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
}

label {
  display: block;
  margin-top: 10px;
  font-weight: 600;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.submit-btn {
  margin-top: 20px;
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
  width: 100%;
}

.submit-btn:hover {
  background: #1e3a8a;
}
</style>

  
