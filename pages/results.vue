<template>
    <section class="section pb-0">
    <div class="container">    
        <div class="category-filter mt-3 rounded-xl bg-[#EEEEEE] px-4">
        <div class="mt-3 rounded-xl  p-4">
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
    <template v-if="list.events.data.length > 0"> 
        <section class="section">
            <div class="container">            
                <div class="row">
                <div class="mb-8 md:col-6 lg:col-4" v-for="event in list.events.data">
                    <div class="card">
                    <NuxtLink :href="`/event/${event.id}/details`">
                    <img
                        class="card-img"
                        width="335"
                        height="210"
                        :src="event.cover.url"
                        alt=""/>
                    </NuxtLink>
                    <div class="card-content">
                        <div class="card-tags">
                        <span class="tag" :href="`/listing/type/${event.type.slug}`">{{ event.type.name }}</span>
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
                <LayoutAppPaginator :links="list.events.links" :path="path" :currentPage="page" @change="refetch"/>
            </div>
        </section>
    </template>
    <section class="section" v-else >
        <div class="container">
            <div class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">        
            <div class=" mb-4 mt-3 rounded-xl p-8">
                <div class="flex justify-center "> 
                    <span class="text-xl text-gray-500">
                        Aucun résultat n'a été trouvé pour votre recherche
                    </span>
                </div>
            </div>
            <div class=" mb-4 mt-3 rounded-xl p-8">
                <ul class="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5">
                    <li v-for="mn in menu">
                    <span class="font-bold pb-8">
                        {{ mn.name }}
                    </span>
                    <template v-if="mn.types.length > 0">
                        <ul class="pt-8">
                        <li v-for="type in mn.types">            
                            <NuxtLink :to="`/listing/type/${type.slug}`">{{ type.name }}</NuxtLink>
                        </li>
                        </ul>
                    </template>
                    </li>
                </ul>
            </div>
        </div>                
        </div>
    </section>
  </template>
  <script setup>
    import {reactive, ref, computed} from 'vue'
    const route = useRoute()
    useHead({
    title: 'CULTURIDE - SEARCH RESULTS'
    })
    const search = ref(route.query.search ?? '')

    const {events, selectedCity, menu} = await $fetch(`http://127.0.0.1:8000/api/v1/events/search${'?search='+route.query.search}${route.query.city ? '&city='+route.query.city:''}${route.query.page ? '&page='+route.query.page:''}`)
    const list = reactive({events})    

    const selectCity =  ref(selectedCity)
    const page = ref(route.query.page ?? 1)
  
    const path = computed(() => `/results${'?search='+route.query.search}${route.query.city ? '&city='+route.query.city:''}&`)
  
    onBeforeRouteUpdate(async(route) => {

      const {events, selectedCity} = await $fetch(`http://127.0.0.1:8000/api/v1/events/search${'?search='+route.query.search}${route.query.city ? '&city='+route.query.city:''}${route.query.page ? '&page='+route.query.page:''}`)
  
      list.events = events
      selectCity.value = selectedCity
        
      page.value = route.query.page ?? 1    
    })
  
    async function eventsByCity(event){
      const city = event.target.value     

        if(city.toLowerCase() != 'all') {
          await navigateTo({
                  path: `/results`,
                  query: {
                    search:route.query.search,
                    city: city.toLowerCase(),
                  }
                })
            
        }else{
            await navigateTo({
                  path: `/results`,
                  query: {
                    search:route.query.search                    
                  }
                })
        }      
    }
    
    function refetch(pg){  
      page.value = pg 
    }

  async function searchForm(){    
    if(search.value != ''){
      await navigateTo(`/results?search=${encodeURI(encodeURI(search.value))}`)
    }    
  }
  </script>