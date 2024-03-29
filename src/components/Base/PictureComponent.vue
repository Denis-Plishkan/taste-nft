<template>
  <picture>
    <source :srcset="srcset" type="image/webp" />
    <img :src="src"  />
  </picture>
</template>

<script setup>

import {ref} from "vue";

const props = defineProps({
  srcset: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '',
  }

})

const src = ref(new URL(`${props.src}`, import.meta.url));
const srcset = ref(new URL(`${props.srcset}`, import.meta.url))
</script>