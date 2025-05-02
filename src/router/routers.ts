export const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/pages/Main/Main.vue'),
    children: [
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/Login.vue'),
  },

]
