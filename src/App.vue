<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SvgManager from "@/components/Base/SvgManager.vue";
import TheHeader from "@/components/Base/TheHeader.vue";

</script>

<template>
  <TheHeader></TheHeader>

  <RouterView />
  <SvgManager/>
</template>

<style>

</style>
