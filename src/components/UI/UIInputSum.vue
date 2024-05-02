<template>
  <p>{{props.text}}</p>
  <div class="artwork-third__form-sum-input popup__input">
    <input type="number"  v-model="inputValue" @input="limitInput" placeholder="1000000">
    <slot></slot>
    <p>{{props.sum}}</p>
    <p class="artwork-third__form-input-text" :class="{'taste' : props.inputText === 'TASTE'}">{{props.inputText}}</p>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    text: String,
    sum: String,
    inputText: String,
  })

const inputValue = ref('');

function limitInput() {
  let stringValue = inputValue.value.toString();
  if (stringValue.length > 10) {
    inputValue.value = parseInt(stringValue.slice(0, 10));
  }
}


</script>

<style lang="scss">
@import "@/assets/scss/media-breakpoints";

.popup {
  &__input {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}

.taste {
  @include media-breakpoint-down(xxs) {
    left: 120px !important;
  }

}


</style>