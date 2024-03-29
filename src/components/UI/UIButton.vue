<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>

  .button {
    background: linear-gradient(270deg, #8743ff 0%, #4136f1 100%);
    border-radius: 12px;
    box-shadow: 0 15px 30px 0 rgba(20, 102, 204, 0.16);
    font-weight: 700;
    color: #fff;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    @media(max-width: 576px) {
      padding: 8px;
    }

  }

</style>