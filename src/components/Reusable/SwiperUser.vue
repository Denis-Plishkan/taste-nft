<template>
  <div class="user-swiper__wrapper">
    <div class="swiper user-swiper">
      <swiper
          grab-cursor
          :slides-per-view="swiperSlidesPerView"
          :modules="[Navigation, Pagination, Scrollbar]"
          :pagination="{ el: '.user-swiper__pagination' }"
          :scrollbar="{ draggable: true }"
          space-between="40"

      >
        <swiper-slide v-for="(user, index) in users" :key="index">
          <UserCard :user="user"/>
        </swiper-slide>
      </swiper>
    </div>
    <div class="user-swiper__pagination"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import {Navigation, Pagination, Scrollbar} from 'swiper/modules'
import 'swiper/css'
import UserCard from "@/components/Reusable/UserCard.vue";
import {users} from "@/dataBase.js";
import {ref, watchEffect} from "vue";

const swiperSlidesPerView = ref(5.2);

watchEffect(() => {
  if(window.innerWidth < 380) {
    swiperSlidesPerView.value = 1.3;
  } else if (window.innerWidth < 510) {
    swiperSlidesPerView.value = 1.5;
  } else if (window.innerWidth < 616) {
    swiperSlidesPerView.value = 2.0;
  } else if (window.innerWidth < 834) {
    swiperSlidesPerView.value = 2.5;
  } else if (window.innerWidth < 1080) {
    swiperSlidesPerView.value = 3.2;
  } else if (window.innerWidth < 1320) {
    swiperSlidesPerView.value = 4.2;
  } else {
    swiperSlidesPerView.value = 5.2;
  }
})


</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

.user-swiper {

  &__wrapper {
    position: relative;

    .swiper-wrapper {
      margin-bottom: 16px;
    }
  }

  &__pagination {
    display: none;

  }
}

.swiper-scrollbar{
  left: 0;
  height: 5px;
  background: rgba(255, 255, 255, 0);
}

.swiper-scrollbar-drag{
  background: rgba(255, 255, 255, 0.5);
  border-radius: 99px;
  height: 5px;
}


</style>