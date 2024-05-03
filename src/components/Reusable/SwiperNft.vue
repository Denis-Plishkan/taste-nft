<template>
  <div class="hero-swiper__wrapper">
    <div class="swiper hero-swiper">
      <swiper
          v-if="swipers"
          grab-cursor
          slides-per-view="1"
          :modules="[Navigation, EffectCoverflow, Pagination]"
          :pagination="{ el: '.hero-swiper__pagination' }"
          :effect="'coverflow'"
          :coverflowEffect="{
          rotate: -2,
          stretch: '-80%',
          depth: 200,
          modifier: -1,
          slideShadows: false,
        }"
          @slideChange="onSlideChange($event)"

      >
        <swiper-slide v-for="(card, index) in props.cards.slice(0, 5)" :key="index">
          <div class="hero-swiper__img">
            <PictureComponent class="hero-swiper__images" :srcset="card.img.webp" :src="card.img.default" :alt="'nft'"/>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="hero-swiper__pagination"></div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import PictureComponent from "@/components/Base/PictureComponent.vue";

const props = defineProps(['cards']);
const emits = defineEmits(['update'])
const swipers = ref(false);
let activeCard = null;

onMounted(()=> {
  activeCard = props.cards[0];
  emits('update', activeCard);

  setTimeout(()=> {
    swipers.value = true;
  }, 100)
})

const onSlideChange = (swiper) => {
  if (swiper) {
    const activeIndex = swiper.activeIndex;
    activeCard = props.cards[activeIndex];
    emits('update', activeCard);
  }
}

</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";
.hero-swiper {

  &__wrapper {
    position: relative;
  }

  &__pagination {
    position: absolute;
    bottom: -28px !important;
    left: 50% !important;
    transform: translateX(-50%);

    .swiper-pagination-bullet-active {
      border-radius: 99px;
      width: 95px;
      height: 5px;
      background: rgba(255, 255, 255, 0.5);
    }

    .swiper-pagination-bullet {
      border-radius: 99px;
      width: 95px;
      height: 5px;
      background: rgba(255, 255, 255, 0.15);

      @include media-breakpoint-down(sm) {
        width: 64px;
      }

      @include media-breakpoint-down(xs) {
        width: 46px;
      }
    }
  }

  &__img {
    width: 519px;
    margin-left: -4px;

  }

}
.swiper-image {
  max-width: 100%;
  max-height: 100%;
}

.swiper-slide img {
  width: 519px;

  @include media-breakpoint-down(sm) {
    width: 270px;
  }

}


</style>
















