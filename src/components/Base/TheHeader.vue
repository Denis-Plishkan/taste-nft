<template>
  <header class="header">
    <div class="header__left">
      <router-link to="/">
<!--        <img alt="Vue logo" class="logo" src="@/image/logo.png"/>-->
        <PictureComponent :srcset="'@/image/logo.webp'" :src="'@/image/logo.png'" :alt="'logo'"/>
<!--        <picture>-->
<!--          <source srcset="@/image/logo.webp" type="image/webp" />-->
<!--          <img src="@/image/logo.png" alt="logo"  />-->
<!--        </picture>-->
      </router-link>

      <HeaderInput/>
    </div>

    <UIButton class="header__button" @click="openPopup" v-if="isAuthorization" :class="{ 'disabled': isPopupSecondOpen}">
      Connect wallet
    </UIButton>

    <UIPopup v-if="isPopupOpen" @closePopup="closePopup">
      <BaseSvg :id="'cross'" @click="closePopup" class="popup__cross-icon"/>

      <h3 class="popup__text">Connecting wallet</h3>

      <div class="did-wallet__cards">

        <div v-for="card in cards" :key="card.number" class="did-wallet__card">
          <p class="did-wallet__card-num">{{ card.number + '.' }}</p>
          <div class="did-wallet__card-video">
            <div class="did-wallet__card-svg-container">
              <BaseSvg :id="'play'"/>
            </div>
          </div>

          <p class="did-wallet__card-text">
            {{ card.description }}
          </p>

        </div>
      </div>
      <UIButton @click="openSecondPopup" class="did-wallet__button">
        Connect wallet
      </UIButton>
    </UIPopup>

    <UIPopup v-if="isPopupSecondOpen" @closePopup="closeSecondPopup">
      <BaseSvg @click="closeSecondPopup" class="popup__cross-icon" :id="'cross'"/>

      <h3 class="popup__text">Connecting wallet</h3>

      <div class="popup__init-icon">
        <div class="popup__init-progress-icon">
          <BaseSvg :id="'progress'"/>
        </div>
        <BaseSvg :id="'init-icon'"/>
      </div>

      <p class="popup__init-text">
        Initializing
      </p>

    </UIPopup>

  </header>

</template>

<script setup>

import HeaderInput from "@/components/Base/HeaderInput.vue";
import UIButton from "@/components/UI/UIButton.vue";
import UIPopup from "@/components/UI/UIPopup.vue";
import BaseSvg from '@/components/Base/BaseSvg.vue';
import PictureComponent from "@/components/Base/PictureComponent.vue";

import { ref } from 'vue';

const cards = [
  {number: 1, description: 'Описание что нужно сделать'},
  {number: 2, description: 'Описание что нужно сделать'},
  {number: 3, description: 'Описание что нужно сделать'},
]

const isAuthorization = ref(true);
let isPopupOpen = ref(false);
let isPopupSecondOpen = ref(false);

function openPopup() {
  console.log('da')
  isPopupOpen.value = true;
}

function closePopup() {
  console.log('close')
  isPopupOpen.value = false;
}

function closeSecondPopup() {
  console.log('close')
  isPopupSecondOpen.value = false;
}

function openSecondPopup() {
  closePopup();
  isPopupSecondOpen.value = true;

  setTimeout(() => {
    closeSecondPopup();
    isAuthorization.value = false;
  }, 2000);
}

</script>

<style lang="scss" scoped>
@import "@/assets/media-breakpoints.scss";

.header {
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #30363D;
  border-radius: 0 0 32px 32px;
  min-height: 56px;
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  padding: 5px 24px;

  @include media-breakpoint-down(xs) {
    padding: 5px 10px;
  }

  &__left{
    display: flex;
    align-items: center;
    gap: 26px;
    width: calc(100% - 142px);

    @include media-breakpoint-down(xs) {
      gap: 5px;
      width: calc(100% - 110px);
    }
  }

  &__button {
    font-size: 12px;
    padding: 10px 20px;

    @include media-breakpoint-down(xs) {
      padding: 10px 6px;
    }

  }
}

</style>