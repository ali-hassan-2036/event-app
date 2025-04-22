import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authApi from '../api/auth'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const errors = ref([])
  const loading = ref(false)
  const successMessage = ref('')

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const getUser = computed(() => user.value)
  const getErrors = computed(() => errors.value)
  const isLoading = computed(() => loading.value)
  const getSuccessMessage = computed(() => successMessage.value)

  // Actions
  const login = async (credentials) => {
    errors.value = []
    loading.value = true
    try {
      const { user, token } = await authApi.login(credentials)
      localStorage.setItem('token', token)
      window.location.href = '/dashboard/events'
    } catch (error) {
      errors.value = [error.message]
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    errors.value = []
    loading.value = true
    try {
      const response = await authApi.register(userData)
      user.value = response.user
      token.value = response.token
      localStorage.setItem('token', response.token)
      router.push({ name: 'login' })
    } catch (error) {
      errors.value = error.response?.data?.errors || [
        'Registration failed. Please try again.'
      ]
      // Clear errors after 5 seconds
      setTimeout(() => {
        errors.value = []
      }, 5000)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
      resetAuthState()
      router.push({ name: 'login' })
    } catch (error) {
      console.error('Logout error:', error)
      errors.value = ['Failed to logout. Please try again.']
    }
  }

  const resetAuthState = () => {
    user.value = null
    token.value = null
    errors.value = []
    loading.value = false
    successMessage.value = ''
    localStorage.removeItem('token')
  }

  // // Initialize the store by checking if we have a token
  // const initialize = () => {
  //   if (token.value) {
  //     // You might want to add a token validation API call here
  //     // For now, we'll just assume the token is valid
  //   }
  // }

  // // Call initialize when the store is created
  // initialize()

  return {
    // State
    user,
    token,
    errors,
    loading,
    successMessage,

    // Getters
    isAuthenticated,
    getUser,
    getErrors,
    isLoading,
    getSuccessMessage,

    // Actions
    login,
    register,
    logout,
    resetAuthState
  }
})