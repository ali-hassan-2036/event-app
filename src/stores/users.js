import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/users'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await api.getUsers()
      users.value = response.data // Assuming your API returns data in a data property
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch users'
      console.error('Error fetching users:', err)
      localStorage.removeItem('token')
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers
  }
})