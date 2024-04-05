<template>
  <div class="container">
    <section class="hero">
      <div class="hero__wrapper">
        <div class="hero__wrapper-left">
          <UserInfo class="user-info__hero-wrapper">
            <template v-slot:image>
              <div class="user-info__image-img">
                <PictureComponent :srcset="userSrcset"  :src="userSrc" :alt="'user'"/>
              </div>
            </template>
            <template v-slot:info-name>
              <p class="user-info__info-name">User Name</p>
            </template>
            <template v-slot:info-user-name>
              <p class="user-info__info-user-name">@username</p>
            </template>
          </UserInfo>
          <NftInfo>
            <div class="nft-info__bottom">
              <p class="nft-info__bottom-sold">
                Sold for: <PictureComponent :srcset="logoSoldSrcset"  :src="logoSoldSrc" :alt="'logo'" /> 1,5M
              </p>
              <div class="nft-info__bottom-buttons nft-info__button">
                <UIButton class="nft-info__button-vue">View</UIButton>
                <UISmallButton>
                  <BaseSvg :id="'left'"/>
                </UISmallButton>
                <UISmallButton>
                  <BaseSvg :id="'center'"/>
                </UISmallButton>
                <UISmallButton>
                  <BaseSvg :id="'right'"/>
                </UISmallButton>
              </div>
            </div>
          </NftInfo>
        </div>
        <div class="hero__wrapper-right">
          <SwiperNft :cards="cards"/>
        </div>
      </div>
    </section>

    <section class="nft-cards">
      <div class="nft-cards__dropdowns">
        <UIDropdown>Recently added</UIDropdown>
        <UIDropdown>Auctions</UIDropdown>
      </div>

      <div class="nft-cards__wrapper">
        <TheCard v-for="(card, index) in cards" :key="index" :card="card" :user="card.user">
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
import { cards } from "@/dataBase.js";
import SwiperNft from "@/components/Reusable/SwiperNft.vue";
import SwiperUser from "@/components/Reusable/SwiperUser.vue";
import UIDropdown from "@/components/UI/UIDropdown.vue";

const userSrc = new URL('../assets/image/users/user1.png', import.meta.url);
const userSrcset = new URL('../assets/image/users/user1.webp', import.meta.url);
const logoSoldSrc = new URL('../assets/image/logo-sold.png', import.meta.url);
const logoSoldSrcset = new URL('../assets/image/logo-sold.webp', import.meta.url);

</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

.hero {
  margin-bottom: 109px;

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

</style>

