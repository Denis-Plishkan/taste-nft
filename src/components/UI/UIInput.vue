<template>
  <div class="input">
    <svg>
      <use href="#search-icon"></use>
    </svg>
    <input type="text" placeholder="Search for ...">
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

@import "@/assets/media-breakpoints.scss";

  input {
    background: #1D2228;
    color: #fff;
    border-radius: 12px;
    height: 34px;
    padding: 0 40px;
    width: 100%;
    font-family: Raleway;
    font-weight: 600;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);

    @include media-breakpoint-down(xs) {
      padding: 0 15px;
    }
  }

  .input {
    width: 100%;
    position: relative;

    svg {
      width: 15px;
      height: 15px;
      position: absolute;
      top: 8px;
      left: 12px;

      @include media-breakpoint-down(xs) {
        display: none;
      }
    }
  }
</style>
