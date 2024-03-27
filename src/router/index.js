import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/pages/MainPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import CreatorPage from "@/pages/CreatorPage.vue";
import ArtworkPage from "@/pages/ArtworkPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/creator',
      name: 'creator',
      component: CreatorPage
    },
    {
      path: '/artwork',
      name: 'artwork',
      component: ArtworkPage
    }
  ]
})

export default router
