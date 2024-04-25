<template>
  <TheHeader @update-input-value="filterCards" @clearInput="clearHeaderInput($event)"/>
  <div class="container">
    <section class="hero">
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
      <div class="hero__wrapper">
        <div class="hero__wrapper-left">
          <UserInfo class="user-info__hero-wrapper">
            <template v-slot:image>
              <div v-if="currentUser.img" class="user-info__image-img">
                <PictureComponent :srcset="currentUser.img.webp" :src="currentUser.img.default" :alt="'user'"/>
              </div>
            </template>
            <template v-slot:info-name>
              <p class="user-info__info-name">{{ currentUser.user }}</p>
            </template>
            <template v-slot:info-user-name>
              <p class="user-info__info-user-name">@{{ currentUser.userName }}</p>
            </template>
          </UserInfo>
          <NftInfo>
            <h3 class="nft-info__name">
              {{data.name}}
            </h3>
            <p class="nft-info__description">
              <span>Description:</span> {{ data.description }}
            </p>
            <div class="nft-info__bottom">
              <p class="nft-info__bottom-sold">
                Sold for: <PictureComponent :srcset="logoSoldSrcset" :src="logoSoldSrc" :alt="'logo'" /> {{ data.sold }}
              </p>
              <div class="nft-info__bottom-buttons nft-info__button">
                <router-link :to="{ path: `/artwork/${id}` }">
                  <UIButton class="nft-info__button-vue">View</UIButton>
                </router-link>

                <UISmallButton v-for="item in buttonArray" :key="item" @click="currentButton(item)" >
                  <BaseSvg :id="item"/>
                </UISmallButton>

              </div>
            </div>
          </NftInfo>
        </div>
        <div class="hero__wrapper-right">
          <SwiperNft :cards="cards" @update="infoActiveCard"/>
        </div>
      </div>
    </section>

    <section class="nft-cards">
      <div class="nft-cards__dropdowns">
        <UIDropdown v-for="(item, index) in dropdownArray" :key="item" @click="toggleDropdown(index)">{{ dropdownValues[index] }}
          <list v-if="item === 'Recently added' && isDropdownOpen[index]" class="dropdown__list">
            <li v-for="li in listRecently" :key="li" @click="currentLi(li, index)">{{ li }}</li>
          </list>
          <list v-else-if="item === 'Auctions' && isDropdownOpen[index]" class="dropdown__list">
            <li v-for="li in listAuctions" :key="li" @click="currentLi(li, index)">{{ li }}</li>
          </list>
        </UIDropdown>
      </div>

      <div class="nft-cards__wrapper">
          <TheCard v-for="(card, index) in sortedCards.slice(0, 8)" :key="index" :card="card">
          </TheCard>
      </div>
    </section>

    <section class="featured">
      <h3 class="featured__title">Featured creators</h3>
      <SwiperUser/>
    </section>
  </div>

</template>

<script setup>

import UserInfo from "@/components/Reusable/UserInfo.vue";
import NftInfo from "@/components/Reusable/NftInfo.vue";
import PictureComponent from "@/components/Base/PictureComponent.vue";
import UIButton from "@/components/UI/UIButton.vue";
import UISmallButton from "@/components/UI/UISmallButton.vue";
import BaseSvg from "@/components/Base/BaseSvg.vue";
import TheCard from "@/components/Base/TheCard.vue";
import { cards, users } from "@/dataBase.js";
import SwiperNft from "@/components/Reusable/SwiperNft.vue";
import SwiperUser from "@/components/Reusable/SwiperUser.vue";
import UIDropdown from "@/components/UI/UIDropdown.vue";
import TheHeader from "@/components/Base/TheHeader.vue";
import { ref } from 'vue';
import UIButtonShow from "@/components/UI/UIButtonShow.vue";
import UIPopup from "@/components/UI/UIPopup.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const logoSoldSrc = new URL('../assets/image/logo-sold.png', import.meta.url);
const logoSoldSrcset = new URL('../assets/image/logo-sold.webp', import.meta.url);

const filteredCards = ref(cards);
const data = ref({});
const currentUser = ref({})
const inputValue = ref('');
const startCards = ref(4);
const id = ref(0);

const buttonArray = ['left', 'center', 'right'];
const dropdownArray = ['Recently added', 'Auctions'];
const listRecently = ['Recently added', 'Price', 'Sold'];
const listAuctions = ['Auctions', 'Declined', 'Process'];

const dropdownValues = ref(['Recently added', 'Auctions']);
const isDropdownOpen = ref([false, false]);
let sortedCards = ref([...cards]);

function currentLi(item, index) {
  dropdownValues.value[index] = item;
  if(item === 'Price') {
    sortedCards.value.sort((a, b) => {
      return b.price - a.price;
    })
  } else if(item === 'Sold') {
    sortedCards.value.sort((a, b) => {
      const aValue = convertSoldToNumber(a.sold);
      const bValue = convertSoldToNumber(b.sold);
      return aValue - bValue;
    })
  } else if(item === 'Recently added' || item === 'Auctions') {
    sortedCards.value = cards;
  } else if(item === 'Declined') {
    sortedCards.value = cards;
    sortedCards.value = sortedCards.value.filter(cards => cards.state === 'Declined')
  } else if(item === 'Process') {
    sortedCards.value = cards;
    sortedCards.value = sortedCards.value.filter(cards => cards.ending === '')
  }

}

function convertSoldToNumber(soldString) {
  let value = parseFloat(soldString);
  if (soldString.endsWith('M')) {
    value *= 1000000;
  }
  return value;
}

function filterCards(value) {
  inputValue.value = value;
  const query = value.toLowerCase();
  filteredCards.value = cards.filter(card => {
    return card.name.toLowerCase().includes(query);
  })
}

function infoActiveCard(value) {
  data.value = value;
  id.value = value.id;
  currentUser.value = users.find(user => user.id === value.userId);
}

function clearHeaderInput() {
  inputValue.value = '';
}

function loadCards() {
  startCards.value += 4;
}

function currentButton(item) {
  if (item === 'left') {
    const artworkUrl = `/taste-nft/#artwork/${id.value}`;
    window.open(artworkUrl, '_blank');
  } else if (item === 'center') {
    toast('Скопировано в буфер обмена!')
  }
}

function toggleDropdown(index) {
  isDropdownOpen.value[index] = !isDropdownOpen.value[index];
}

</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

.hero {
  margin-bottom: 109px;
  position: relative;

  @include media-breakpoint-down(md) {
    margin-bottom: 340px;
  }

  @include media-breakpoint-down(sm) {
    margin-bottom: 120px;
  }

  &__wrapper {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    height: 519px;

    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__wrapper-left {
    max-width: 516px;
  }

  &__wrapper-right {
    max-width: 789px;

    @include media-breakpoint-down(my) {
      max-width: 581px;
    }

    @include media-breakpoint-down(md) {
      max-width: 579px;
    }

    @include media-breakpoint-down(sm) {
      max-width: 500px;
    }

    @include media-breakpoint-down(xs) {
      max-width: 344px;
    }

    @include media-breakpoint-down(xxs) {
      max-width: 300px;
    }
  }
}
.nft-info {
  &__button-vue {
    padding: 12px 32px;
    @include media-breakpoint-down(xs) {
      padding: 12px 5px;
    }
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__bottom-buttons {
    display: flex;
    gap: 9px;
  }

}

.small-button {
  svg {
    width: 20px;
    height: 20px;
  }
}

.user-info {

  &__info-name {
    font-weight: 700;
    font-size: 18px;
  }

  &__image-img {
    width: 49px;
    height: 49px;

    img {
      width: 100%;
    }
  }

  &__info-user-name {
    font-weight: 500;
    font-size: 14px;
    background: linear-gradient(270deg, #8743ff 90%, #d8c2ff 100%);
    background-clip: text;
    color: transparent;
  }

  &__hero-wrapper {
    gap: 12px;
    margin-bottom: 20px;
  }
}

.nft-cards {
  margin-bottom: 82px;

  &__dropdowns {
    display: flex;
    gap: 12px;
    margin-bottom: 23px;

    @include media-breakpoint-down(md) {
      justify-content: center;
    }

    @include media-breakpoint-down(xxs) {
      flex-direction: column;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    justify-content: center;

  }
}

.featured {
  padding-bottom: 80px;

  &__title {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 27px;
  }
}

.filtered-cards {
  width: 100%;
  top: -39px;
  left: 0;
  transform: none;
  padding: 30px 5px;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    justify-content: center;

    h1 {
      font-weight: 700;
      font-size: 24px;
    }


  }

  &__button {
    margin-top: 24px;
    text-align: center;
  }

}

.dropdown {
  &__list {
    position: absolute;
    top: 46px;
    z-index: 2;
    background: #1D2228;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 15px 30px 0 rgba(20, 102, 204, 0.16);
    width: fit-content;
    padding: 12px 24px;
    font-weight: 700;
    font-size: 14px;
    left: 0;
    text-align: center;

    li {
      margin-top: 6px;
    }
  }
}
</style>

