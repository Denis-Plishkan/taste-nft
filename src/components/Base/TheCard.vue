<template>
  <router-link class="card__link" :to="{ path: `/artwork/${props.card.id}` }" @click="scrollToTop">
  <div class="card">
    <div class="card__img">
      <PictureComponent :srcset="props.card.img.webp"  :src="props.card.img.default" :alt="'nft'" />
      <div class="card__img-info-card">
        <UserInfo v-if="isProfilePage" :is-card="true" class="card__wrapper-user-state">
          <template v-slot:state>
            <p :class="colorState(props.card.state)">{{ props.card.state }}</p>
          </template>
        </UserInfo>
        <UserInfo v-else class="card__wrapper-user-info">
          <template v-slot:image>
            <div class="card__wrapper-image">
              <PictureComponent class="card__img-image" :srcset="getUserById().img.webp"  :src="getUserById().img.default" :alt="'user'" />
            </div>
          </template>
          <template v-slot:info-name>
            <p class="card__info-name-black">{{ getUserById().user }}</p>
          </template>
          <template v-slot:info-user-name>
            <p class="card__info-user-name">@{{ getUserById().userName }}</p>
          </template>
        </UserInfo>
      </div>
      <div v-if="isProfilePage" class="card__info-button-wrapper">
        <UIButtonRound v-for="item in buttonsArray" :key="item" @click.prevent="showButtons(props.card.state)" :class="{ 'active': buttonsOpen && item === 'button-settings' }">
          <BaseSvg :id="item"></BaseSvg>
        </UIButtonRound>
      </div>
    </div>
    <div class="card__info">
      <h4 class="card__info-name">
        {{ props.card.name }}
      </h4>
      <div class="card__info-sold-wrapper">
        <p class="card__info-sold-text">Sold for:</p>
        <p class="card__info-sold-current">
          <PictureComponent :srcset="logoCardSrcset"  :src="logoCardSrc" :alt="'logo'"/>
          {{ props.card.sold }}
        </p>
      </div>
      <div class="card__info-ending-wrapper">
        <p class="card__info-ending-text">
          Ending in:
        </p>
        <p class="card__info-ending-time">
          {{ remainingTimes.id ? remainingTimes.id : 'loading...' }}
        </p>
      </div>
    </div>
  </div>
  </router-link>
</template>

<script setup>

import PictureComponent from "@/components/Base/PictureComponent.vue";
import UserInfo from "@/components/Reusable/UserInfo.vue";
import {users} from "@/dataBase.js";
import {useRoute} from "vue-router";
import UIButtonRound from "@/components/UI/UIButtonRound.vue";
import BaseSvg from "@/components/Base/BaseSvg.vue";
import {ref, onMounted} from "vue";

const logoCardSrc = new URL('../../assets/image/logo-card.png', import.meta.url);
const logoCardSrcset = new URL('../../assets/image/logo-card.webp', import.meta.url);

const route = useRoute();
const isProfilePage = route.path === '/profile';

const props = defineProps({
  card: Object,
  search: Object,
});

const buttonsArray = ref(["button-settings"]);
const remainingTimes = ref({});
let buttonsOpen = false;

const getId = (id) => () => users.find(item => item.id === id);

const getUserById = getId(props.card.userId);

function colorState(state) {
  if(state === 'Approved') {
    return "green";
  } else if (state === 'Declined') {
    return "red";
  } else if (state === 'On moderation') {
    return "yellow";
  }
}

function showButtons(state) {
  buttonsOpen = !buttonsOpen;
  if (state === "Approved") {
    buttonsArray.value = buttonsOpen ? ["button-settings"] : ["button-settings"];
  } else if (state === "Declined") {
    buttonsArray.value = buttonsOpen ? ["button-settings", "button-clock", "button-pencil", "button-basket"] : ["button-settings"];
  } else if (state === "On moderation") {
    buttonsArray.value = buttonsOpen ? ["button-settings", "button-clock"] : ["button-settings"];
  }
}

const startTimeKey = 'startTime';
let startTime = localStorage.getItem(startTimeKey) ? parseInt(localStorage.getItem(startTimeKey)) : Date.now();

onMounted(() => {
  Object.keys(props.card).forEach(cardId => {
    calculateRemainingTime(cardId);
  });
  localStorage.setItem(startTimeKey, startTime.toString());

});

function calculateRemainingTime(cardId) {
  let endingTimeString = props.card.ending.trim();

  if (!endingTimeString) {
    remainingTimes.value[cardId] = "Sale ended";
    return;
  }

  const [hours, minutes, seconds] = endingTimeString.split(' ').map(part => parseInt(part));

  let remainingMilliseconds = ((hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0)) * 1000;

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const adjustedTime = remainingMilliseconds - elapsedTime;

    if (adjustedTime <= 0) {
      remainingTimes.value[cardId] = "Sale ended";
      clearInterval(intervalId);
      return;
    }

    const h = Math.floor(adjustedTime / 3600000);
    const m = Math.floor(adjustedTime % 3600000 / 60000);
    const s = Math.floor(adjustedTime % 60000 / 1000);
    remainingTimes.value[cardId] = `${h}h ${m}m ${s}s`;

  }, 1000);

}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

.card {
  border: 1px solid #333940;
  cursor: pointer;
  width: 317px;
  @include media-breakpoint-down(sm) {
    width: 100%;
  }


  &__img {
    position: relative;

    img {
      width: 100%;
      max-height: 315px;
      @include media-breakpoint-down(sm) {
        max-height: 700px;
      }
    }
  }

  &__link {
    @include media-breakpoint-down(xs) {
      width: 100%;
    }
  }

  &__image-skeleton {
    border-radius: 8px;
    width: 26px;
    height: 26px;
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.15);
    background: #f2f2f2;
  }

  &__info-name-black  {
    font-weight: 700;
    font-size: 14px;
    color: #1d2228;
  }

  &__info-user-name {
    font-weight: 500;
    font-size: 12px;
    background: linear-gradient(270deg, #8743ff 90%, #d8c2ff 100%);
    color: transparent;
    background-clip: text;
  }

  &__img-info-card {
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.15);
    background: #fff;
    border-radius: 12px;
    width: fit-content;
    padding: 6px 8px;
    position: absolute;
    top: 12px;
    left: 13px;
  }

  &__info {
    padding: 25px 19px 17px 16px;
  }

  &__info-name {
    font-weight: 700;
    font-size: 20px;
    color: #fff;
  }

  &__info-button-wrapper {
    position: absolute;
    top: 21px;
    right: 17px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .active {
      opacity: 0.5;
    }
  }

  &__info-sold-wrapper, &__info-ending-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__info-sold-text, &__info-ending-text {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  &__info-ending-time {
    color: #fff;
    width: 96px;
  }

&__info-sold-current {
margin-right: 32px;
color: #fff;
}

&__info-name {
margin-bottom: 17px;
}

&__info-sold-wrapper {
margin-bottom: 15px;
}

&__wrapper-user-info {
gap: 8px;
}

&__wrapper-image {
width: 26px;
height: 26px;

img {
  width: 100%;
}
}
}

.green {
color: #86D084;
}

.red {
color: #FF5E54;
}

.yellow {
color: #FFBA09;
}
</style>