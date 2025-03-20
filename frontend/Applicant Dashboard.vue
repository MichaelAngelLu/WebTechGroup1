<template>
  <div class="content">
    <main>
      <img src="/logo.png" alt="JuanJobsPH Logo" class="logo" />
      <h1>Applicant Dashboard</h1>
      <div class="button-container">
        <router-link to="/job-listings" class="dashboard-btn">Job Listings</router-link>
        <router-link to="/job-application" class="dashboard-btn">Job Applications</router-link>
        <router-link to="/logout" class="dashboard-btn">Log out</router-link>
      </div>
      <table class="job-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>HR Manager</td>
            <td>Manila</td>
            <td>Under Review</td>
            <td><button>Check Status</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Recruitment Specialist</td>
            <td>Cebu</td>
            <td>Pending</td>
            <td><button>Check Status</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>HR Assistant</td>
            <td>Davao</td>
            <td>Interview Scheduled</td>
            <td><button>Check Status</button> <button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </main>
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

.content {
  padding: 40px;
  flex-grow: 1;
  text-align: center;
}

main {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 150px;
  margin-bottom: 10px;
}

h1 {
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 22px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.dashboard-btn {
  padding: 10px 15px;
  background: #10204d;
  color: white;
  text-align: center;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  text-decoration: none;
}

.dashboard-btn:hover {
  background: #1e3a8a;
}

.job-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.job-table th, .job-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.job-table th {
  background-color: #f4f4f4;
  font-weight: 600;
}

.job-table button {
  background-color: #10204d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 12px;
}

.job-table button:hover {
  background-color: #1e3a8a;
}
</style>
