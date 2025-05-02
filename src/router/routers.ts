export const routes = [
  {
    path: '/',
    component: () => import('@/pages/Main/Main.vue'),
    children: [

    ],
  },
  {
    path: '/login',
    component: () => import('@/pages/Login/Login.vue'),
  },

]
