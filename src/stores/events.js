import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/events'

export const useEventsStore = defineStore('events', () => {
  const events = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchEvents = async () => {
    try {
      loading.value = true
      error.value = null
      console.log('Fetching events...') // Debug log

      const response = await api.getEvents()
      console.log('API Response:', response) // Debug log

      events.value = response.data || response // Handle both formats
      console.log('Events set:', events.value) // Debug log
    } catch (err) {
      console.error('Error fetching events:', err) // Debug log
      error.value = err.message || 'Failed to load events'
      localStorage.removeItem('token')
    } finally {
      loading.value = false
      console.log('Loading complete') // Debug log
    }
  }

  const createEvent = async (eventData) => {
    try {
      loading.value = true
      const newEvent = await api.createEvent(eventData)
      events.value.unshift(newEvent)
      return newEvent
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const assignUserToEvent = async (eventId, userId) => {
    try {
      const assignUserToEvent = await api.assignUserToEvent(eventId, userId)
    } catch (error) {
      throw error
    }
  }

  const getEventById = async (eventId) => {
    try {
      loading.value = true
      const data = await api.getEventById(eventId)
      return data
    } catch (err) {
      error.value = err.message || 'Failed to fetch event'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateEvent = async (eventId, eventData) => {
    try {
      loading.value = true
      const response = await api.updateEvent(eventId, eventData)
      // Update local state if needed
      const index = events.value.findIndex(e => e.id === eventId)
      if (index !== -1) {
        events.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.message || 'Failed to update event'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteEvent = async (eventId) => {
    try {
      const deleteEvent = await api.deleteEvent(eventId)
    } catch (error) {
      throw error
    }
  }



  return { events, loading, error, fetchEvents, createEvent, assignUserToEvent, getEventById, updateEvent, deleteEvent }
})