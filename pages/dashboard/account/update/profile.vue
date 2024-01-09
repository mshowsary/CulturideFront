<template>
  <LayoutAppAccountBar />  
   <section class="section pt-0">
    <div class="container">    
      <div class="featured-posts row">
        <div class="mb-8 md:col-12">
          <div class="card">
            <div class="mb-8 md:col-6">
                <h3 class="mb-4 pb-8">MODIFIER PROFILE</h3> 
                <div class="p-8" v-if="error.show">
                    <span class="text-red-600">{{ error.msg }}</span>            
                </div>           
                <form action="#" @submit.prevent="updateProfile">
                <div class="form-group mb-8">
                    <label class="form-label" for="name">NOM</label>            
                    <input
                        type="text"
                        v-model="form.name"                        
                        class="form-control"
                        placeholder="Nom" />                  
                </div>
                <div class="form-group mb-8">
                    <label class="form-label" for="phone">TÉL</label>            
                    <input
                        type="text"
                        v-model="form.phone"                        
                        class="form-control"
                        placeholder="Tél" />                  
                </div>                
                <input
                class="btn btn-primary mt-10 block w-full"
                type="submit"
                value="MODIFIER PROFILE"
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
 import {useAccount} from '~/stores/token';
 import Swal from 'sweetalert2'
 useHead({
    title: `CULTURIDE - ACCOUNT - UPDATE PROFILE`
    })
 const storeA = useAccount()

 const error = reactive({show:false, msg:''});
  
  const token =  localStorage.getItem('token')
  const {user} = await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/account`,{
              headers: {'Authorization': `Bearer ${token}` },
              method: 'GET',        
        })

  const form = reactive({
    name:user.name,
    //email:user.email,
    phone:user.phone
  })

 async function updateProfile(){
    await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/account/update/profile`,{
              headers: {'Authorization': `Bearer ${token}` },
              method: 'POST',
              body:form      
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

      storeA.name = form.name

      error.show = false
      error.msg = ''
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