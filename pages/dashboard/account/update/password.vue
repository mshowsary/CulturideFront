<template>
    <LayoutAppAccountBar />  
   <section class="section pt-0">
    <div class="container">    
      <div class="featured-posts row">
        <div class="mb-8 md:col-12">
          <div class="card">
            <div class="mb-8 md:col-6">
                <h3 class="mb-4 pb-8">MODIFIER MOT DE PASSE</h3> 
                <div class="p-8" v-if="error.show">
                    <span class="text-red-600">{{ error.msg }}</span>            
                </div>           
                <form action="#" @submit.prevent="updatePassword">
                  <div class="form-group mt-4"> 
                    <label class="form-label" for="phone">Ancien Mot de passe</label>  
                  <input
                      type="password"
                      id="old_password"
                      class="form-control"
                      placeholder="Ancien Mot de passe"
                      v-model="form.old_password"
                    />
                  </div>
                  <div class="form-group mt-4">
                    <label class="form-label" for="phone">Nouveau Mot de passe</label>               
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      placeholder="Mot de passe"
                      v-model="form.password"
                    />
                  </div>
                  <div class="form-group mt-4">              
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      placeholder="Confirmer Mot de passe"
                      v-model="form.password_confirmation"
                    />
                  </div>               
                  <input
                  class="btn btn-primary mt-10 block w-full"
                  type="submit"
                  value="MODIFIER MOT DE PASSE"
                  />
                </form>                
            </div>
          </div>
        </div>
     </div>
     </div>
  </section>    
</template>
<script setup>
 import {reactive} from 'vue' 
 import Swal from 'sweetalert2'
 import {useStore} from '~/stores/token'
 useHead({
    title: `CULTURIDE - ACCOUNT - UPDATE PASSWORD`
    })
  const store = useStore();

 const error = reactive({show:false, msg:''});
  
  const token =  localStorage.getItem('token')

  const form = reactive({
    old_password:null,
    password:null,
    password_confirmation:null,    
  })
async function updatePassword(){
  await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/account/update/password`,{
              headers: {'Authorization': `Bearer ${token}` },
              method: 'POST',
              body:form 
        }).then(async (res) => {
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
          
          //LOGOUT 
          await $fetch('http://127.0.0.1:8000/api/v1/logout', {
            headers: {'Authorization': `Bearer ${store.token}` },
            method:'POST'
          })

          store.token = ""      
          localStorage.removeItem('token')      

          await navigateTo('/signin')

      error.show = false
      error.msg = ''
    }
    else{
      error.show = true
      error.msg = res.msg ?? 'Erreur'
    }
  }).catch(er => {
    error.show = true       
    error.msg = er.data.msg
  })
}
definePageMeta({
      middleware: ["auth"],
    });
</script>