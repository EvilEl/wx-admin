import { useUser } from '@/composables/useUser'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routers'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const { user } = useUser()

function authenticateUser(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  console.log(user)

  if (!user.value && !to.path.includes('/login')) {
    return next({ name: 'login' })
  } else if (user.value && to.path.includes('/login')) {
    return next({ name: 'root' })
  } else {
    return next()
  }
}

router.beforeEach(authenticateUser)

export default router
