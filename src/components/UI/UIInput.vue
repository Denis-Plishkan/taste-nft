<template>

  <input v-if="props.modelValue === undefined" :type="type" :placeholder="placeholder">
  <div v-else class="input__input">
    <BaseSvg :id="'search-icon'"/>
    <input class="input__ui-input"
             :type="'text'"
             :placeholder="'Search for ...'"
             @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import BaseSvg from "@/components/Base/BaseSvg.vue";

const props = defineProps(['type', 'placeholder', 'modelValue']);


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

.input {
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
