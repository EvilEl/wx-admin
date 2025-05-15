import { useStorage } from '@vueuse/core'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const user = useStorage('user', null)

function authenticateUser(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
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
