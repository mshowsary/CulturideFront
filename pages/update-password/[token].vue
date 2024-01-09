<template>
    <section class="">
    <div class="container max-w-full">
      <div class="row">
        <div class="min-h-[980px] bg-white py-8 lg:col-6 lg:py-[114px]">          
          <div class="mx-auto w-full max-w-[480px]" v-if="updateForm.show">
            <template v-if="!success.show">
              <h4 class="mb-4 pb-8" v-if="!success.show">MODIFIER VOTRE MOT DE PASSE</h4>
              <div class="p-8">
                <span v-if="error.show" class="text-red-600">{{ error.msg }}</span>
              </div>
              <form action="#" @submit.prevent="updatePassword" >                        
                <div class="form-group mt-4">              
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
            </template>
            <template v-else>
              <div class="flex justify-center mt-8 mb-8">
                <h4 class="text-green-600">{{ success.msg }}</h4>
              </div> 
              <NuxtLink href="/signin" class="text-blue-400">Se connecter</NuxtLink>              
            </template>
          </div>
          <div class="mx-auto w-full max-w-[480px]" v-else>
            <div class="flex justify-center mt-8">
              <h3 class="text-red-500">{{ updateForm.msg }}</h3>
            </div>
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
  const route = useRoute()
  useHead({
    title: 'CULTURIDE - UPDATE PASSWORD'
  })
  const updateForm = reactive({show:false, msg:''})
  const error = reactive({show:false, msg:''});
  const success = reactive({show:false, msg:''});
  
  const form =  reactive({
    password:null,
    password_confirmation:null,  
  })

  await $fetch(`http://127.0.0.1:8000/api/v1/update-password/${route.params.token ?? ''}`).then(res => {
      if(res.success)
      {
        updateForm.show = true                
      }else{
        updateForm.show = false
        updateForm.msg = res.msg
      }
    }).catch(er => {
      error.show = true
      error.msg = er.data?.msg
    })

  definePageMeta({
        middleware: ["auth"],
    });
  
  async function updatePassword(){
    await $fetch(`http://127.0.0.1:8000/api/v1/store-password/${route.params.token ?? ''}`, {
      method:'POST',
      body:form
    }).then(res => {
      if(res.success)
      {
        success.show = true
        success.msg = res.msg

        error.show = false        
      }else{
        updateForm.show = false
        updateForm.msg = res.msg
      }
    }).catch(er => {
      error.show = true
      error.msg = er.data?.msg
    })
    
  }
  </script>