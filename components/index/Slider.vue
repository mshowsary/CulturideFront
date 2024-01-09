<template>
    <!-- SLIDER -->
    <section class="section pb-0 pt-0">
        <div class="container">
            <Swiper
                :modules="[SwiperAutoplay, SwiperEffectCreative]"
                :slides-per-view="1"
                :loop="true"
                :effect="'creative'"
                :autoplay="{
                delay: 8000,
                disableOnInteraction: true,
                }"
                :creative-effect="{
                prev: {
                    shadow: false,
                    translate: ['-20%', 0, -1],
                },
                next: {
                    translate: ['100%', 0, 0],
                },
                }">
                <SwiperSlide  v-for="(photo, id) in slider" :key="id">
                    <img :src="photo" height=""/>
                </SwiperSlide>
                <IndexSliderControls/>                
            </Swiper>   
        </div>     
    </section>
    <!-- /SLIDER -->
</template>
<script setup>
  const {slider} = await $fetch('http://127.0.0.1:8000/api/v1/slider')
</script>