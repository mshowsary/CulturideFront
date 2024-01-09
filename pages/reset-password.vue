<template>
    <section class="">
    <div class="container max-w-full">
      <div class="row">
        <div class="min-h-[980px] bg-white py-8 lg:col-6 lg:py-[114px]">
          <div class="mx-auto w-full max-w-[480px]">
            <h4 class="mb-4 pb-8">RÉINITIALISER MOT DE PASSE</h4>
            <div class="p-8">
              <span v-if="error.show" class="text-red-600">{{ error.msg }}</span>            
              <span v-else-if="success.show" class="text-green-600">{{ success.msg }}</span>            
            </div>
            <form action="#" @submit.prevent="send">                        
              <div class="form-group mt-4">              
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Adresse e-mail"
                  v-model="form.email"
                />
              </div>                                   
              <input
                class="btn btn-primary mt-10 block w-full"
                type="submit"
                value="ENVOYER"
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
  
  const error = reactive({show:false, msg:''});
  const success = reactive({show:false, msg:''});
  
  const form =  reactive({    
    email:null
  })
  useHead({
    title: 'CULTURIDE - RESET PASSWORD'
  })
  definePageMeta({
        middleware: ["auth"],
    });
  
  function send(){
    $fetch('http://127.0.0.1:8000/api/v1/reset-password', {
      method:'POST',
      body:form
    }).then(res => {
      if(res.success)
      {
        form.email = null

        success.show = true
        success.msg = res.msg

        error.show = false        
      }else{
        success.show = false

        error.show = true
        error.msg = res.msg
      }
    }).catch(er => {
      success.show = false

      error.show = true
      error.msg = er.data.msg
    })
    
  }
  </script>