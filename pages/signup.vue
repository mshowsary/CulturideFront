<template>
  <section class="">
  <div class="container max-w-full">
    <div class="row">
      <div class="min-h-[980px] bg-white py-8 lg:col-6 lg:py-[114px]">
        <div class="mx-auto w-full max-w-[480px]">
          <h3 class="mb-4 pb-8">INSCRIPTION</h3>
          <div class="p-8">
            <span v-if="error.show" class="text-red-600">{{ error.msg }}</span>            
          </div>
          <form action="#" @submit.prevent="signup">
            <div class="form-group">              
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Nom"
                v-model="form.name"
              />
            </div>
            <div class="form-group mt-4">              
              <input
                type="text"
                id="phone"
                class="form-control"
                placeholder="Tél"
                v-model="form.phone"
              />
             exemple: 0[6-7]12345678
            </div>            
            <div class="form-group mt-4">              
              <input
                type="email"
                id="email"
                class="form-control"
                placeholder="Adresse e-mail"
                v-model="form.email"
              />
            </div>
            <div class="form-group mt-4">              
              <input
                type="password"
                id="mot de passe"
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
            <div class="form-group mt-4 flex justify-between">
              <NuxtLink href="/signin" class="text-blue-400">SE CONNECTER</NuxtLink>              
            </div>            
            <input
              class="btn btn-primary mt-10 block w-full"
              type="submit"
              value="s'inscrire"
            />
          </form>
        </div>
      </div>
      <div
        class="auth-banner flex flex-col items-center justify-center py-16 lg:col-6"
      >
        <img
          class="absolute top-0 left-0"
          src="/signup2.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</section>
  </template>
<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
useHead({
    title: 'CULTURIDE - SIGN UP'
    }) 
const error = reactive({show:false, msg:''});

const form =  reactive({
  name:null,
  phone:null,
  email:null,
  password:null,
  password_confirmation:null,
})

definePageMeta({
      middleware: ["auth"],
  });

function signup(){
  $fetch('http://127.0.0.1:8000/api/v1/signup', {
    method:'POST',
    body:form
  }).then(res => {
    if(res.success)
    {
      Swal.fire({
        title: "Inscription",
        text: res.msg, 
        confirmButtonColor: "#F97316",       
      });
      
      form.name = null
      form.phone = null
      form.email = null
      form.password = null
      form.password_confirmation = null

      error.show = false
      error.msg = ''
    }
  }).catch(er => {
    error.show = true
    error.msg = er.data.msg
  })
  
}
</script>