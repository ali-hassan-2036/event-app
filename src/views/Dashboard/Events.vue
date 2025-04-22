<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Events</h2>
      <router-link to="/dashboard/events/new" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Create Event
      </router-link>
    </div>

    <div v-if="eventsStore.loading" class="flex flex-col items-center justify-center p-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p>Loading events...</p>
      <p class="text-sm text-gray-500 mt-2" v-if="eventsStore.events.length > 0">
        Showing cached events while refreshing...
      </p>
    </div>

    <div v-else-if="eventsStore.error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading events</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ eventsStore.error }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="eventsStore.events.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No events</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div v-for="event in eventsStore.events" :key="event.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">

          <div class="p-6">
            <button @click="openAssignModal(event.id)"
              class="mb-4 w-full bg-indigo-500 text-white text-sm px-3 py-2 rounded hover:bg-indigo-700">
              Assign User
            </button>
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-semibold mb-2">{{ event.title }}</h3>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="{
                'bg-green-100 text-yellow-800 uppercase': event.status === 'upcoming',
                'bg-gray-100 text-green-800 uppercase': event.status === 'ongoing',
                'bg-red-100 text-red-800 uppercase': event.status === 'completed'
              }">
                {{ event.status }}
              </span>
            </div>
            <p class="text-gray-600 mb-2">{{ formatDate(event.date) }}</p>
            <p class="text-gray-700 mb-2">{{ event.description }}</p>
            <div class="flex justify-between items-start">
              <p class="text-gray-500 text-sm flex items-center">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd" />
                </svg>
                {{ event.location }}
              </p>
              <p class="text-gray-700 mb-2">{{ event.user?.name }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2 mt-4">
              <router-link :to="`/dashboard/edit-event/${event.id}`"
                class="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded">
                Update
              </router-link>
              <button @click="deleteEvent(event.id)"
                class="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AssignUserModal :show="showModal" :eventId="selectedEventId" @close="closeModal"
      @assigned="eventsStore.fetchEvents" />

  </div>
</template>

<script setup>
import { useEventsStore } from '@/stores/events'
import { onMounted, ref } from 'vue'
import AssignUserModal from '@/components/AssignEventModal.vue'

const eventsStore = useEventsStore()
const showModal = ref(false)
const selectedEventId = ref(null)

onMounted(() => {
  eventsStore.fetchEvents()
})

const formatDate = (dateString) => {
  if (!dateString) return 'Date not set'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

const deleteEvent = async (eventId) => {
  console.log('eventId', eventId);

  if (confirm('Are you sure you want to delete this event?')) {
    try {
      await eventsStore.deleteEvent(eventId)
      await eventsStore.fetchEvents() // Refresh list
    } catch (error) {
      alert('Failed to delete the event.')
      console.error(error)
    }
  }
}


const openAssignModal = (eventId) => {
  selectedEventId.value = eventId
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>
