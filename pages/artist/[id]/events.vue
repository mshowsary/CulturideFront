<template>
  <section class="section" v-if="status == 404">
  <div class="container">
    <div class="mt-14 rounded-xl bg-white px-6 py-10 shadow-lg lg:px-12 lg:py-16">
      <div class="category-filter mb-8 mt-8 rounded-xl  px-4">
        <div class=" mb-4 mt-3 rounded-xl p-4">
          <div class="flex justify-center  "> 
            <span class="text-xl text-red-500">404 Page non trouvée</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>   
  <template v-else>
    <section class="section pb-0">  
    <div class="container">    
      <div class="featured-posts row">
        <div class="mb-8 md:col-12">
          <div class="card">
            <NuxtImg
              class="card-img radius"
              width="235"
              height="304"
              :src="artist.photo"
              alt=""
            />
            <div class="card-content"> 
              <h3 class="h4 card-title">
                <span>{{ artist.name }}</span>              
              </h3>
              <p v-html="artist.description"></p>
              <div class="flex justify-between">
                <div class="card-footer mt-6 flex space-x-4">
                  <NuxtLink class="inline-flex items-center text-l text-[#666]" :href="artist.facebook ?? '#'" :target="artist.facebook? '_blank': ''">
                    <Icon name="ic:baseline-facebook" color="black" size="40px"/>                  
                  </NuxtLink>
                  <NuxtLink class="inline-flex items-center text-l text-[#666]" :href="artist.twitter" target="_blank">
                    <Icon name="mdi:twitter" color="black" size="40px" />                  
                  </NuxtLink>
                  <NuxtLink class="inline-flex items-center text-l text-[#666]" :href="artist.instagram" target="_blank">
                    <Icon name="ri:instagram-fill" color="black" size="40px" />                  
                  </NuxtLink>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>  
  <section class="section pt-0 pb-0">
    <div class="container">    
        <div class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">
          <div class=" mb-4 mt-3 rounded-xl p-4">
              <div class="flex justify-center  ">
                <span class="filter-btn  btn btn-sm">Ville : </span>            
                  <select class="filter-btn filter-btn-active btn btn-sm" style="width:500px" @change="eventsByCity">
                    <option value="0">Tout</option>
                    <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
                  </select>
              </div>
          </div> 
        </div>
    </div>
  </section>
  <section class="section pt-0">
    <div class="container">
        <template v-if="list.events.length > 0">
          <div class="row">
            <div class="mb-8 md:col-6 lg:col-4" v-for="event in list.events">
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
      </template>   
      <div v-else class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">
        <div class=" mb-4 mt-3 rounded-xl p-8">
          <div class="flex justify-center  "> 
            <span class="text-xl text-gray-500">Pas d'événements {{ city[0]?.id > 0 ? `à ${city[0].name}`: '' }}</span>
          </div>
        </div>
      </div>            
      </div>   
  </section>
  </template> 
</template>
  <script setup>
  import {reactive, ref} from 'vue'
  const route = useRoute()
  const {status , artist, events, cities} = await $fetch(`http://127.0.0.1:8000/api/v1/artist/${route.params.id}/events`)
  const list = reactive({events})
  const city = ref('')
  
  useHead({
    title: `CULTURIDE - ARTISTE - ${route.params.id} `
  })

  function eventsByCity(event){
    const city_id = event.target.value
    
    list.events = events.filter(event => event.city_id == city_id)
    if (city_id == 0) list.events = events
    city.value = cities.filter(city => city.id == city_id)
  }

  </script>

<style scoped>
.radius{
  border-radius:50%;
}
</style>