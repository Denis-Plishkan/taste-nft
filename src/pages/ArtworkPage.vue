<template>
  <TheHeader @update-input-value="filterCards"/>
  <div class="container">
    <section class="artwork">
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
                  <PictureComponent :srcset="userSrcset" :src="userSrc" :alt="'user'"/>
                </div>
              </template>
              <template v-slot:info-name>
                <p class="user-info__info-name">{{ users[$route.params.id].user }}</p>
              </template>
              <template v-slot:info-user-name>
                <p class="user-info__info-user-name">@{{ users[$route.params.id].userName }}</p>
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
        <TheCard v-for="(card, index) in filteredCards.slice(0, 8)" :key="index" :card="card"/>
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
import {ref} from "vue";


const userSrc = new URL('../assets/image/users/user1.png', import.meta.url);
const userSrcset = new URL('../assets/image/users/user1.webp', import.meta.url);
const logoSoldSrc = new URL('../assets/image/logo-sold.png', import.meta.url);
const logoSoldSrcset = new URL('../assets/image/logo-sold.webp', import.meta.url);

const filteredCards = ref(cards);

function filterCards(value) {
  const query = value.toLowerCase();
  filteredCards.value = cards.filter(card => {
    return card.name.toLowerCase().includes(query)
  })
}



</script>

<style lang="scss">
.artwork {
  margin-bottom: 102px;

  &__img {
    width: 100%;
    height: 582px;
    position: relative;
    margin-bottom: 64px;

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