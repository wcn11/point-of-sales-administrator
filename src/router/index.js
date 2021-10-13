import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/users/Users.vue'
import Product from '../views/item/Item.vue'
import Category from '../views/category/category.vue'
import Offer from '../views/offer/Offer.vue'
import Promo from '../views/promo/Promo.vue'
import Notifiation from '../views/notification/Notification.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "about" */ '../views/auth/login.vue')
  },
  {
    path: '/db/:id',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/database/user-lists',
    name: 'databaseUser',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: User,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/user/add',
    name: 'UserAdd',
    component: () => import( /* webpackChunkName: "about" */ '../views/users/UserAdd.vue'),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/user/edit/:id',
    name: 'UserUpdate',
    component: () => import( /* webpackChunkName: "about" */ '../views/users/UserEdit.vue'),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/kategori',
      name: 'category',
      component: Category,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/produk/:categoryId',
      name: 'products',
      component: Product,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/penawaran/:userId',
      name: 'offer',
      component: Offer,
      meta: {
        requiresAuth: true
      }
  }, {
    path: '/promo/:userId',
    name: 'promo',
    component: Promo,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/push/:userId',
    name: 'push',
    component: Notifiation,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {

  if (to.name === "notFound") {

    return next();

  }

  if (to.meta.requiresAuth) {

    if (localStorage.getItem('jwt-admin')) {

      next()

    } else {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    }
  } else {
    if (localStorage.getItem('jwt-admin')) {

      next({
        path: '/',
        params: {
          nextUrl: to.fullPath
        }
      })

    } else {

      next()

    }
  }

})

export default router
