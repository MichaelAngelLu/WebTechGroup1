<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import AddUserForm from './AddUserForm.vue'
import EditUserForm from './EditUserForm.vue'

const users = ref([])
const showAddForm = ref(false)
const showEditForm = ref(false)
const selectedUser = ref(null)

// Fetch Users
const fetchUsers = async () => {
  const res = await fetch('http://localhost:3000/api/users/users')
  users.value = await res.json()
}

// Add User Handler
const handleUserSubmit = async (formData) => {
  const res = await fetch('http://localhost:3000/api/users/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  if (res.ok) {
    await fetchUsers()
    showAddForm.value = false
    alert('✅ User added!')
  } else {
    const error = await res.json()
    alert(error.message || 'Error adding user')
  }
}

// Edit User Handler
const handleEditSubmit = async (formData) => {
  const res = await fetch(`http://localhost:3000/api/users/${formData._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  if (res.ok) {
    await fetchUsers()
    alert('✅ User updated!')
    // Close modal and reset
    showEditForm.value = false
    selectedUser.value = null
  } else {
    const error = await res.json()
    alert(error.message || 'Error updating user')
  }
}

// Populate edit form
const editUser = (user) => {
  selectedUser.value = user
  showEditForm.value = true
}

// Delete User
const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return
  await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' })
  await fetchUsers()
}

onMounted(() => fetchUsers())
</script>

<template>
  <div class="admin-page-container">
    <div class="header-container">
      <h2>Manage Users</h2>
      <p>View and manage user accounts.</p>
    </div>
    <div class="add-user-container">
      <BaseButton label="Add User" variant="primary" @click="showAddForm = true" />
    </div>

      <BaseTable :headers="['Name', 'Email', 'Role', 'Actions']">
      <template #default>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span :class="['role-badge', user.role.toLowerCase()]">{{ user.role }}</span>
          </td>
          <td>
            <div class="action-buttons">
              <BaseButton label="Edit" size="sm" variant="primary" @click="editUser(user)" />
              <BaseButton label="Delete" size="sm" variant="danger" @click="deleteUser(user._id)" />
            </div>
          </td>
        </tr>
      </template>
    </BaseTable>


    <!-- Add User Modal -->
    <div v-if="showAddForm" class="modal">
      <div class="modal-content">
        <AddUserForm @submitted="handleUserSubmit" @close="showAddForm = false" />
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditForm" class="modal">
      <div class="modal-content">
        <EditUserForm v-if="selectedUser":user="selectedUser" @updated="handleEditSubmit" @close="showEditForm = false; selectedUser = null" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  text-align: center;
  margin-bottom: 0.5rem;
}

.add-user-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
}

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

.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
