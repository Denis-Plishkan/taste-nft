<template>
  <div class="user-info__wrapper">
    <div class="user-info__image">
      <slot name="image"></slot>
    </div>
    <div class="user-info__info">
      <slot name="info-name"></slot>
      <slot name="info-user-name"></slot>
    </div>
    <div class="user-info__authorization">
      <slot name="info-cross"></slot>
    </div>
    <div v-if="isCard" class="user-info__state">
      <slot name="state"></slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  isCard: Boolean,
})

</script>

<style lang="scss" >
@import "@/assets/scss/media-breakpoints";

.user-info {
  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 6px;

  }

  &__state {
    font-weight: 600;
    font-size: 16px;
    padding: 9px;
  }
}
</style>