<template>
  <button class="button-text">
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style lang="scss">

.button-text {
  font-weight: 700;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
  background: transparent;

  &.active {
    color: #fff;
  }
}

</style>