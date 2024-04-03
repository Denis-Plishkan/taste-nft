<template>
  <div class="container">
    <section class="hero">
      <div class="hero__wrapper">
        <div class="hero__wrapper-left">
          <UserInfo class="user-info__hero-wrapper">
            <template v-slot:image>
              <div class="user-info__image-img">
                <PictureComponent :srcset="'/taste-nft/src/assets/image/users/user1.webp'"  :src="'/taste-nft/src/assets/image/users/user1.png'" :alt="'user'"/>
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
                Sold for: <PictureComponent :srcset="'/taste-nft/src/assets/image/logo-sold.webp'"  :src="'/taste-nft/src/assets/image/logo-sold.png'" :alt="'logo'" /> 1,5M
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
          <SwiperNft/>
        </div>
      </div>
    </section>

    <section class="nft-cards">
      <div class="nft-cards__wrapper">
        <TheCard v-for="(card, index) in cards" :key="index" :card="card" :user="card.user">
        </TheCard>
      </div>
    </section>

    <section class="featured">
      <UserCard v-for="(card, index) in cards" :key="index" :user="card.user"/>
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
import UserCard from "@/components/Reusable/UserCard.vue";

</script>

<style lang="scss">
.hero {
  &__wrapper {
    display: flex;
    align-items: flex-end;
    height: 519px;
  }

  &__wrapper-left {
    max-width: 516px;
  }

  &__wrapper-right {
    max-width: 700px;

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
    gap: 12px;
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
  }
}

.nft-cards {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    justify-content: center;

  }
}

</style>

