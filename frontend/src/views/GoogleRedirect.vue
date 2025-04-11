<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const token = route.query.token
const role = route.query.role

if (token) {
  localStorage.setItem('authToken', token)
  router.push(role === 'admin' ? '/admin' : '/applicant')
} else {
  router.push('/login')
}
</script>

<template>
  <p>Logging you in...</p>
</template>
