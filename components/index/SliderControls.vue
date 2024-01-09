<script setup lang="ts">
  const swiper = useSwiper()
</script>
<template>
 <button @click="swiper.slideNext()"><div class="swiper-button-next"></div></button>  
  <button @click="swiper.slidePrev()"><div class="swiper-button-prev"></div></button>
</template>