<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>
        <img src="logo.png" alt="JuanJobsPH Logo" class="logo">
      </h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Job Listings Page</a></li>
        <li><a href="#">Job Details Page</a></li>
        <li><a href="#">Admin Dashboard Page</a></li>
        <li>
          <a href="#">Job Application Page</a>
          <ul class="sub-menu">
            <li><a href="application-status.html">Application Status</a></li>
          </ul>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="content">
      <main>
        <h1>Application Status</h1>
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(application, index) in applications" :key="index">
              <td>{{ application.jobTitle }}</td>
              <td>{{ application.company }}</td>
              <td>
                <span :class="['status', application.statusClass]">
                  {{ application.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link to="/job-application" class="back-btn">Back to Application</router-link>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applications: [
        { jobTitle: "Software Developer", company: "ABC Tech Solutions", status: "Pending", statusClass: "pending" },
        { jobTitle: "UI/UX Designer", company: "Creative Minds", status: "Shortlisted", statusClass: "shortlisted" },
        { jobTitle: "Project Manager", company: "InnovateCorp", status: "Completed", statusClass: "completed" }
      ]
    };
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

.sidebar h2 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #1e3a8a;
  color: white;
  font-weight: 600;
}

tr:hover {
  background-color: #f1f5f9;
}

.status {
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 4px;
}

.pending {
  background: #fffae5;
  color: #d97706;
}

.shortlisted {
  background: #e0f2fe;
  color: #0284c7;
}

.completed {
  background: #dcfce7;
  color: #16a34a;
}

.back-btn {
  display: block;
  margin: 30px auto 0;
  padding: 14px 20px;
  background: #10204d;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  transition: background 0.3s ease-in-out;
  width: fit-content;
}

.back-btn:hover {
  background: #1e3a8a;
}
</style>
