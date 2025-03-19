<template>
  <div class="admin-page-container">
    <h2>Admin Settings</h2>
    <p>Configure system preferences and general settings.</p>

    <div class="card">
      <form @submit.prevent="saveSettings" class="settings-form">
        <!-- Site Name -->
        <BaseInput
          v-model="settings.siteName"
          label="Site Name"
          placeholder="Enter site name"
        />

        <!-- Admin Email -->
        <BaseInput
          v-model="settings.adminEmail"
          label="Admin Email"
          placeholder="Enter admin email"
          type="email"
        />

        <!-- Maintenance Mode -->
        <div class="input-group row">
          <label>Maintenance Mode</label>
          <select v-model="settings.maintenanceMode">
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </div>

        <!-- Save Button centered -->
        <div class="form-actions">
          <BaseButton label="Save Changes" type="submit" variant="primary" size="md" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

const settings = ref({
  siteName: 'JuanJobsPH',
  maintenanceMode: 'off',
  adminEmail: 'admin@juanjobs.com'
})

const saveSettings = () => {
  alert('Settings saved successfully!')
}
</script>

<style scoped>
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 0;
}

.input-group.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-group.row label {
  margin-bottom: 0;
  font-weight: 600;
}

.input-group.row select {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-group.row select:focus {
  border-color: #1e3a8a;
  outline: none;
}

.form-actions {
  margin-top: 25px;
  text-align: center;
}
</style>
