<template>
  <slot></slot>
</template>

<script setup>


</script>

<style lang="scss">
.nft-info {
  &__name {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 20px;
    height: 35px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  &__description {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 14px;
    line-height: 129%;
    height: 72px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;

    span {
      color: rgba(255, 255, 255, 0.5);;
    }
  }
}

</style>