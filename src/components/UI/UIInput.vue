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
  input {
    background: #1D2228;
    color: #fff;
    border-radius: 12px;
    height: 32px;
    padding: 0 40px;
    width: 100%;

    @media(max-width: 576px) {
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
    }
  }
</style>
