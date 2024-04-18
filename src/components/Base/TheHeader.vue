<template>
  <header class="header">
    <div class="header__left">
      <router-link to="/">
        <PictureComponent :srcset="logoSrcset"  :src="logoSrc" :alt="'logo'" />

      </router-link>

      <UIInput v-model="searchQuery" @input="$emit('updateInputValue', searchQuery)" @clearInput="clearInputValue"/>
    </div>

    <UIButton class="header__button" @click="openPopup" v-if="!isAuthorization" :class="{ 'disabled': isPopupSecondOpen}">
      Connect wallet
    </UIButton>

    <UIButton class="header__button" v-if="isAuthorization">
      + Add artwork
    </UIButton>

    <UIPopup v-if="isPopupOpen" @closePopup="closePopup">
      <BaseSvg :id="'cross'" @click="closePopup" class="popup__cross-icon"/>

      <h3 class="popup__text">Connecting wallet</h3>

      <div class="did-wallet__cards">
        <BaseSvg v-if="isVideoOpen" :id="'cross'" @click="closeVideo" class="popup__cross-icon"/>
        <div v-for="(card, index) in cards" :key="card.number" class="did-wallet__card" @click="currentVideo(index)">
          <p class="did-wallet__card-num">{{ card.number + '.' }}</p>
          <div class="did-wallet__card-video" :id="'video-container-' + index">
            <PictureComponent :srcset="cards[index].img.webP"  :src="cards[index].img.default" :alt="'video'" />
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

import UIInput from "@/components/UI/UIInput.vue";
import UIButton from "@/components/UI/UIButton.vue";
import UIPopup from "@/components/UI/UIPopup.vue";
import BaseSvg from '@/components/Base/BaseSvg.vue';
import PictureComponent from "@/components/Base/PictureComponent.vue";

import { ref } from 'vue';

const searchQuery = ref('')
const emit = defineEmits('clearInput')

function clearInputValue() {
  searchQuery.value = '';
  emit('clearInput')
}

const logoSrc = new URL('../../assets/image/logo.png', import.meta.url);
const logoSrcset = new URL('../../assets/image/logo.webp', import.meta.url);
const photoSrcLeft = new URL('../../assets/image/youtubeVideo/left.png', import.meta.url);
const photoSrcsetLeft = new URL('../../assets/image/youtubeVideo/left.webp', import.meta.url);
const photoSrcCenter = new URL('../../assets/image/youtubeVideo/center.png', import.meta.url);
const photoSrcsetCenter = new URL('../../assets/image/youtubeVideo/center.webp', import.meta.url);
const photoSrcRight = new URL('../../assets/image/youtubeVideo/right.png', import.meta.url);
const photoSrcsetRight = new URL('../../assets/image/youtubeVideo/right.webp', import.meta.url);

const isAuthorization = ref(false);

const cards = [
  {number: 1, description: 'Описание что нужно сделать', youTubeLink: 'https://www.youtube.com/watch?v=OlnwgS-gk8Y', img: { default: photoSrcLeft, webP: photoSrcsetLeft }},
  {number: 2, description: 'Описание что нужно сделать', youTubeLink: 'https://www.youtube.com/watch?v=c2SK1IlmYL8', img: { default: photoSrcCenter, webP: photoSrcsetCenter }},
  {number: 3, description: 'Описание что нужно сделать', youTubeLink: 'https://www.youtube.com/watch?v=eEF6Szpda9g', img: { default: photoSrcRight, webP: photoSrcsetRight }},
]

console.log(cards[0].img.default)

let isPopupOpen = ref(false);
let isPopupSecondOpen = ref(false);
const isVideoOpen = ref(false);
let currentVideoIndex = null;
let currentVideoPlay = null;


function openPopup() {
  isPopupOpen.value = true;
}

function closePopup() {
  isPopupOpen.value = false;
}

function closeSecondPopup() {
  isPopupSecondOpen.value = false;
}

function openSecondPopup() {
  closePopup();
  isPopupSecondOpen.value = true;

  setTimeout(() => {
    closeSecondPopup();
    isAuthorization.value = true;
  }, 2000);
}

function currentVideo(index) {
  const card = cards[index];
  if (card && card.youTubeLink) {
    if (currentVideoIndex !== null && currentVideoIndex !== index) {
      closeVideo();
    }

    const videoId = card.youTubeLink.split('v=')[1];
    const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
    const iframeElement = document.createElement('iframe');
    iframeElement.setAttribute('src', iframeUrl);
    iframeElement.setAttribute('allowfullscreen', true);
    const videoContainerId = 'video-container-' + index;
    const videoContainer = document.getElementById(videoContainerId);

    currentVideoPlay = videoContainer.innerHTML;
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframeElement);
    isVideoOpen.value = true;
    currentVideoIndex = index;
  } else {
    console.error('Нет ссылки на YouTube для этой карточки');
  }
}


function closeVideo() {
  if (currentVideoIndex !== null) {
    const videoContainerId = 'video-container-' + currentVideoIndex;
    const videoContainer = document.getElementById(videoContainerId);

    videoContainer.innerHTML = '';
    isVideoOpen.value = false;

    if (currentVideoPlay) {
      videoContainer.innerHTML = currentVideoPlay;
    }

    currentVideoIndex = null;
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/media-breakpoints";

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
  margin-bottom: 40px;

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