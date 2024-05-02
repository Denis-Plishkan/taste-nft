<template>
  <div class="dropdown" @click="toggleDropdown">
    <slot></slot>
    <BaseSvg :id="'dropdown-arrow'" :class="{'dropdown__arrow_active': isOpen}"/>
  </div>
</template>

<script setup>
import BaseSvg from "@/components/Base/BaseSvg.vue";
import { ref } from "vue";

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
}

</script>

<style lang="scss">
  .dropdown {
    display: flex;
    align-items: center;
    gap: 6px;
    width: fit-content;
    padding: 12px 24px;
    font-weight: 700;
    font-size: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 99px;
    box-shadow: 0 15px 30px 0 rgba(20, 102, 204, 0.16);
    cursor: pointer;
    position: relative;

    svg {
      width: 8px;
      height: 4px;
    }

    &__arrow_active {
      transform: rotate(180deg);
    }
  }
</style>