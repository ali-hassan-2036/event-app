import axios from '@/api/axios'

const getEvents = async () => {
  const response = await axios.get('/events')
  return response.data
}

const createEvent = async (eventData) => {
  const response = await axios.post('/events', eventData)
  return response.data
}

const assignUserToEvent = async (eventId, userId) => {
  const response = await axios.post(`/events/${eventId}/assign`, { user_id: userId })
  return response.data
}

const getEventById = async (eventId) => {
  const response = await axios.get(`/events/${eventId}`)
  console.log('res', response.data);

  return response.data
}

const updateEvent = async (eventId, eventData) => {
  const response = await axios.put(`/events/${eventId}`, eventData)
  return response.data
}

const deleteEvent = async (eventId) => {
  const response = await axios.delete(`/events/${eventId}`)
  return response.data
}

export default {
  getEvents,
  createEvent,
  assignUserToEvent,
  getEventById,
  updateEvent,
  deleteEvent
}