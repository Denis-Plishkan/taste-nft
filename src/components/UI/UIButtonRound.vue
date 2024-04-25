<template>
  <button class="button-round">
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style lang="scss">
  .button-round {
    border-radius: 99px;
    width: 32px;
    height: 32px;
    background: #fff;
    position: relative;

    svg {
      width: 18px;
      height: 18px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>