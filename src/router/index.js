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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuth = Auth.checkAuth()

  if (requiresAuth && isAuth === false) {
    next({ name: 'login'})
  } else if (to.path === '/login' && isAuth === true) {
    next({ name: from.path})
  } else {
    next()
  }
})

export default router
