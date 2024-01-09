<template>
  <section class="section  pb-0">
    <div class="container">    
        <div class="category-filter mt-3 rounded-xl bg-[#EEEEEE] px-4">
          <div class="mt-3 rounded-xl p-4">
              <div class="flex justify-center">
                <span class="filter-btn  btn btn-sm">Ville : </span>                     
                  <select class="filter-btn filter-btn-active btn btn-sm" style="width:500px" @change="eventsByCity">
                    <option value="all" selected="(all == selectCity) ? true:false">Tout</option>
                    <option v-for="cty in cities" :value="cty.name" :selected="(cty.id == selectCity) ? true:false">{{ cty.name }}</option>
                  </select>
              </div>
          </div> 
        </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
        <template v-if="list.events.data.length > 0">
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
      </template>   
      <div v-else class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">        
        <div class=" mb-4 mt-3 rounded-xl p-8">
          <div class="flex justify-center "> 
            <span class="text-xl text-gray-500">Pas d'événements {{ cityName ?  'à '+cityName:''}}</span>
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
    title: `CULTURIDE - LISTING ${route.params.param? route.params.name:''} ${route.query.city ?? ''} `
    }) 
  const {events, cities, selectedCity} = await $fetch(`http://127.0.0.1:8000/api/v1/events/${route.params.param ?? ''}/${route.params.name ?? ''}${route.query.city ? '?city='+route.query.city:''}${route.query.city ? '&':'?'}${route.query.page ? 'page='+route.query.page:''}`)
  const list = reactive({events})

  const selectCity =  ref(selectedCity)
  const page = ref(route.query.page ?? 1)

  const path = computed(() => `/listing/${route.params.param ?? ''}/${route.params.name ?? ''}${route.query.city ? '?city='+route.query.city:''}${route.query.city ? '&':'?'}`)
  const cityName = computed( () => (route.params.param=='city')? route.params.name:(route.query.city ?? ''))

  onBeforeRouteUpdate(async(route) => { 

    const {events, selectedCity} = await $fetch(`http://127.0.0.1:8000/api/v1/events/${route.params.param ?? ''}/${route.params.name ?? ''}${route.query.city ? '?city='+route.query.city:''}${route.query.city ? '&':'?'}${route.query.page ? 'page='+route.query.page:''}`)

    list.events = events
    selectCity.value = selectedCity

    page.value = route.query.page ?? 1    
  })

  async function eventsByCity(event){
    const city = event.target.value
    
    if(route.params.param == 'city'){      
      await navigateTo(`/listing/city/${city.toLowerCase()}`)
    }else if(route.params.param == 'type'){ 
      if(city.toLowerCase() != 'all') {
        await navigateTo({
                path: `/listing/type/${route.params.name}`,
                query: {
                  city: city.toLowerCase(),                  
                }
              })
          
      }else await navigateTo(`/listing/type/${route.params.name}`)
    }  
  }

  function refetch(pg){  
    page.value = pg 
  }
</script>