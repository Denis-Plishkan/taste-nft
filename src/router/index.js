import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/profile',
      name: 'profile',
      component:  () => import("@/pages/ProfilePage.vue"),
    },
    {
      path: '/creator',
      name: 'creator',
      component: () => import("@/pages/CreatorPage.vue"),
    },
    {
      path: '/artwork/:id',
      name: 'artworkPage',
      component: () => import("@/pages/ArtworkPage.vue"),
      props: true,
    }
  ]
})

export default router
