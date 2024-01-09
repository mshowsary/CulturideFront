<template>
  <section class="page-hero pt-16 pb-6">
  <div class="container">
    <div class="text-center">
      <ul
        class="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2"
      >
        <li class="leading-none text-dark">
          <NuxtLink class="inline-flex items-center text-primary" href="/">
            <svg
              class="mr-1.5"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z"
                fill="black"
              />
            </svg>
            <span class="text-sm leading-none">ACCUEIL</span>
          </NuxtLink>
        </li>
        <li class="leading-none text-dark">
          <span class="text-sm leading-none">/ ARTISTES</span>
        </li>
      </ul>
    </div>
    <div class="page-hero-content mx-auto max-w-[768px] text-center">
      <h1 class="mb-5 mt-8">
        ARTISTES        
      </h1>
      <p class="mt-4">
          Choisir l'artiste pour voir ses événements 
        </p>
    </div>
  </div>
</section>
<!-- ./end floating assets -->

<!-- Common hero -->
<!-- Slider main container -->


<!-- end Common hero -->
<section class="section pb-0 pt-0">
  <div class="container">
    <div class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">
      <ul class="filter-list">
        <li v-for="tag in tags">
          <NuxtLink :href='`/artists?tag=${tag.slug}`' class="filter-btn filter-btn-active btn btn-sm cursor" :class="(tag.slug==slug)? 'active':''">{{ tag.name }}</NuxtLink>          
        </li>                               
      </ul>
    </div> 
    </div>
    </section>
<section class="section pt-0">
  <div class="container">
    <div class="row mt-12 justify-center" v-if="list.artists.data?.length > 0">
      <div class="lg:col-10">
        <div class="row">
          <div class="mb-10 flex flex-col px-6 text-center sm:col-6 lg:col-4 sm:items-center" v-for="artist in list.artists.data">
            <div class="member-avatar inline-flex justify-center">              
              <NuxtLink :href="`/artist/${artist.slug}/events`">
                <NuxtImg class="rouded-full h-28 w-28 radius" :src="artist.photo.preview_url" alt="" />
              </NuxtLink>              
            </div>
            <div class="mt-6 w-full flex-1 rounded-xl bg-white py-8 px-4 shadow-lg">
              <h5 class="font-primary"><NuxtLink class="filter-btn btn btn-sm" :href="`/artist/${artist.slug}/events`">{{ artist.name }}</NuxtLink></h5>
              
            </div>
          </div>
          <LayoutAppPaginator :links="list.artists.links" :path="path" :currentPage="page" @change="refetch"/>
        </div>        
      </div>
    </div>
    <div v-else class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">
              <div class=" mb-4 mt-3 rounded-xl p-4">
                <div class="flex justify-center  "> 
                  <span class="text-xl text-gray-500">Pas d'artists</span>
                </div>
              </div>
            </div>
  </div>
</section>
  </template>
<script setup>
  import {reactive, ref, computed} from 'vue'  
  const route = useRoute()  
  useHead({
    title: `CULTURIDE - ARTISTS`
  })
    
     const path = computed(() => `/artists${route.query.tag ? '?tag='+route.query.tag:''}${route.query.tag ? '&':'?'}`)

  const {artists,tags}  = await $fetch(`http://127.0.0.1:8000/api/v1/artists${route.query.tag ? '/'+route.query.tag:''}${route.query.page ? '?page='+route.query.page:''}`);
  const list = reactive({artists})
  
  const page = ref(route.query.page ?? 1) 
  const slug = ref(route.query.tag ?? 'all') 


  onBeforeRouteUpdate(async(route) => {
  const {artists} = await $fetch(`http://127.0.0.1:8000/api/v1/artists${route.query.tag ? '/'+route.query.tag:''}${route.query.page ? '?page='+route.query.page:''}`);  

  list.artists = artists  

  page.value = route.query.page ?? 1
  slug.value = route.query.tag ?? 'all'
})

function refetch(pg){  
    page.value = pg 
  }
</script>
<style scoped>
.radius{
  border-radius:50%;
}
.cursor{
  cursor: pointer;
}
.active{
  color: #FF3D34 !important;
}
</style>