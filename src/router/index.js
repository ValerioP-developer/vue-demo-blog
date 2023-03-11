import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import PostView from '../views/PostView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog/:key',
    name: 'category',
    component: CategoryView,
    children: [
      {
        path: ':keypost',
        name : 'post',
        component: PostView
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
