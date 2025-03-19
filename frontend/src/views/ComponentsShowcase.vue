<script setup>
import { ref } from 'vue'

import Footer from '@/components/Footer.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseForm from '@/components/BaseForm.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseTable from '@/components/BaseTable.vue'
import Alert from '@/components/Alert.vue'
import Searchbar from '@/components/Searchbar.vue'
import Table from '@/components/Table.vue'

const formData = ref({
  inputValue: '',
  selectedOption: ''
})
const isModalOpen = ref(false)

const tableData = ref([
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
])

const tableHeaders = ['Name', 'Email', 'Role']
</script>

<template>
  <div class="playground-container">
    <h1>🧩 Component Playground</h1>

    <!-- Button -->
    <section>
      <h2>🔘 Base Button</h2>
      <BaseButton label="Open Modal" @click="isModalOpen = true" />
    </section>

    <!-- Form -->
    <section>
      <h2>📝 Base Form + Inputs</h2>
      <BaseForm>
        <BaseInput v-model="formData.inputValue" placeholder="Enter your name" />
        <BaseSelect v-model="formData.selectedOption" :options="['Developer', 'Designer', 'Manager']" />
        <BaseButton label="Submit Form" />
      </BaseForm>
    </section>

    <!-- Alert -->
    <section>
      <h2>📢 Alert Component</h2>
      <Alert type="success" message="You have successfully submitted the form!" />
    </section>

    <!-- Searchbar -->
    <section>
      <h2>🔍 Searchbar Component</h2>
      <Searchbar />
    </section>

    <!-- Base Table -->
    <section>
      <h2>📋 BaseTable</h2>
      <BaseTable :headers="tableHeaders" :rows="tableData" />
    </section>

    <!-- Modal -->
    <section>
      <h2>🪟 Base Modal</h2>
      <BaseModal v-if="isModalOpen" title="Hello Modal!" @close="isModalOpen = false">
        <template #default>
          <p>This is inside the modal 🎉</p>
          <BaseButton label="Close" @click="isModalOpen = false" />
        </template>
      </BaseModal>
    </section>

    <!-- Table.vue -->
    <section>
      <h2>📋 Table.vue (another table)</h2>
      <Table />
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.playground-container {
  padding: 60px;
  max-width: 1000px;
  margin: 0 auto;
}

section {
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 10px;
  color: #1e3a8a;
}
</style>
