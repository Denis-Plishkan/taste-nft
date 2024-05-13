<template>
  <div class="popup__wrapper">
    <div class="popup">
      <slot></slot>
    </div>
  </div>

</template>

<script setup>

</script>

<style lang="scss">

@import "@/assets/scss/media-breakpoints";

.popup__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #30363D;
  border-radius: 32px;
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  min-width: 653px;
  min-height: 300px;
  padding: 50px;
  z-index: 2;
  max-height: 80%;
  overflow: auto;


  @include media-breakpoint-down(sm) {
    height: 300px;
    overflow: auto;
    width: 90%;
    min-width: unset;
    padding: 32px 15px;
  }


  &__cross-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    cursor: pointer;
    right: 30px;
    top: 54px;

    @include media-breakpoint-down(sm) {
      top: 35px;
    }

    @include media-breakpoint-down(xxs) {
      right: 10px;
    }
  }

  &__text {
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
  }

  &__init-icon {
    position: relative;
    width: fit-content;
    margin: 0 auto;
    margin-top: 38px;
    margin-bottom: 25px;

    &:after {
      position: absolute;
      content: '';
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    svg {
      width: 34px;
      height: 34px;
    }
  }

  &__init-progress-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -48%);

    svg {
      width: 60px;
      height: 60px;
    }
  }

  &__init-text {
    font-family: Poppins;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
  }
}

.did-wallet {
  &__cards {
    display: flex;
    gap: 57px;
    margin-bottom: 32px;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__card {
    max-width: 160px;
  }

  &__card-num {
    position: relative;
    width: fit-content;
    font-weight: 700;
    font-size: 20px;
    color: #1f2b38;
    z-index: 1;
    left: 5px;
    top: 0;

    &:after {
      position: absolute;
      content: '';
      border-radius: 16px;
      width: 40px;
      height: 40px;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
      background: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
  }

  &__card-text {
    font-weight: 500;
    font-size: 14px;
    text-align: center;
  }

  &__card-video {
    border-radius: 16px;
    width: 160px;
    height: 90px;
    background: #c4c4c4;
    margin-bottom: 18px;

    svg {
      width: 9px;
      height: 12px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-31%, 4%);
      z-index: 1;
      cursor: pointer;
    }

    iframe {
      width: 625px;
      height: 259px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -40%);
      z-index: 2;

      @include media-breakpoint-down(sm) {
        width: 500px;
        height: 220px;

      }

      @include media-breakpoint-down(xs) {
        width: 300px;
      }

      @include media-breakpoint-down(xxs) {
        width: 273px;
        height: 210px;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
  }

  &__card-svg-container {
    position: relative;
    top: -48%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:after {
      position: absolute;
      content: '';
      width: 22px;
      height: 22px;
      background: rgba(0, 0, 0, 0.62);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      cursor: pointer;
    }
  }

  &__button {
    display: flex;
    margin: 0 auto;
    font-size: 14px;
    padding: 12px 28px;
  }
}

.popup::-webkit-scrollbar {
  display: none;
}
</style>