<template>
  <TheHeader @update-input-value="filterCards" @clearInput="clearHeaderInput($event)"/>
  <div class="container">
    <section class="creator">
      <UIPopup v-if="inputValue" class="filtered-cards">
        <div  >
          <div v-if="filteredCards.length > 0" class="filtered-cards__wrapper">
            <TheCard  v-for="(card, index) in filteredCards.slice(0, startCards)" :key="index" :card="card"/>
          </div>
          <div v-else class="filtered-cards__wrapper">
            <h1>There are no cards with this name</h1>
          </div>
          <div class="filtered-cards__button">
            <UIButtonShow @click="loadCards">
              <p>Show all</p>
            </UIButtonShow>
          </div>

        </div>
      </UIPopup>
      <div class="creator__hero">
        <div class="creator__hero-wrapper">
          <div class="creator__hero-left">
            <UserInfo class="user-info__hero-wrapper">
              <template v-slot:image>
                <div class="user-info__image-img">
                  <PictureComponent :srcset="users[$route.params.id].img.webp" :src="users[$route.params.id].img.default" :alt="'user'"/>
                </div>
              </template>
              <template v-slot:info-name>
                <p class="user-info__info-name">{{ users[$route.params.id].user }}</p>
              </template>
              <template v-slot:info-user-name>
                <p class="user-info__info-user-name">@{{ users[$route.params.id].userName }}</p>
              </template>
            </UserInfo>
          </div>
          <div class="creator__hero-right">
            <div class="nft-info__bottom-buttons nft-info__button">
              <div class="creator__hero-follow">
                <p class="creator__hero-follow-num">234</p>
                <p class="creator__hero-follow-text">Followers</p>
              </div>
              <div class="creator__hero-follow">
                <p class="creator__hero-follow-num">15</p>
                <p class="creator__hero-follow-text">Following</p>
              </div>

              <UIButton class="nft-info__button-vue">Follow</UIButton>
              <UISmallButton v-for="item in buttonArray" :key="item" @click="currentButton(item)" >
                <BaseSvg :id="item"/>
              </UISmallButton>
            </div>
        </div>

        </div>
        <div class="creator__hero-icons">
          <div class="creator__hero-icon">
            <BaseSvg :id="'twich'" class="creator__hero-icon-svg"/>
            <p>Twitch</p>
          </div>
          <div class="creator__hero-icon">
            <BaseSvg :id="'instagram'" class="creator__hero-icon-svg"/>
            <p>Instagram</p>
          </div>
          <div class="creator__hero-icon">
            <BaseSvg :id="'twitter'" class="creator__hero-icon-svg"/>
            <p>Twitter</p>
          </div>
          <div class="creator__hero-icon">
            <BaseSvg :id="'onlyfans'" class="creator__hero-icon-svg"/>
            <p>Onlyfans</p>
          </div>
        </div>
        <div class="creator__hero-description">
          <p><span>Description: </span>{{ users[$route.params.id].description }}</p>
        </div>
      </div>
    </section>
    <section class="creator-cards">
      <div class="creator-cards__buttons">
        <UIButtonText v-for="item in UiButtonArray" :key="item" @click="filterUserCard(item)" :class="isButtonSelected(item)">{{ item }}</UIButtonText>
      </div>

      <div class="nft-cards__wrapper">
        <TheCard v-for="(card, index) in userCards" :key="index" :card="card">
        </TheCard>
      </div>
    </section>

  </div>

</template>

<script setup>
import TheHeader from "@/components/Base/TheHeader.vue";
import {ref} from "vue";
import {cards, users} from "@/dataBase.js";
import PictureComponent from "@/components/Base/PictureComponent.vue";
import UserInfo from "@/components/Reusable/UserInfo.vue";
import UIButton from "@/components/UI/UIButton.vue";
import BaseSvg from "@/components/Base/BaseSvg.vue";
import UISmallButton from "@/components/UI/UISmallButton.vue";
import TheCard from "@/components/Base/TheCard.vue";
import UIButtonText from "@/components/UI/UIButtonText.vue";
import UIButtonShow from "@/components/UI/UIButtonShow.vue";
import UIPopup from "@/components/UI/UIPopup.vue";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = Number(route.params.id);


const filteredCards = ref(cards);
const inputValue = ref('');
const startCards = ref(4);
const userCards = ref(cards.filter(card => card.userId === userId));
const selectedButton = ref(null);
const originalUserCards = ref(userCards.value);


const buttonArray = ['left', 'center', 'right'];
const UiButtonArray = ['Created', 'Collected'];

function filterCards(value) {
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
  console.log(inputValue.value)
  inputValue.value = '';
  console.log('MainPage clear:', inputValue.value);

}

function currentButton(item) {
  if (item === 'left') {
    const artworkUrl = `/#creator/${userId}`;
    window.open(artworkUrl, '_blank');
  } else if (item === 'center') {
    toast('Скопировано в буфер обмена!')
    console.log('center')
  }
}

function filterUserCard(item) {
  selectedButton.value = item;
  if (item === 'Created') {
    userCards.value = originalUserCards.value.filter(card => card.ending !== '')
  } else if (item === 'Collected') {
    userCards.value = originalUserCards.value.filter(card => card.ending === '')
  }

  console.log(item)
}

function isButtonSelected(item) {
  return selectedButton.value === item ? 'selected' : '';
}
</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

.creator {
  position: relative;

  &__hero-wrapper {
    display: flex;
    justify-content: space-between;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      margin-bottom: 30px;
    }
  }

  &__hero-right {
    margin-top: 3px;
  }

  &__hero-icons {
    display: flex;
    gap: 21px;
    margin-top: 4px;
    margin-bottom: 16px;

    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }

  &__hero-icon {
    display: flex;
    align-items: center;
    gap: 10px;

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 129%;
      color: #fff;
    }
  }

  &__hero-icon-svg {
    width: 20px;
    height: 20px;
  }

  &__hero-follow {
    margin-right: 10px;

    @include media-breakpoint-down(xs) {
      margin-right: 0;
    }
  }

  &__hero-follow-num {
    font-weight: 600;
    font-size: 14px;
    line-height: 129%;
    color: #fff;
  }

  &__hero-follow-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 129%;
    color: rgba(255, 255, 255, 0.5);
  }

  &__hero-description {
    max-width: 1061px;

    margin-bottom: 40px;


    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 129%;
      color: #fff;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;

      span {
        color: rgba(255, 255, 255, 0.5);
      }

    }
  }
}

.creator-cards {
  padding-bottom: 50px;

  &__buttons {
    display: flex;
    gap: 25px;
    margin-bottom: 23px;
  }
}

.selected {
  color: white;
}

</style>