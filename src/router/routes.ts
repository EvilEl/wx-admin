export const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/pages/Main/Main.vue'),
    children: [
      {
        name: 'products',
        path: '/products',
        component: () => import('@/pages/Products/Products.vue'),
      },
      {
        name: 'product',
        path: '/product',
        component: () => import('@/pages/Product/Product.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/Login.vue'),
  },
]
