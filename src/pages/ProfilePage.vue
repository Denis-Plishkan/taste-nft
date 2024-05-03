<template>
  <TheHeader @update-input-value="filterCards" @clearInput="clearHeaderInput($event)"/>
  <div class="container">
    <section class="profile">

      <div v-if="inputValue" class="filtered-cards">
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
      </div>

      <div class="profile__hero">
        <div class="profile__hero-wrapper">
          <div class="profile__hero-left">
            <UserInfo class="user-info__hero-wrapper">
              <template v-slot:image>
                <div class="user-info__image-img">
                  <PictureComponent :srcset="users[0].img.webp" :src="users[0].img.default" :alt="'user'"/>
                </div>
              </template>
              <template v-slot:info-name>
                <p class="user-info__info-name">{{ users[0].user }}</p>
              </template>
              <template v-slot:info-user-name>
                <p class="user-info__info-user-name">@{{ users[0].userName }}</p>
              </template>
            </UserInfo>
          </div>
          <div class="profile__hero-right">
            <div class="nft-info__bottom-buttons nft-info__button">
              <div class="profile__hero-follow">
                <p class="profile__hero-follow-num">234</p>
                <p class="profile__hero-follow-text">Followers</p>
              </div>
              <div class="profile__hero-follow">
                <p class="profile__hero-follow-num">15</p>
                <p class="profile__hero-follow-text">Following</p>
              </div>

              <UISmallButton :id="0" />
            </div>
          </div>

        </div>
        <div class="profile__hero-icons">
          <div class="profile__hero-icon">
            <BaseSvg :id="'twich'" class="profile__hero-icon-svg"/>
            <p>Twitch</p>
          </div>
          <div class="profile__hero-icon">
            <BaseSvg :id="'instagram'" class="profile__hero-icon-svg"/>
            <p>Instagram</p>
          </div>
          <div class="profile__hero-icon">
            <BaseSvg :id="'twitter'" class="profile__hero-icon-svg"/>
            <p>Twitter</p>
          </div>
          <div class="profile__hero-icon">
            <BaseSvg :id="'onlyfans'" class="profile__hero-icon-svg"/>
            <p>Onlyfans</p>
          </div>
        </div>
        <div class="profile__hero-description">
          <p><span>Description: </span>{{ users[0].description }}</p>
        </div>
      </div>
    </section>

    <section class="profile-cards">
      <div class="profile-cards__buttons">
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
import {cards, users} from "@/dataBase.js";
import { ref, onMounted } from "vue";
import UIButtonShow from "@/components/UI/UIButtonShow.vue";
import TheCard from "@/components/Base/TheCard.vue";
import BaseSvg from "@/components/Base/BaseSvg.vue";
import UISmallButton from "@/components/UI/UISmallButton.vue";
import UserInfo from "@/components/Reusable/UserInfo.vue";
import PictureComponent from "@/components/Base/PictureComponent.vue";
import UIButtonText from "@/components/UI/UIButtonText.vue";
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

const inputValue = ref('');
const filteredCards = ref(cards);
const startCards = ref(4);
const selectedButton = ref(null);
const userCards = ref(cards.filter(card => card.userId === 0));
const originalUserCards = ref(userCards.value);

const UiButtonArray = ['Created', 'Collected', 'Bids'];

function filterCards(value) {
  if(value !== '') {
    disableBodyScroll();
  } else {
    enableBodyScroll();
  }

  inputValue.value = value
  const query = value.toLowerCase();
  filteredCards.value = cards.filter(card => {
    return card.name.toLowerCase().includes(query);
  })
}


function clearHeaderInput() {
  inputValue.value = '';
}

function loadCards() {
  startCards.value += 4;
}

function isButtonSelected(item) {
  if (!selectedButton.value && item === UiButtonArray[0]) {
    return 'selected';
  } else {
    return selectedButton.value === item ? 'selected' : '';
  }
}

function filterUserCard(item) {
  selectedButton.value = item;
  if (item === 'Created') {
    userCards.value = originalUserCards.value.filter(card => card.state === 'Approved')
  } else if (item === 'Collected') {
    userCards.value = originalUserCards.value.filter(card => card.state === 'Declined')
  } else if (item === 'Bids') {
    userCards.value = originalUserCards.value.filter(card => card.state === 'On moderation')
  }
}

onMounted(() => {
  filterUserCard('Created');
});

</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

  .profile {
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

      @include media-breakpoint-down(xxs) {
        font-size: 8px;
      }
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

.profile-cards {
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