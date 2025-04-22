<!-- src/components/AssignUserModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Assign User to Event</h2>

      <form @submit.prevent="assignUser">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Select User</label>
          <select v-model="selectedUserId" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            <option value="" disabled>Select user</option>
            <option v-for="user in usersStore.users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>

        <div class="flex justify-end space-x-2">
          <button type="button" @click="close" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Assign</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUsersStore } from '@/stores/users'
import { useEventsStore } from '@/stores/events'
import { ref, watch, onMounted } from 'vue'
const usersStore = useUsersStore()
const eventstStore = useEventsStore()


const props = defineProps({
  show: Boolean,
  eventId: Number
})

const emit = defineEmits(['close', 'assigned'])

const selectedUserId = ref('')

onMounted(() => {
  if (usersStore.users.length === 0) {
    usersStore.fetchUsers()
  }
})

const assignUser = async () => {
  try {
    await eventstStore.assignUserToEvent(props.eventId, selectedUserId.value)
    emit('assigned')
    close()
  } catch (e) {
    console.error('Error assigning user:', e)
  }
}

const close = () => {
  selectedUserId.value = ''
  emit('close')
}

</script>