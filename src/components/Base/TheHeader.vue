<template>
  <header class="header">
    <div class="header__left">
      <img alt="Vue logo" class="logo" src="@/image/logo.png"/>
      <UIInput></UIInput>
    </div>

    <UIButton @click="openPopup"></UIButton>

    <UIPopup v-if="isPopupOpen" @closePopup="closePopup">
      <svg @click="closePopup" class="popup__cross-icon">
        <use href="#cross"></use>
      </svg>

      <h3 class="popup__text">Connecting wallet</h3>

      <div class="did-wallet__cards">

        <div v-for="card in cards" :key="card.number" class="did-wallet__card">
          <p class="did-wallet__card-num">{{ card.number + '.' }}</p>
          <div class="did-wallet__card-video">
            <div class="did-wallet__card-svg-container">
              <svg>
                <use href="#play"></use>
              </svg>
            </div>
          </div>

          <p class="did-wallet__card-text">
            {{ card.description }}
          </p>

        </div>
      </div>
      <UIButton @click="openSecondPopup" class="did-wallet__button"/>
    </UIPopup>

    <UIPopup v-if="isPopupSecondOpen" @closePopup="closeSecondPopup">
      <svg @click="closeSecondPopup" class="popup__cross-icon">
        <use href="#cross"></use>
      </svg>

      <h3 class="popup__text">Connecting wallet</h3>

      <div class="popup__init-icon">
        <div class="popup__init-progress-icon">
          <svg>
            <use href="#progress"></use>
          </svg>
        </div>
        <svg>
          <use href="#init-icon"></use>
        </svg>
      </div>

      <p class="popup__init-text">
        Initializing
      </p>

    </UIPopup>

  </header>

</template>

<script setup>
//..
import UIInput from "@/components/UI/UIInput.vue";
import UIButton from "@/components/UI/UIButton.vue";
import UIPopup from "@/components/UI/UIPopup.vue";

import { ref } from 'vue';

const cards = [
  {number: 1, description: 'Описание что нужно сделать'},
  {number: 2, description: 'Описание что нужно сделать'},
  {number: 3, description: 'Описание что нужно сделать'},
]


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
  }, 2000);

}

</script>

<style lang="scss" scoped>

.header {
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #30363D;
  border-radius: 0 0 32px 32px;
  min-height: 56px;
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  padding: 10px 24px;

  @media(max-width: 576px) {
    padding: 10px;
  }

  &__left{
    display: flex;
    align-items: center;
    gap: 26px;
    width: calc(100% - 150px);

    @media(max-width: 576px) {
      gap: 5px;
      width: calc(100% - 110px);
    }
  }
}

</style>