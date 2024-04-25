<template>

  <input v-if="props.modelValue === undefined" :type="type" :placeholder="placeholder">
  <div v-else class="input__input">
    <BaseSvg class="input__input-search-svg" :id="'search-icon'"/>
    <input class="input__ui-input"
             :type="'text'"
             :placeholder="'Search for ...'"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="input__input-clear" @click="clearInput">
      <BaseSvg class="input__input-clear-svg" :id="'input-cross'"/>
      <p> Clear</p>
    </div>
  </div>
</template>

<script setup>
import BaseSvg from "@/components/Base/BaseSvg.vue";

const props = defineProps(['type', 'placeholder', 'modelValue']);
const emits = defineEmits(['update:modelValue', 'clearInput']);


function clearInput() {
  emits('clearInput');
}

</script>

<style lang="scss">

@import "@/assets/scss/media-breakpoints";

  input {
    background: #1D2228;
    color: #fff;
    border-radius: 12px;
    height: 40px;
    padding: 0 80px 0 40px;
    width: 100%;
    font-family: Raleway;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);

    @include media-breakpoint-down(xs) {
      padding: 0 40px 0 15px;
    }
  }

.input {
  &__input {
    width: 100%;
    position: relative;
  }

  &__input-search-svg {

      width: 15px;
      height: 15px;
      position: absolute;
      top: 12px;
      left: 12px;

      @include media-breakpoint-down(xs) {
        display: none;

    }
  }

  &__input-clear {
    position: absolute;
    right: 16px;
    top: 14px;
    display: flex;
    gap: 5px;
    cursor: pointer;

    p {
      font-weight: 600;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);

      @include media-breakpoint-down(xs) {
        display: none;
      }
    }

  }

  &__input-clear-svg {
    width: 11px;
    height: 11px;
  }


  &__ui-input {
    font-size: 12px;
  }
}


</style>
