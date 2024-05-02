<template>
  <UserInfo class="dropdown-user__wrapper" @click="toggleUserDropdown">
    <template v-slot:image>
      <div v-if="users[0].img" class="dropdown-user__image-img dropdown-user__image-img_hidden">
        <PictureComponent :srcset="users[0].img.webp" :src="users[0].img.default" :alt="'user'"/>
      </div>
    </template>
    <template v-slot:info-name>
      <p class="dropdown-user__info-name dropdown-user__info-name_hidden">{{ users[0].user }}</p>
    </template>

    <template v-slot:info-user-name>
      <div class="dropdown-user__info-wrapper dropdown-user__info-wrapper_hidden">
        <p class="dropdown-user__info-user-name">@{{ users[0].userName }}</p>
        <p class="nft-info__bottom-sold nft-info__bottom-sold-wrapper">
          <span class="nft-info__bottom-sold_grey"> Balance:</span>
          <PictureComponent :srcset="logoSoldSrcset" :src="logoSoldSrc" :alt="'logo'" /> {{ cards[0].sold }}
        </p>
      </div>
    </template>
    <template v-slot:info-cross>
      <BaseSvg id="user-dropdown-cross" class="dropdown-user__cross-icon"/>
    </template>

  </UserInfo>

  <div class="dropdown-user__info" @click="toggleUserDropdown" v-if="isOpen">
    <UserInfo class="dropdown-user__wrapper">
      <template v-slot:image>
        <div v-if="users[0].img" class="dropdown-user__image-img">
          <PictureComponent :srcset="users[0].img.webp" :src="users[0].img.default" :alt="'user'"/>
        </div>
      </template>
      <template v-slot:info-name>
        <p class="dropdown-user__info-name">{{ users[0].user }}</p>
      </template>

      <template v-slot:info-user-name>
        <div class="dropdown-user__info-wrapper">
          <p class="dropdown-user__info-user-name">@{{ users[0].userName }}</p>
          <p class="nft-info__bottom-sold nft-info__bottom-sold-wrapper">
            <span class="nft-info__bottom-sold_grey"> Balance:</span>
            <PictureComponent :srcset="logoSoldSrcset" :src="logoSoldSrc" :alt="'logo'" /> {{ cards[0].sold }}
          </p>
        </div>
      </template>
      <template v-slot:info-cross>
        <BaseSvg id="user-dropdown-cross" class="dropdown-user__cross-icon" :class="{'dropdown-user__cross-icon_active' : isOpen}"></BaseSvg>
      </template>

    </UserInfo>
    <p class="dropdown-user__info-address">Address: 0c0xcx1cx606g4516x51g1...</p>
    <div class="dropdown-user__button-wrapper">
      <router-link :to="{path: `/profile`}">
        <button class="dropdown-user__button">My profile</button>
      </router-link>
      <button class="dropdown-user__button" @click="openBalanceSettings">Balance settings</button>
      <slot></slot>
    </div>
  </div>

</template>

<script setup>

import PictureComponent from "@/components/Base/PictureComponent.vue";
import UserInfo from "@/components/Reusable/UserInfo.vue";
import { users, cards } from "@/dataBase.js";
import BaseSvg from "@/components/Base/BaseSvg.vue";
import {ref} from "vue";
import { disableBodyScroll } from 'body-scroll-lock';

const logoSoldSrc = new URL('../../assets/image/logo-sold.png', import.meta.url);
const logoSoldSrcset = new URL('../../assets/image/logo-sold.webp', import.meta.url);

const togglePopup = defineEmits(["togglePopup", "cardSold"]);

const isOpen = ref(false);

function toggleUserDropdown() {
  isOpen.value = !isOpen.value
}

function openBalanceSettings() {
  togglePopup("update:openPopup");
  togglePopup("update:cardSold", cards[0].sold);
  disableBodyScroll();
}


</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

  .dropdown-user {

    &__wrapper {
      gap: 6px;
      position: relative;
      cursor: pointer;

      @include media-breakpoint-down(sm) {
        justify-content: space-between;
      }

      @include media-breakpoint-down(xxs) {
        gap: 0;
      }
    }

    &__info-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;

    }

    &__info-wrapper_hidden {
      @include media-breakpoint-down(sm) {
        display: none;
      }
    }

    &__cross-icon {
      width: 12px;
      height: 7px;
    }

    &__cross-icon_active {
      transform: rotate(180deg);
    }

    &__info {
      position: absolute;
      top: -12px;
      right: -12px;
      z-index: 2;
      box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
      background: #30363d;
      border-radius: 12px;
      padding: 12px;
    }

    &__info-address {
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 16px;
      margin-bottom: 10px;
    }

    &__button-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    &__button {
      background: transparent;
      font-weight: 600;
      font-size: 14px;
      line-height: 129%;
      color: #fff;
    }

    &__button-exit {
      font-weight: 600;
      font-size: 14px;
      line-height: 129%;
      color: #ff5e54;
      background: transparent;
    }

    &__info-name {
      font-weight: 700;
      font-size: 16px;
      color: #fff;
    }

    &__info-name_hidden {
      @include media-breakpoint-down(sm) {
        display: none;
      }
    }

    &__info-user-name {
      font-weight: 500;
      font-size: 12px;
      background: linear-gradient(270deg, #8743ff 90%, #d8c2ff 100%);
      background-clip: text;
      color: transparent;
    }

    &__image-img {
      width: 40px;
      height: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__image-img_hidden {
      @include media-breakpoint-down(xxs) {
        display: none;
      }
    }

  }
  .nft-info {
    &__bottom-sold-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
    }
    &__bottom-sold_grey {
      font-weight: 600;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }

  }
</style>