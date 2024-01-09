<template>
<section class="section">
    <div class="container">    
      <div class="featured-posts row">
        <div class="mb-8 md:col-12">
          <div class="card">
            <img
              class="card-img"
              width="235"
              height="304"
              :src="event.cover"
              alt=""
            />
            <div class="card-content">
              <div class="card-tags">
                <span class="tag" :href="`/listing/type/${event.type.id}`">{{ event.type.name }}</span>
              </div>
              <h3 class="h4 card-title">
                <span>{{ event.name }} </span>
              </h3>
              <p v-html="event.description"></p>
              <div class="flex justify-between">
                <div class="card-footer mt-6 flex space-x-4">
                  <span class="inline-flex items-center text-sm text-[#666]">
                   <Icon name="mdi:calendar-month" class="text-orange-500" size="20px"/>                  
                    {{ event.date }}
                  </span>
                  <span class="inline-flex items-center text-sm text-[#666]">
                    <Icon name="material-symbols:nest-clock-farsight-analog-outline-rounded" class="text-orange-500" size="20px"/>
                    {{ event.time }}
                  </span>
                  <span class="inline-flex items-center text-sm text-[#666]">
                    <Icon name="material-symbols:location-on-outline" class="text-orange-500" size="20px"/>
                    {{ event.city }}
                  </span> 
                  <span class="inline-flex items-center text-sm text-[#666]">
                    <Icon name="maki:theatre-11" class="text-orange-500 mr-2" size="20px"/>
                    {{ event.artist }}
                  </span>                               
                </div>               
              </div>
            </div>
          </div>
        </div>  
      </div>  
    </div>
  </section>

  <section class="">
    <div class="container max-w-full">
      <div class="row">
        <div class="min-h-[800px] bg-white py-8 lg:col-6 lg:py-[114px]">         
          <div class="mx-auto w-full max-w-[480px]">
            <h2 class="mb-4 pb-6">Acheter Billet</h2> 
                <div class="p-8">
                    <span v-if="error.show" class="text-red-600">{{ error.msg }}</span>            
                </div>           
                <form action="#" @submit.prevent="buyTicket">
                  <template v-if="step==1">
                  <div class="form-group mb-8">
                      <label class="form-label" for="name">Classe de Billet</label>            
                      <select
                          v-model="form.zone"                        
                          class="form-control"
                          placeholder="Zone"
                          @change="changeZone"                    
                      >
                      <option :value="zone.id" v-for="zone in zones">{{ zone.name }}</option>
                      </select>
                  </div>
                  <div class="form-group mb-8" v-if="seatPrice != ''">
                      <div class="flex mt-4 bg-gray-500 p-4 rounded justify-center">
                          <label class="text-white" for="name">Prix par billet : </label>                
                          <span class="text-white ml-4"> {{ `${seatPrice} €` }}</span>
                      </div>
                  </div>                 
                  <div class="form-group mb-8">
                    <label class="form-label" for="name">Nbr Billet</label>                
                    <input
                        v-model="form.seats" 
                        type="number"
                        class="form-control"
                        placeholder="0"
                        min="1"
                        :max="zoneMaxSeat"                    
                    />
                  </div>            
                  <div class="form-group mb-8">
                      <label class="form-label" for="name">Ville</label>            
                      <select
                          v-model="form.city"
                          class="form-control"
                          placeholder="City"                    
                      >
                      <option :value="city.id" v-for="city in cities">{{ city.name }}</option>
                      </select>
                  </div> 
                  <button
                  class="btn btn-primary mt-10 block w-full"
                  type="button"
                  value="next"
                  @click="step=2"
                  >
                  Suivant
                  </button>
                </template>
                  <template v-else-if="step==2">
                  <div class="form-group mb-8">       
                    <div><span>Vous avez un moyen de transport pour cet événement ?</span></div>                    
                    <div class="flex mt-4">
                        <div><input type="radio" name="transport" @change="checkedTransport" value="car" :checked="transport=='car'"/><span class="ml-2 mr-8 text-gray-600">Oui</span></div>                    
                        <div><input type="radio" name="transport" @change="checkedTransport" value="no" :checked="transport=='no'"/><span class="ml-2 mr-8 text-gray-600">Non</span></div>
                    </div>  
                  </div>                
                  <div class="form-group mb-8" v-if="transport == 'car'">                    
                      <div class="form-group mb-8 bg-[#FF3A33] p-4 rounded-xl">                    
                        <div>
                            <span class="text-white">Êtes-vous intéressé à proposer un covoiturage aux personnes se rendant à cet événement ?</span><br>
                            <span class="text-black">(Les conducteurs qui proposent ce service se verront offrir un ticket de parking gratuit pour l'événement.)</span>
                        </div>
                        <div class="flex mt-4 text-white">
                            <div><input type="radio" name="carpooling" @change="form.carpooling.value=true; form.carpooling.type='owner'" :checked="form.carpooling.value===true"/><span class="ml-2 mr-8">Oui</span></div>                    
                            <div><input type="radio" name="carpooling" @change="form.carpooling.value=false"  :checked="form.carpooling.value===false"/><span class="ml-2 mr-8">Non</span></div>
                        </div>   
                        <div class="form-group m-8 " v-if="form.carpooling.value">
                            <label class="form-label" for="name">Sièges(s)</label>                
                            <input
                                v-model="form.carpooling.seats" 
                                type="number"                            
                                class="form-control"
                                placeholder="0"
                                min="1"
                                max="20"                    
                            />
                        </div>                                      
                      </div>    
                  </div>
                  <div class="form-group mb-8 bg-gray-200 p-4 rounded-xl" v-else-if="transport == 'no'">                    
                      <div>
                          <span>Êtes-vous intéressé à partager un covoiturage avec un personne à cet événement gratuitement ?</span>                        
                      </div>
                      <div class="flex mt-4">
                          <div><input type="radio" name="carpoolingPassanger" @change="form.carpooling.value=true; form.carpooling.type='passanger'" :checked="form.carpooling.value===true"/><span class="ml-2 mr-8 text-gray-600">Oui</span></div>                    
                          <div><input type="radio" name="carpoolingPassanger" @change="form.carpooling.value=false"  :checked="form.carpooling.value===false"/><span class="ml-2 mr-8 text-gray-600">Non</span></div>
                      </div>                                          
                  </div>   
                  <div class="form-group mb-8" v-if="seatPrice != '' && form.seats > 0">
                      <div class="flex mt-4 bg-gray-500 p-4 rounded">
                          <span class="form-label ml-8 text-white">{{ `${form.seats} billet(s)` }}</span>
                          <label class="form-label ml-8 text-white" for="name">Total :</label>                
                          <span class="form-label ml-8 text-white"> {{ `${(parseFloat(seatPrice) * parseInt(form.seats)).toFixed(2)} €` }}</span>
                      </div>
                  </div> 
                      <button
                          class="btn btn-primary mt-10 block w-full"
                          type="button"
                          value="next"
                          @click="step=1"
                          >
                          Précédent 
                      </button>       
                      <input
                        class="btn btn-primary mt-10 block w-full"
                        type="submit"
                        value="Acheter"
                        />
                </template>
                </form>
          </div>
        </div>  
        <div
          class="auth-banner flex flex-col items-center justify-center py-16 lg:col-6 bg-[#D9EAEF]"
        >
          <img
            class=" left-0"
            src="/carpool-ticket.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {reactive, ref} from 'vue'
import Swal from 'sweetalert2'

const route = useRoute()
const {event} = await $fetch(`http://127.0.0.1:8000/api/v1/event/${route.params.id}/details`)
const {zones, cities} = await $fetch(`http://127.0.0.1:8000/api/v1/event/${route.params.id}/zones`)
useHead({
    title: `CULTURIDE - EVENT ${event.name ?? ''} BUY TICKET`
    })
const form = reactive({
    zone:0,
    seats:1, 
    city:0,
    carpooling:{
        value:'',
        type:'',
        seats:1
    }
})
const zoneMaxSeat = ref(1)
const seatPrice = ref(0)
const step = ref(1)
const transport = ref('')

const error = reactive({show:false, msg:''});
const token = localStorage.getItem('token')

definePageMeta({
      middleware: ["auth"],
});

function changeZone(event){    
    const zone = zones.find(zone => zone.id == event.target.value)    
    zoneMaxSeat.value =(parseInt(zone.seat) - parseInt(zone.sold))
    seatPrice.value = zone.price.toFixed(2)
}

function checkedTransport(event){
    transport.value = event.target.value
    form.carpooling = {value:'', type:'', seats:1}
}
async function buyTicket(){
   await $fetch('http://127.0.0.1:8000/api/v1/buy/ticket', {
      headers: {'Authorization': `Bearer ${token}` },
      method: 'POST',
      body: form
    }).then(res => {
    if(res.success)
    {
      const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });

          Toast.fire({
            icon: "success",
            title: res.msg
          });      
          navigateTo("/dashboard/tickets")
    }
  }).catch(er => {
    error.show = true
    error.msg = er.data.msg
  })
}
</script>