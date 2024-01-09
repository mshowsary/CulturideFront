
<template>
  <div>   
<!-- -->
<section class="section pb-0">
  <div class="container">    
    <div class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">
      <div class=" mb-4 mt-3 rounded-xl  p-4">
          <div class="flex justify-center  ">  
            <form @submit.prevent="searchForm">
              <input type="text" v-model="search" class="filter-btn filter-btn-active btn btn-sm" placeholder="Event, Artist" style="width:500px"/>
              <button type="submit" class="filter-btn btn btn-sm">Rechercher</button>          
            </form>
          </div>        
      </div>     
    </div> 
  </div>
</section>
<!-- SLIDER -->
<IndexSlider />
<!-- SLIDER -->
<section class="section pt-0">
  <div class="container">
    <div class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">
      <ul class="filter-list">  
        <li>
          <NuxtLink class="filter-btn filter-btn-active btn btn-sm" href="/listing/city/all">Tout</NuxtLink>
        </li>              
        <li v-for="city in cities">
          <NuxtLink class="filter-btn filter-btn-active btn btn-sm" :href="`/listing/city/${city.name.toLowerCase()}`">{{ city.name }}</NuxtLink>
        </li>                       
      </ul>
    </div>    
    <h2 class="h4 mb-4">Ne manquez pas</h2>
    <div class="featured-posts row">
      <div class="mb-8 md:col-6" v-for="event in homeEvents">
        <div class="card">
          <NuxtLink class="w-[100%]" :href="`/event/${event.id}/details`">
            <img
             class="card-img"
              width="235"
              height="304"
              :src="event.cover"
              alt=""
            />
           </NuxtLink>
          <div class="card-content">
            <div class="card-tags">
              <NuxtLink class="tag" :href="`/listing/type/${event.type.slug}`">{{ event.type.name }}</NuxtLink>
            </div>
            <h3 class="h4 card-title">
              <NuxtLink :href="`/event/${event.id}/details`">{{ event.name }}</NuxtLink>              
            </h3>
            <p v-html="event.description"></p>
            <div class="card-footer mt-6 flex space-x-4">
              <span class="inline-flex items-center text-xs text-[#666]">
                <Icon name="mdi:calendar-month" class="text-orange-500 mr-2" size="20px"/>
                {{ event.date }}
              </span>
              <span class="inline-flex items-center text-xs text-[#666]">
                <Icon name="material-symbols:nest-clock-farsight-analog-outline-rounded" class="text-orange-500 mr-2" size="20px"/>
                {{ event.time }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">
      <ul class="filter-list">        
          <li v-for="typ in types">
          <NuxtLink class="filter-btn filter-btn-active btn btn-sm" :href="`/listing/type/${typ.slug}`">{{ typ.name }}</NuxtLink>
          </li>
      </ul>
    </div>    
    <div class="row">
      <div class="mb-8 md:col-6 lg:col-4" v-for="event in allEvents">
        <div class="card">
          <NuxtLink :href="`/event/${event.id}/details`">
          <img
            class="card-img"
            width="335"
            height="210"
            :src="event.cover"
            alt=""
          />
        </NuxtLink>
          <div class="card-content">
            <div class="card-tags">
              <NuxtLink class="tag" :href="`/listing/type/${event.type.slug}`">{{ event.type.name }}</NuxtLink>
            </div>
            <h3 class="h4 card-title">
              <NuxtLink :href="`/event/${event.id}/details`">{{ event.name }}</NuxtLink>    
            </h3>
            <p v-html="event.description"></p>
            <div class="card-footer mt-6 flex space-x-4">
              <span class="inline-flex items-center text-xs text-[#666]">
                <Icon name="mdi:calendar-month" class="text-orange-500 mr-2" size="20px"/>
                {{ event.date }}
              </span>
              <span class="inline-flex items-center text-xs text-[#666]">
                <Icon name="material-symbols:nest-clock-farsight-analog-outline-rounded" class="text-orange-500 mr-2" size="20px"/>
                {{ event.time }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- -->
    
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  const search = ref('')


  useHead({
    title: 'CULTURIDE - ACCUEIL'
  })
  const {cities, homeEvents, types, allEvents} = await $fetch('http://127.0.0.1:8000/api/v1/home')

  async function searchForm(){    
    if(search.value != ''){
      await navigateTo(`/results?search=${encodeURI(encodeURI(search.value))}`)
    }    
  }
</script>