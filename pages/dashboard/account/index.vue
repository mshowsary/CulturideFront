<template>
    <LayoutAppAccountBar /> 
   <section class="section pt-0">
    <div class="container">    
      <div class="featured-posts row">
        <div class="mb-8 md:col-12">
          <div class="card">
            <div class="mb-8 md:col-6">                 
                <div class="form-group mb-8">
                    <label class="form-label font-bold" for="name">NOM : </label>  
                    <span>{{ form.name }}</span>
                </div>
                <div class="form-group mb-8">
                    <label class="form-label font-bold" for="email">Adresse email : </label>            
                    <span>{{ form.email }}</span>       
                </div>
                <div class="form-group mb-8">
                    <label class="form-label font-bold" for="phone">Tél : </label>            
                    <span>{{ form.phone }}</span>
                </div>
                               
            </div>
          </div>
        </div>
     </div>
     </div>
  </section>      
</template>
<script setup>
 import {reactive} from 'vue'
 useHead({
    title: `CULTURIDE - ACCOUNT`
    })
  const token =  localStorage.getItem('token')
  const {user} = await $fetch(`http://127.0.0.1:8000/api/v1/dashboard/account`,{
              headers: {'Authorization': `Bearer ${token}` },
              method: 'GET',        
        })

  const form = reactive({
    name:user.name,
    email:user.email,
    phone:user.phone
  }) 
  definePageMeta({
      middleware: ["auth"],
    });
</script>