import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      component: () => import('@/components/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      redirect: {
        name: 'events'
      },
      children: [
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/Dashboard/Users.vue')
        },
        {
          path: 'events',
          name: 'events',
          component: () => import('@/views/Dashboard/Events.vue')
        },
        {
          path: 'events/new',
          name: 'create-event',
          component: () => import('@/views/Dashboard/CreateOrUpdateEvent.vue')
        },
        {
          path: 'edit-event/:id',
          name: 'edit-event',
          component: () => import('@/views/Dashboard/CreateOrUpdateEvent.vue'),
          props: true // This will pass the route params as props to the component
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'users' })
  } else {
    next()
  }
})

export default router
