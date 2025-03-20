import { createRouter, createWebHistory } from 'vue-router'

// Public Views
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import JobListingsView from '@/views/JobListingsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import JobApplication from '@/views/applicant/JobApplication.vue'

// Layouts
import AdminLayout from '@/layouts/AdminLayout.vue'
import ApplicantLayout from '@/layouts/ApplicantLayout.vue'

// Admin Pages
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import AdminSettingsView from '@/views/admin/AdminSettingsView.vue'
import ManageUsersView from '@/views/admin/ManageUsersView.vue'
import ViewApplications from '@/views/admin/ViewApplications.vue'
import ManageJobs from '@/views/admin/ManageJobs.vue'

// Applicant Pages
import ApplicantDashboardView from '@/views/ApplicantDashboardView.vue'
import ApplicantJobsView from '@/views/applicant/AppJobListingsView.vue'
import ApplicantApplicationsView from '@/views/applicant/AppApplicationsView.vue'
import ApplicantProfileView from '@/views/applicant/AppProfileView.vue'

const routes = [
  // Public Pages
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/jobs', name: 'JobListings', component: JobListingsView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  

  // Admin Layout + Routes
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'manage-jobs', name: 'ManageJobs', component: ManageJobs },
      { path: 'view-applications', name: 'ViewApplications', component: ViewApplications },
      { path: 'users', name: 'ManageUsers', component: ManageUsersView },
      { path: 'settings', name: 'AdminSettings', component: AdminSettingsView },
    ]
  },
  // Applicant Layout + Routes
  {
    path: '/applicant',
    component: ApplicantLayout,
    children: [
      { path: '', name: 'ApplicantDashboard', component: ApplicantDashboardView },
      { path: 'jobs', name: 'ApplicantJobs', component: ApplicantJobsView },
      { path: 'applications', name: 'ApplicantApplications', component: ApplicantApplicationsView },
      { path: 'profile', name: 'ApplicantProfile', component: ApplicantProfileView },
      { path: 'job-application', name: 'JobApplication', component: JobApplication },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
