<template>
  <LayoutAppDashboardBar />
  <section class="section pt-0 pb-0">
    <div class="container">    
      <div class="featured-posts row">
        <div class="mb-4 md:col-12">
          <div class="card">
            <img
              class="card-img"
              width="235"
              height="304"
              :src="eventD.value.cover"
              alt=""
            />
            <div class="card-content">
              <div class="card-tags">
                <span class="tag">{{ eventD.value.type }}</span>
              </div>
              <h3 class="h4 card-title">
                <span>{{ eventD.value.name }} </span>
              </h3>
              <p v-html="eventD.value.description"></p>
              <div class="flex justify-between">
                <div class="card-footer mt-6 flex space-x-4">
                  <span class="inline-flex items-center text-sm text-[#666]">
                  <Icon name="mdi:calendar-month" class="text-orange-500" size="20px"/>                  
                    {{ eventD.value.date }}
                  </span>
                  <span class="inline-flex items-center text-sm text-[#666]">
                    <Icon name="material-symbols:nest-clock-farsight-analog-outline-rounded" class="text-orange-500" size="20px"/>
                    {{ eventD.value.time }}
                  </span>
                  <span class="inline-flex items-center text-sm text-[#666]">
                    <Icon name="material-symbols:location-on-outline" class="text-orange-500" size="20px"/>
                    {{ eventD.value.city }}
                  </span>  
                  <span class="inline-flex items-center text-sm text-[#666]">
                    <Icon name="maki:theatre-11" class="text-orange-500 mr-2" size="20px"/>
                    {{ eventD.value.artist }}
                  </span>                               
                </div>              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section pt-0 pb-0" v-if="reservedD.value.length > 0">    
      <div class="container">
        <div class="row mt-4">
          <div class="mb-8 md:col-12">
            <div class="card"> 
              <div class="p-2 bg-orange-500 text-center mb-4">
                <span class="text-white">Les demandes de covoiturage envoyées</span>
              </div>                           
              <table class="w-[100%]">
                <tr class="border-b border-slate-300">                  
                  <th class="text-black">Client</th>
                  <th class="text-black">Sièges</th>
                  <th class="text-black">Status</th>                
                </tr>
                <tr v-for="ticket in reservedD.value" class="border-b">                  
                  <td class="text-center p-2"><span class="text-black">{{ticket.customer }} </span></td>
                  <td class="text-center"><span class="text-black">{{ ticket.seat }}</span></td>
                  <td class="text-center">
                    <button v-if="ticket.carpooling_status" class="!bg-green-500 p-2 text-white mr-2 btn btn-white btn-sm mr-2 text-white">Accepter</button>
                    <button v-else class="!bg-red-500 p-2 text-white mr-2 btn btn-white btn-sm mr-2 text-white">Non Accepté</button>
                  </td>
                </tr>
              </table>           
            </div>
          </div>
        </div>
      </div>
    </section>
  <section class="section pt-0 pb-0">
    <div class="container">    
      <div class="featured-posts row">
        <div class="mb-8 md:col-12 ">
          <div class="card !bg-orange-500 justify-center">
            <div class="flex">
              <div>                
                <span class="mr-4 font-semibold text-black"> COVOITURAGE DE : </span><span class="text-white font-bold uppercase"> {{ carpoolingD.value.city }}</span>
              </div>
              <div class="ml-4">
                <span class="mr-4 font-semibold text-black"> À : </span><span class="text-white font-bold uppercase"> {{ eventD.value.city }}</span>
              </div>
              <div class="ml-4">
                <span class="mr-4 font-semibold text-black">  SIÈGES : </span><span class="text-white font-bold uppercase"> {{ carpoolingD.value.seat }}</span>
              </div>
              <div class="ml-4">
                <span class="mr-4 font-semibold text-black"> RÉSERVÉ : </span><span class="text-white font-bold uppercase"> {{ carpoolingD.value.reserved_seat }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </section>
  <section class="section pt-0 pb-0" v-if="error.show">    
      <div class="container">
        <div class="row mt-8">
          <div class="mb-8 md:col-12">
            <div class="card">
              <div class="p-2 text-center">
                <span class="text-red-500">{{ error.msg }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  <template v-if="carpoolingD.value.reserved_seat < carpoolingD.value.seat">
    <section class="section pt-0" v-if="list.tickets.data.length > 0">    
      <div class="container">
        <div class="row mt-8">
          <div class="mb-8 md:col-12">
            <div class="card">
              <div class="p-2 bg-orange-500 text-center mb-4">
                <span class="text-white">Les demandes de covoiturage</span>
              </div>
              <table class="w-[100%]">
                <tr class="border-b border-slate-300">
                  <th class="p-2">#</th>
                  <th class="text-black">Client</th>
                  <th class="text-black">Sièges</th>                
                </tr>
                <tr v-for="ticket in list.tickets.data" class="border-b">
                  <td class="text-center"><input type="checkbox" :value="{'id':ticket.carpooling_id, 'seat':ticket.seat}" v-model="carpoolings"/></td>
                  <td class="text-center p-2"><span class="text-black">{{ticket.customer }} </span></td>
                  <td class="text-center"><span class="text-black">{{ ticket.seat }}</span></td>                
                </tr>
              </table>
              <LayoutAppPaginator :links="list.tickets.links" :path="path" :currentPage="page"/>
              <div class="mt-8">              
                <button @click="sendRequest" :disabled="carpoolings.length == 0 ? true:false" class="p-4 bg-theme-light text-white" style="background: #ff3933;">Envoyé demande</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>
<script setup>

  import {ref, reactive, computed} from 'vue'
  import Swal from 'sweetalert2'
  useHead({
    title: `CULTURIDE - DASHBOARD - CARPOOLING`
    })
  const route = useRoute()
  const token = localStorage.getItem('token')

  const error = reactive({show: false, msg:''})
  
  const path = computed(() => `/dashboard/carpooling/ticket/${route.params.id}?`)

  const {tickets, reserved, event, carpooling} = await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/carpooling/ticket/${route.params.id}${route.query.page ? '?page='+route.query.page:''}`,{
                    headers: {'Authorization': `Bearer ${token}` },
                    method: 'GET',        
                    }); 

  const list = reactive({tickets})
  const page = ref(route.query.page ?? 1)

  const reservedD = reactive({value:reserved})  
  const eventD = reactive({value:event})
  const carpoolingD = reactive({value:carpooling})
  const carpoolings = ref([])
  
  onBeforeRouteUpdate(async(route) => {
    const {tickets} = await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/carpooling/ticket/${route.params.id}${route.query.page ? '?page='+route.query.page:''}`,{
                    headers: {'Authorization': `Bearer ${token}` },
                    method: 'GET',        
                    }); 

        list.tickets = tickets
        page.value = route.query.page ?? 1        
      })


  async function sendRequest()
  { 
    let seats = parseInt(carpoolingD.value.reserved_seat)
    carpoolings.value.forEach( (carpooling) => {
      seats += parseInt(carpooling.seat)    
    })
     
     if(parseInt(seats) > parseInt(carpoolingD.value.seat))
     {
      Swal.fire({
        title: "Covoiturage",
        text: `Vous avez seulement ${carpoolingD.value.seat - carpoolingD.value.reserved_seat} Siège(s)`, 
        confirmButtonColor: "#F97316",         
      });
     }
     else{
      await $fetch('http://127.0.0.1:8000/api/v1/dashboard/carpooling/store', {
        headers: {'Authorization': `Bearer ${token}` },
        method:'POST',
        body:{parent:carpoolingD.value.parent_id, carpoolings:carpoolings.value}
        }).then(res => {
          if(res.success)
          { 
            window.location.reload();           
            
            error.show = false
            error.msg = ''
            
          }else{
            error.show = true
            error.msg = res.msg
          }
        }).catch(er => {
          error.show = true
          //error.msg = er.data.msg
        })
    } 
  }
</script>