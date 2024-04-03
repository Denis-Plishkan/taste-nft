<template>
  <h3 class="nft-info__name">
    WFH - art name
  </h3>
  <p class="nft-info__description">
    Description: The iconic meme that became a viral Internet sensation and an indispensable part of the gachimuchi music genre. This was taken when I was very young and in my full "performance" attire. That part of me now "lives" on platforms like Twitch, YouTube, and Bilibili (B 站).
  </p>
  <slot></slot>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.nft-info {
  &__name {
    font-weight: 700;
    font-size: 32px;
  }

  &__description {
    font-weight: 500;
    font-size: 14px;
  }
}

</style>