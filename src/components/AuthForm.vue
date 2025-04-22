<template>
  <form @submit.prevent="submitForm" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <div v-if="errors.length" class="mb-4 p-3 bg-red-50 text-red-600 rounded">
      <div v-for="(error, index) in errors" :key="index" class="text-sm">
        {{ error }}
      </div>
    </div>

    <div v-if="isRegister" class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
      <input id="name" v-model="form.name" type="text" placeholder="Enter your name" required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input id="email" v-model="form.email" type="email" placeholder="Enter your email" required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
      <input id="password" v-model="form.password" type="password" placeholder="Enter your password" required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <button type="submit" :disabled="loading"
      class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
      {{ loading ? 'Processing...' : 'Login' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  errors: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const form = ref({
  email: '',
  password: '',
})

const submitForm = () => {
  emit('submit', form.value)
}
</script>