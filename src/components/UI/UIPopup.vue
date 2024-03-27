<template>
  <div class="popup">

    <slot></slot>

  </div>

</template>

<script setup>

</script>

<style lang="scss">
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #30363D;
  border-radius: 32px;
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  padding: 45px 28px 28px 30px;
  min-width: 653px;

  &__cross-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 48px;
    right: 34px;
    cursor: pointer;
  }

  &__text {
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    margin-bottom: 22px;
  }

  &__init-icon {
    position: relative;
    width: fit-content;
    margin: 0 auto;
    margin-top: 28px;
    margin-bottom: 28px;

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
    margin-bottom: 12px;

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
  }

  &__card-svg-container {
    position: relative;
    top: 50%;
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
  }
}
</style>