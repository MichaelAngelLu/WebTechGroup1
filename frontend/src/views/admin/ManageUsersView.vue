<template>
  <div class="admin-page-container">
    <h2>Manage Users</h2>
    <p>View and manage user accounts.</p>

    <div class="card">
      <BaseTable :headers="['ID', 'Name', 'Email', 'Role', 'Actions']">
        <template #default>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="['role-badge', user.role.toLowerCase()]">
                {{ user.role }}
              </span>
            </td>
            <td>
              <BaseButton label="Edit" size="xs" @click="editUser(user.id)" />
              <!-- Only show Delete for Admin users -->
              <BaseButton
                v-if="user.role === 'Staff'"
                label="Delete"
                size="sm"
                variant="secondary"
                @click="deleteUser(user.id)"
              />
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseButton from '@/components/BaseButton.vue'

const users = ref([
  { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "Staff" },
  { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Staff" },
])

const editUser = (id) => {
  alert(`Editing user ID: ${id}`)
}

const deleteUser = (id) => {
  alert(`Deleted Admin user ID: ${id}`)
}
</script>

<style scoped>
.role-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  color: white;
}
.role-badge.admin {
  background-color: #1e3a8a;
}
.role-badge.staff {
  background-color: #64748b;
}
</style>
