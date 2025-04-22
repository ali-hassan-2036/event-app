<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/" class="font-medium text-blue-600 hover:text-blue-500">
            login to your existing account
          </router-link>
        </p>
      </div>
      <RegisterForm :errors="authStore.errors" :loading="authStore.loading" @submit="authStore.register" />
    </div>
  </div>
</template>

<script setup>
import RegisterForm from '../components/RegisterForm.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

</script>