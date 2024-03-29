import { createRouter, createWebHashHistory } from 'vue-router'
const MainPage = () => import('@/pages/MainPage.vue');
const ProfilePage = () => import("@/pages/ProfilePage.vue");
const CreatorPage = () => import("@/pages/CreatorPage.vue");
const ArtworkPage = () => import("@/pages/ArtworkPage.vue");

const router = createRouter({
  history: createWebHashHistory('/taste-nft/'),
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
