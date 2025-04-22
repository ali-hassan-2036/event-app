<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-md">
      <div class="p-4 border-b border-gray-200">
        <h1 class="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      <nav class="mt-4">
        <router-link to="/dashboard/users" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          active-class="bg-blue-50 text-blue-600">
          Users
        </router-link>
        <router-link to="/dashboard/events" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          active-class="bg-blue-50 text-blue-600">
          Events
        </router-link>
      </nav>
      <!-- Logout Button at the bottom -->
      <div class="p-4 border-t border-gray-200">
        <button @click="logout"
          class="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>


    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <div class="p-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const logout = async (eventId) => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error(error)
  }
}
</script>