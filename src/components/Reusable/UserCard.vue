<template>
  <div class="user-card">
    <div class="user-card__img">
      <PictureComponent class="user-card__image" :srcset="props.user.img.webp"  :src="props.user.img.default" :alt="'user'"/>
    </div>
    <p class="user-card__name">{{ props.user.user }}</p>
    <p class="user-card__user-name">@{{ props.user.userName }}</p>
    <p class="user-card__sales">{{ props.user.sales }}</p>
  </div>
</template>

<script setup>

import PictureComponent from "@/components/Base/PictureComponent.vue";

const props = defineProps({
  user: Object,
});
</script>

<style lang="scss">
.user-card {
  border: 1px solid #333940;
  width: 245px;
  height: 222px;

  &__img {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-top: 24px;
    margin-bottom: 20px;
  }

  &__image {
    img {
      width: 100%;
    }
  }

  &__name, &__user-name {
    text-align: center;
    margin-bottom: 8px;
  }

  &__name {
    font-weight: 700;
    font-size: 20px;
  }

  &__user-name {
    font-weight: 500;
    font-size: 16px;
    background: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
    background-clip: text;
    color: transparent;
  }

  &__sales {
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>