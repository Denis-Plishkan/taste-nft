<template>
  <input :type="type" :placeholder="placeholder">
</template>

<script setup>
defineProps(['type', 'placeholder'])
</script>

<style lang="scss" scoped>

@import "@/assets/scss/media-breakpoints";

  input {
    background: #1D2228;
    color: #fff;
    border-radius: 12px;
    height: 40px;
    padding: 0 40px;
    width: 100%;
    font-family: Raleway;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);

    @include media-breakpoint-down(xs) {
      padding: 0 15px;
    }
  }

</style>
