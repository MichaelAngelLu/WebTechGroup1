import { createRouter, createWebHistory } from 'vue-router'

// Import Views
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import JobListingsView from '@/views/JobListingsView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/jobs', name: 'JobListings', component: JobListingsView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
