import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth from '../auth/auth.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/measure',
    name: 'measure',
    component: () => import(/* webpackChunkName: "login" */ '../views/MeasureView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/acquire',
    name: 'acquire',
    component: () => import(/* webpackChunkName: "login" */ '../views/AcquireView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  Auth.checkAuth().then(isAuth => {
    if (requiresAuth && !isAuth) {
      console.log('not auth')
      next('/login')
    } else if (to.path === '/login' && isAuth) {
      console.log('no auth needed')
      next({ name: from.path })
    } else {
      next()
    }
  }).catch(error => {
    console.log(error)
    next('/login')
  })
})

export default router
