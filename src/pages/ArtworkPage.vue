<template>
  <TheHeader @update-input-value="filterCards" @clearInput="clearHeaderInput($event)"/>
  <div class="container">
    <section class="artwork">

      <div v-if="inputValue" class="filtered-cards">
          <div v-if="filteredCards.length > 0" class="filtered-cards__wrapper">
            <TheCard  v-for="(card, index) in filteredCards.slice(0, startCards)" :key="index" :card="card"/>
          </div>
          <div v-else class="filtered-cards__wrapper">
            <h1>There are no cards with this name</h1>
          </div>
          <div v-if="filteredCards.length > 0" class="filtered-cards__button">
            <UIButtonShow @click="loadCards">
              <p>Show all</p>
            </UIButtonShow>
          </div>
        </div>

      <div class="artwork__img">
        <PictureComponent :srcset="cards[$route.params.id].img.webp"  :src="cards[$route.params.id].img.default" :alt="'nft'"/>
        <div class="artwork__img-infos">
          <div class="artwork__img-info">
            <p class="artwork__img-info-text">
              Current Bid:
            </p>

            <p class="artwork__img-info-sold">
              <PictureComponent :srcset="logoSoldSrcset" :src="logoSoldSrc" :alt="'logo'" /> {{ cards[$route.params.id].sold }} <span>({{cards[$route.params.id].price}}$)</span>
            </p>
          </div>
          <div class="artwork__img-info">
            <p class="artwork__img-info-text">
              Auction ending in:
            </p>

            <p class="artwork__img-info-ending">
              {{ remainingTime  }}
            </p>
          </div>
          <div class="artwork__img-info">
            <UIButton class="artwork__img-button" @click="placePopup">Place a bid</UIButton>
          </div>

          <UIPopup v-if="isPlacePopup" class="place-popup">
            <BaseSvg :id="'cross'" @click="closePlacePopup" class="popup__cross-icon"/>

            <h3 class="popup__text artwork-popup__popup-text">Place a bid</h3>

            <div class="artwork-third__form-sum">
              <UIInputSum :text = '"Min.sum"' :sum = '"(1308.54$)"' :input-text = '"TASTE"' v-model="inputValue"/>
            </div>

            <div class="place-popup__button">
              <UIButton @click="place">Place</UIButton>
            </div>

          </UIPopup>

        </div>
      </div>
        <div class="artwork__info-wrapper">
          <div class="artwork__info-wrapper-left">
            <UserInfo class="user-info__hero-wrapper">
              <template v-slot:image>
                <div class="user-info__image-img">
                  <PictureComponent :srcset="users[cards[$route.params.id].userId].img.webp" :src="users[cards[$route.params.id].userId].img.default" :alt="'user'"/>
                </div>
              </template>
              <template v-slot:info-name>
                <p class="user-info__info-name">{{ users[cards[$route.params.id].userId].user }}</p>
              </template>
              <template v-slot:info-user-name>
                <p class="user-info__info-user-name">@{{ users[cards[$route.params.id].userId].userName }}</p>
              </template>
            </UserInfo>
            <NftInfo>
              <h3 class="nft-info__name">
                {{cards[$route.params.id].name}}
              </h3>
              <p class="artwork__info-copy">
                Сopy: <span>2 of 10</span>
              </p>
              <p class="nft-info__description">
                <span>Description:</span> {{ cards[$route.params.id].description }}
              </p>
              <div class="nft-info__bottom">

                <div class="nft-info__bottom-buttons nft-info__button">
                  <UISmallButton :id="id"/>

                </div>
              </div>
            </NftInfo>
          </div>
          <div class="artwork__info-wrapper-right">
            <h3>Activity</h3>
            <div class="artwork__info-wrapper-card">
              <BoughtCard v-for="index in 6" :key="index">
                <p class="artwork__info-sold">
                  <PictureComponent :srcset="logoSoldSrcset" :src="logoSoldSrc" :alt="'logo'" /> {{ cards[$route.params.id].sold }} <span>({{cards[$route.params.id].price}}$)</span>
                  <UIButton class="artwork__info-wrapper-button">
                    <BaseSvg id="left"/>
                  </UIButton>
                </p>
              </BoughtCard>
            </div>
          </div>
        </div>

    </section>
    <section class="artwork-feature">
      <h2 class="artwork-feature__title">
        Feature works
      </h2>
      <div class="nft-cards__wrapper">
        <TheCard v-for="(card, index) in cards.slice(0, 8)" :key="index" :card="card"/>
      </div>
    </section>
  </div>

</template>

<script setup>
import {cards, users} from "@/dataBase.js";
import TheHeader from "@/components/Base/TheHeader.vue";
import PictureComponent from "@/components/Base/PictureComponent.vue";
import UIButton from "@/components/UI/UIButton.vue";
import UserInfo from "@/components/Reusable/UserInfo.vue";
import NftInfo from "@/components/Reusable/NftInfo.vue";
import UISmallButton from "@/components/UI/UISmallButton.vue";
import BaseSvg from "@/components/Base/BaseSvg.vue";
import BoughtCard from "@/components/Reusable/BoughtCard.vue";
import TheCard from "@/components/Base/TheCard.vue";
import { ref, onMounted } from "vue";
import UIButtonShow from "@/components/UI/UIButtonShow.vue";
import UIPopup from "@/components/UI/UIPopup.vue";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
import { useRoute } from 'vue-router';
import UIInputSum from "@/components/UI/UIInputSum.vue";
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

const logoSoldSrc = new URL('../assets/image/logo-sold.png', import.meta.url);
const logoSoldSrcset = new URL('../assets/image/logo-sold.webp', import.meta.url);

const filteredCards = ref(cards);
const inputValue = ref('');
const startCards = ref(4);
const isPlacePopup = ref(false);
const isOpenPopup = ref(false);

const route = useRoute();
const currentURL = route.path;
const id = parseInt(currentURL.slice(9));

const startTimeKey = 'startTime';
let startTime = localStorage.getItem(startTimeKey) ? parseInt(localStorage.getItem(startTimeKey)) : Date.now();

const remainingTime = ref('loading...');

onMounted(() => {
  enableBodyScroll();
  calculateRemainingTime();
  localStorage.setItem(startTimeKey, startTime.toString());
});

function calculateRemainingTime() {
  const card = cards[route.params.id];
  let endingTimeString = card.ending.trim();

  if (!endingTimeString) {
    remainingTime.value = "Sale ended";
    return;
  }

  const [hours, minutes, seconds] = endingTimeString.split(' ').map(part => parseInt(part));

  let remainingMilliseconds = ((hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0)) * 1000;

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const adjustedTime = remainingMilliseconds - elapsedTime;

    if (adjustedTime <= 0) {
      remainingTime.value = "Sale ended";
      clearInterval(intervalId);
      return;
    }

    const h = Math.floor(adjustedTime / 3600000);
    const m = Math.floor(adjustedTime % 3600000 / 60000);
    const s = Math.floor(adjustedTime % 60000 / 1000);
    remainingTime.value = `${h}h ${m}m ${s}s`;

  }, 1000);
}

function placePopup() {
  isPlacePopup.value = true;
  isOpenPopup.value = true;
  disableBodyScroll();
}

function closePlacePopup() {
  isPlacePopup.value = false;
  isOpenPopup.value = false;
  enableBodyScroll();
}

function place() {
  toast('place is added');
  isPlacePopup.value = false;
  isOpenPopup.value = false;
  enableBodyScroll();
}

function filterCards(value) {
  if(value !== '') {
    disableBodyScroll();
  } else {
    enableBodyScroll();
  }

  inputValue.value = value;
  const query = value.toLowerCase();
  filteredCards.value = cards.filter(card => {
    return card.name.toLowerCase().includes(query)
  })
}

function loadCards() {
  startCards.value += 4;
}

function clearHeaderInput() {
  inputValue.value = '';
  startCards.value = 4;
}

</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

.artwork {
  margin-bottom: 102px;
  position: relative;

  &__img {
    width: 100%;
    height: 582px;
    position: relative;
    margin-bottom: 64px;

    @include media-breakpoint-down(md) {
      margin-bottom: 124px;
    }

    @include media-breakpoint-down(xs) {
      height: 320px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__img-info-text {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__img-info-sold {
    font-weight: 600;
    font-size: 16px;
    img {
      width: 19px;
      height: 19px;
    }

    span {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &__img-infos {
    padding: 16px 20px;
    border-radius: 16px;
    box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
    background: #30363d;
    width: fit-content;
    display: flex;
    gap: 44px;
    align-items: center;
    position: absolute;
    bottom: -31px;
    left: 50%;
    transform: translate(-50%);

    @include media-breakpoint-down(ms) {
      flex-direction: column;
      min-width: 284px;
    }

    @include media-breakpoint-down(xxs) {
      padding: 10px;
      gap: 20px;
      text-align: center;
    }
  }

  &__img-info {
    position: relative;

    &:not(:last-child):after {
      position: absolute;
      content: '';
      border-radius: 12px;
      width: 3px;
      height: 100%;
      background: rgba(255, 255, 255, 0.15);
      top: 0;
      right: -20px;

      @include media-breakpoint-down(ms) {
        width: 100%;
        height: 3px;
        right: 0;
        top: 57px;
      }

      @include media-breakpoint-down(xxs) {
        top: 48px;
      }
    }

    @include media-breakpoint-down(ms) {
      width: 100%;
      text-align: center;
    }
  }

  &__img-button {
    padding: 12px 32px;
  }

  &__info-copy {
    font-weight: 500;
    font-size: 14px;
    line-height: 129%;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 8px;

    span {
      color: #fff;
    }
  }

  &__info-wrapper {
    display: flex;
    gap: 21px;

    @include media-breakpoint-down(my) {
      flex-direction: column;
    }
  }

  &__info-wrapper-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__info-wrapper-left {
    max-width: 520px;
  }

  &__info-wrapper-right {
    width: 100%;

    h3 {
      font-weight: 700;
      font-size: 18px;
      margin-top: 6px;
      margin-bottom: 19px;
    }
  }

  &__info-wrapper-button {
    width: 32px;
    height: 32px;
    position: relative;
    svg {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }
  }

  &__info-sold {
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    color: #fff;

    span {
      color: rgba(255, 255, 255, 0.5);
    }

    img {
      width: 19px;
      height: 19px;
    }
  }

  &__small-button {
    width: 32px !important;
    height: 32px !important;
  }

}

.artwork-feature {
  padding-bottom: 50px;

  &__title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 25px;
  }
}

.place-popup {
  min-height: 268px;
  min-width: 653px;

  @include media-breakpoint-down(md) {
    min-width: 120%;
  }

  @include media-breakpoint-down(xxs) {
    min-width: 100%;
  }

  &__button {
    text-align: center;
    margin-top: 32px;
    button {
      padding: 12px 60px;
    }
  }
}

</style>