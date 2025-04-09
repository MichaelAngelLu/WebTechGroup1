<template>
    <div v-if="message" class="bg-red-100 text-red-700 p-3 rounded mb-3">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    props: ['message'],
  };
  </script>
  