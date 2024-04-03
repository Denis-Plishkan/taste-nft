<template>
  <div class="header__input">
    <BaseSvg :id="'search-icon'"/>
    <UIInput class="header__ui-input" :type="'text'" :placeholder="'Search for ...'"/>
  </div>
</template>

<script setup>
import BaseSvg from '@/components/Base/BaseSvg.vue';
import UIInput from "@/components/UI/UIInput.vue";

</script>

<style lang="scss" scoped>

@import "@/assets/scss/media-breakpoints";

.header {
  &__input {
    width: 100%;
    position: relative;

    svg {
      width: 15px;
      height: 15px;
      position: absolute;
      top: 12px;
      left: 12px;

      @include media-breakpoint-down(xs) {
        display: none;
      }
    }
  }

  &__ui-input {
    font-size: 12px;
  }

}
</style>