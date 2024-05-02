<template>
  <button class="button-show">
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style lang="scss" >
.button-show {

  border-radius: 12px;
  background: linear-gradient(270deg, rgba(135, 67, 255, 0.2) 0%, rgba(65, 54, 241, 0.2) 100%);
  padding: 12px 32px;


  p {
    font-weight: 700;
    font-size: 14px;
    background-image: linear-gradient(270deg, #8743ff 0%, #d8c2ff 100%);
    background-clip: text;
    color: transparent;
    opacity: 1;
  }

}

</style>