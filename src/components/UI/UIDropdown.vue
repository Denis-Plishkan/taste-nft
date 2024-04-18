<template>
  <div class="dropdown">
    <slot></slot>
    <BaseSvg :id="'dropdown-arrow'"/>
  </div>
</template>

<script setup>
import BaseSvg from "@/components/Base/BaseSvg.vue";

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
  }
</style>