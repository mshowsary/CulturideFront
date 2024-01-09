<template>
      <LayoutAppDashboardBar />
     <section class="section pt-0">
     <div class="container">
       <div class="row mt-12" v-if="list.tickets.data.length > 0">
         <div class="mb-8 md:col-6" v-for="ticket in list.tickets.data">
           <div class="rounded-xl bg-white p-5 shadow-lg lg:p-10">
            <div class="flex">                
                <p class="mr-4">
                    <QrcodeVue :value="'http://127.0.0.1:8000/api/v1/ticket/'+ticket.codebar+'/check'" />
                </p>
                <div class="mt-2">
                    <h3 class="h4">{{ ticket.event }}</h3>
                    <span class="text-orange-500 mt-2">{{ ticket.artist.name }}</span>
                    <ul class="mt-3 flex flex-wrap items-center text-dark">
                        <li class="my-1 mr-8 inline-flex items-center">                        
                        <Icon name="tabler:category" class="text-orange-500 mr-2" size="20px"/>  
                        {{ ticket.zone }}
                        </li>                 
                        <li class="my-1 mr-8 inline-flex items-center">
                          <Icon name="material-symbols:event-seat-sharp" class="text-orange-500 mr-2" size="20px"/>
                            {{ ticket.seat }} Siège(s)
                        </li>
                        <li class="my-1 mr-8 inline-flex items-center">
                          <NuxtLink :href="'http://127.0.0.1:8000/api/v1/ticket/'+ticket.codebar+'/pdf'">
                          <Icon name="material-symbols:download-2" class="text-orange-500 mr-2" size="20px"/>
                            Télécharger
                          </NuxtLink>
                        </li>                  
                    </ul>                    
                </div>                
            </div>
             <ul class="mt-6 flex flex-wrap items-center text-dark">
               <li class="my-1 mr-8 inline-flex items-center">
                <Icon name="mdi:calendar-month" class="text-orange-500 mr-2" size="20px"/>
                 {{ ticket.date }}
               </li>
               <li class="my-1 mr-8 inline-flex items-center">
                <Icon name="material-symbols:nest-clock-farsight-analog-outline-rounded" class="text-orange-500 mr-2" size="20px"/>
                 {{ ticket.time }}
               </li>
               <li class="my-1 mr-4 inline-flex items-center">
                <Icon name="material-symbols:location-on-outline" class="text-orange-500 mr-2" size="20px"/>
                 {{ ticket.city }}
               </li>   
             </ul>
             <div class="mt-4 flex justify-center" :class="ticket.carpooling.exist? 'bg-orange-500': 'bg-red-500'">
                <NuxtLink :href="`/dashboard/carpooling/ticket/${ticket.id}`" class="p-2 text-white rounded float-right" v-if="ticket.carpooling.exist">COVOITURAGE : DE <span class="font-bold">{{ ticket.carpooling.city }}</span> à <span class="font-bold">{{ ticket.city }}</span></NuxtLink>
                <span class="p-2 text-white rounded float-right" v-else>NON COVOITURAGE</span>
             </div>
           </div>
         </div>
         <LayoutAppPaginator :links="list.tickets.links" :path="path" :currentPage="page"/>
       </div>
       <div class="row mt-4" v-else>
          <div class="mb-8 md:col-12">
            <div class="card"> 
              <div class="flex justify-center"><span class="text-xl text-gray-500">Aucun billet trouvé</span></div>
            </div>
          </div>
        </div>
     </div>
   </section>
   </template>
   <script setup>
    import {reactive, computed} from 'vue'
    import QrcodeVue from 'qrcode.vue'
    const route = useRoute()  
    useHead({
    title: `CULTURIDE - DASHBOARD TICKETS`
    })
    const token =  localStorage.getItem('token')

    const path = computed(() => `/dashboard/tickets?`)
    const {tickets} = await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/tickets${route.query.page ? '?page='+route.query.page:''}`,{
                headers: {'Authorization': `Bearer ${token}` },
                method: 'GET',        
          })

    const list = reactive({tickets})
    const page = ref(route.query.page ?? 1) 

    onBeforeRouteUpdate(async(route) => {
      const {tickets} = await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/tickets${route.query.page ? '?page='+route.query.page:''}`,{
                headers: {'Authorization': `Bearer ${token}` },
                method: 'GET',        
          }) 

        list.tickets = tickets
        page.value = route.query.page ?? 1        
      })
      
    definePageMeta({
      middleware: ["auth"],
    });

   </script>