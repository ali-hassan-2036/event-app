<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">{{ isEditMode ? 'Edit Event' : 'Create New Event' }}</h2>

    <form @submit.prevent="handleSubmit" class="max-w-lg bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
        <input v-model="form.title" type="text" id="title" required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-medium mb-2">Description</label>
        <textarea v-model="form.description" id="description" rows="4" required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>

      <div class="mb-4">
        <label for="date" class="block text-gray-700 font-medium mb-2">Date & Time</label>
        <input v-model="form.date" type="datetime-local" id="date" required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <div class="mb-4">
        <label for="location" class="block text-gray-700 font-medium mb-2">Location</label>
        <input v-model="form.location" type="text" id="location" required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <div class="mb-4">
        <label for="status" class="block text-gray-700 font-medium mb-2">Status</label>
        <select v-model="form.status" id="status" required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div class="flex justify-end space-x-3">
        <router-link to="/dashboard/events"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Cancel
        </router-link>
        <button type="submit" :disabled="eventsStore.loading"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400">
          <span v-if="eventsStore.loading">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ isEditMode ? 'Updating...' : 'Creating...' }}
          </span>
          <span v-else>
            {{ isEditMode ? 'Update Event' : 'Create Event' }}
          </span>
        </button>
      </div>

      <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-600 rounded">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useEventsStore } from '@/stores/events'
import { useRouter, useRoute } from 'vue-router'

const eventsStore = useEventsStore()
const router = useRouter()
const route = useRoute()

const isEditMode = computed(() => route.name === 'edit-event')

const form = ref({
  title: '',
  description: '',
  date: '',
  location: '',
  status: 'upcoming'
})

const error = ref(null)

// Fetch event data if in edit mode
onMounted(async () => {
  if (isEditMode.value && route.params.id) {
    try {
      const event = await eventsStore.getEventById(route.params.id)
      console.log('event', event);

      if (event) {
        form.value = { ...event }
        // Convert date to local datetime format if needed
        if (event.date) {
          const date = new Date(event.date)
          const localDateTime = date.toISOString().slice(0, 16)
          form.value.date = localDateTime
        }
      }
    } catch (err) {
      error.value = err.message || 'Failed to load event data'
    }
  }
})

const handleSubmit = async () => {
  try {
    error.value = null

    if (isEditMode.value) {
      await eventsStore.updateEvent(route.params.id, form.value)
    } else {
      await eventsStore.createEvent(form.value)
    }

    router.push('/dashboard/events')
  } catch (err) {
    error.value = err.message || `Failed to ${isEditMode.value ? 'update' : 'create'} event`
  }
}
</script>