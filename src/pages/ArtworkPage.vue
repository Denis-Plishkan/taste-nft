<template>
  <TheHeader @update-input-value="filterCards" @clearInput="clearHeaderInput($event)"/>
  <div class="container">
    <section class="artwork">
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
              {{ cards[$route.params.id].ending }}
            </p>
          </div>
          <div class="artwork__img-info">
            <UIButton class="artwork__img-button">Place a bid</UIButton>
          </div>
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
                  <UISmallButton v-for="item in buttonArray" :key="item" @click="currentButton(item)" >
                    <BaseSvg :id="item"/>
                  </UISmallButton>
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
                  <UIButton>
                    <UISmallButton class="artwork__small-button">
                      <BaseSvg :id="'left'"/>
                    </UISmallButton>
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
import { ref } from "vue";
import UIButtonShow from "@/components/UI/UIButtonShow.vue";
import UIPopup from "@/components/UI/UIPopup.vue";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
import { useRoute } from 'vue-router';

const logoSoldSrc = new URL('../assets/image/logo-sold.png', import.meta.url);
const logoSoldSrcset = new URL('../assets/image/logo-sold.webp', import.meta.url);

const filteredCards = ref(cards);
const inputValue = ref('');
const startCards = ref(4);

const route = useRoute();
const currentURL = route.path;

const buttonArray = ['left', 'center', 'right']

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
    const artworkUrl = `/#artwork/${currentURL.slice(9)}`;
    window.open(artworkUrl, '_blank');
  } else if (item === 'center') {
    toast('Скопировано в буфер обмена!')
    console.log('center')
  }
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

    @include media-breakpoint-down(md) {
      position: static;
      transform: none;
      margin: 0 auto;
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

      @include media-breakpoint-down(xxs) {
        right: -9px;
      }
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

</style>