<template>
  <button class="small-button" v-for="item in buttonArray" :key="item" @click="currentButton(item)">
    <BaseSvg :id="item"/>
  </button>
</template>

<script setup>
import BaseSvg from "@/components/Base/BaseSvg.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
  id: Number,
});

const buttonArray = ['left', 'center', 'right'];

function currentButton(item) {
  if (item === 'left') {
    const artworkUrl = `/taste-nft/#artwork/${props.id}`;
    window.open(artworkUrl, '_blank');
  } else if (item === 'center') {
    toast('Скопировано в буфер обмена!')
  }
}

</script>

<style lang="scss">
.small-button {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  background: transparent;

}

</style>