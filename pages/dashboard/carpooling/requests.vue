<template>
  <LayoutAppDashboardBar />
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
   <section class="section pt-0">    
      <div class="container">
        <div class="row mt-4">
          <div class="mb-8 md:col-12">
            <div class="card"> 
              <template  v-if="list.tickets.data.length > 0">
                <div class="p-2 bg-orange-500 text-center mb-4">
                  <span class="text-white">Les demandes de covoiturage</span>
                </div>                           
                <table class="w-[100%]">
                  <tr class="border-b border-slate-300">                    
                    <th class="text-black">De</th>
                    <th class="text-black">À</th>
                    <th class="text-black">Client</th>
                    <th class="text-black">Événement</th>
                    <th class="text-black">Sièges</th>
                    <th class="text-black">Status</th>                
                  </tr>
                  <tr v-for="ticket in list.tickets.data" class="border-b">                    
                    <td class="text-center"><span class="text-black">{{ticket.from}}</span></td>
                    <td class="text-center"><span class="text-black">{{ticket.to}}</span></td>
                    <td class="text-center"><span class="text-black">{{ticket.customer}}</span></td>
                    <td class="text-center p-2"><span class="text-black">{{ ticket.event }}</span></td>
                    <td class="text-center"><span class="text-black">{{ ticket.seat }}</span></td>
                    <td class="text-center">
                      <template v-if="!ticket.status">
                          <button class="p-2 text-white mr-2 btn btn-white btn-sm mr-2 !bg-orange-400 text-white" @click="acceptInvitation(ticket.carpooling_request_id)">Accepter l'invitation</button>
                          <button class="!bg-red-500 p-2 text-white btn btn-white btn-sm mr-2 !bg-orange-400 text-white" @click="rejectInvitation(ticket.carpooling_request_id)">Refuser l'invitation</button>
                      </template>
                      <template v-else>                        
                        <button class="!bg-green-500 p-2 text-white mr-2 btn btn-white btn-sm mr-2 text-white">Accepter</button>
                      </template>
                    </td>
                  </tr>
                </table> 
                <LayoutAppPaginator :links="list.tickets.links" :path="path" :currentPage="page"/>
            </template>
            <template v-else>
              <div class="flex justify-center"><span class="text-xl text-gray-500">Aucune demande trouvée</span></div>
            </template>              
            </div>
          </div>
        </div>
      </div>
    </section>
   </template>
   <script setup>
   import {ref, reactive, computed} from 'vue'
   import Swal from 'sweetalert2'
   useHead({
    title: `CULTURIDE - DASHBOARD - CARPOOLING REQUESTS`
    })
   const error = reactive({show: false, msg:''})

    const route = useRoute()
    const token = localStorage.getItem('token')
    
    const path = computed(() => `/dashboard/carpooling/requests?`)

    const {tickets} = await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/carpooling/requests${route.query.page ? '?page='+route.query.page:''}`,{
                  headers: {'Authorization': `Bearer ${token}` },
                  method: 'GET',        
                  })
    
    const list = reactive({tickets})
    const page = ref(route.query.page ?? 1)

    onBeforeRouteUpdate(async(route) => {
      const {tickets} = await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/carpooling/requests${route.query.page ? '?page='+route.query.page:''}`,{
                  headers: {'Authorization': `Bearer ${token}` },
                  method: 'GET',        
                  })
    
        list.tickets = tickets
        page.value = route.query.page ?? 1        
      })  

    definePageMeta({
      middleware: ["auth"],
    });

   function acceptInvitation(carId)
   {
      Swal.fire({
        title: "Vous voulez accepter cette invitation ?",
        showDenyButton: true,        
        confirmButtonText: "Accepter",
        denyButtonText: `Annuler`,
        confirmButtonColor: "#F97316",
      }).then((result) => {        
        if (result.isConfirmed) {
          $fetch(`http://127.0.0.1:8000/api/v1/dashboard/carpooling/${carId}/invitation`, {
                headers: {'Authorization': `Bearer ${token}` },
                method: 'POST',
                body: {'status': 'accepted'}
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
              error.msg = er.data.msg
            })
        } 

      });
   }
   function rejectInvitation(carId)
   {
    Swal.fire({
        title: "Vous voulez Refuser cette invitation?",
        showDenyButton: true,        
        confirmButtonText: "Refuser",
        denyButtonText: `Annuler`,
        confirmButtonColor: "#F97316",
      }).then((result) => {
        
        if (result.isConfirmed) {
          $fetch(`http://127.0.0.1:8000/api/v1/dashboard/carpooling/${carId}/invitation`, {
                headers: {'Authorization': `Bearer ${token}` },
                method: 'POST',
                body: {'status': 'rejected'}
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
              error.msg = er.data.msg
            })   
        } 

      });
   }
   </script>