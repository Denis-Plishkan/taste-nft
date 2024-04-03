<!--<template>-->
<!--  <div class="swiper mySwiper">-->
<!--    <div class="swiper-wrapper">-->
<!--      <div class="swiper-slide" v-for="(card, index) in cards.splice(0, 5)" :key="index">-->
<!--        <PictureComponent class="mySwiper__img" :srcset="card.img.webp"  :src="card.img.default" :alt="'nft'"/>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="swiper-pagination__header"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { onMounted } from 'vue';-->
<!--import Swiper from "swiper";-->
<!--import {-->
<!--  Navigation,-->
<!--  Pagination,-->
<!--  Autoplay,-->
<!--  Scrollbar,-->
<!--  Thumbs,-->
<!--  EffectCoverflow-->
<!--} from "swiper/modules";-->
<!--import {cards} from "@/dataBase.js";-->
<!--import PictureComponent from "@/components/Base/PictureComponent.vue";-->
<!--Swiper.use([Navigation, Pagination, Autoplay, Scrollbar, Thumbs, EffectCoverflow]);-->

<!--let swiper;-->

<!--onMounted(() => {-->
<!--  swiper = new Swiper(".mySwiper", {-->
<!--    effect: "coverflow",-->
<!--    grabCursor: true,-->
<!--    centeredSlides: true,-->
<!--    slidesPerView: 5,-->
<!--    coverflowEffect: {-->
<!--      rotate: 0,-->
<!--      stretch: 10,-->
<!--      depth: 100,-->
<!--      modifier: 3,-->
<!--      slideShadows: false,-->
<!--    },-->
<!--    pagination: {-->
<!--      el: ".swiper-pagination__header",-->
<!--    },-->
<!--  });-->
<!--});-->
<!--</script>-->

<!--<style>-->
<!--.swiper-image {-->
<!--  max-width: 100%;-->
<!--  max-height: 100%;-->
<!--}-->

<!--.swiper-slide img {-->
<!--  width: 519px;-->
<!--}-->

<!--.swiper-pagination {-->
<!--  position: absolute;-->
<!--  bottom: 10px;-->
<!--  left: 50%;-->
<!--  transform: translateX(-50%);-->
<!--  display: flex;-->
<!--  list-style: none;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--}-->

<!--.swiper-pagination-bullet {-->
<!--  width: 8px!important;-->
<!--  height: 8px!important;-->
<!--  background-color: #fff;-->
<!--  border-radius: 50%;-->
<!--  margin: 0 5px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.swiper-pagination-bullet-active {-->
<!--  background-color: #ff0000; /* Цвет активного буллета */-->
<!--}-->

<!--</style>-->

<template>
  <div class="swiper header-swiper">
    <swiper
        grab-cursor
        :slides-per-view="5"
        :modules="[Navigation, EffectCoverflow]"
        :pagination="{ el: '.header-swiper__pagination' }"
        :coverflowEffect="{
          rotate: 50,
          stretch: 10,
          depth: 100,
          modifier: 3,
          slideShadows: false
        }"
    >
      <swiper-slide v-for="(card, index) in cards" :key="index">
        <PictureComponent class="mySwiper__img" :srcset="card.img.webp" :src="card.img.default" :alt="'nft'"/>
      </swiper-slide>
    </swiper>
    <div class="header-swiper__pagination"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import { cards } from "@/dataBase.js";
import PictureComponent from "@/components/Base/PictureComponent.vue";

</script>

<style scoped lang="scss">
.header-swiper {

  &__pagination {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &__slide {
    display: flex;
    align-items: flex-start;
  }

  &__slide-wrapper {
    min-width: 620px;
    margin-left: 117px;
    margin-right: 41px;
    padding-top: 81px;
  }

  &__image-wrapper {
    position: relative;
    min-width: 602px;
    padding-top: 10px;
  }
}
</style>




















