type response = {valid:boolean}

import {useStore, useGoTo} from '~/stores/token'

export default defineNuxtRouteMiddleware(async(to, from) => {
  const token =  localStorage.getItem('token')
  const store = useStore()
  const storeG = useGoTo()
  
  if(token != '' && token != null){
    const response = <response> await $fetch('http://127.0.0.1:8000/api/v1/auth/valid', {
            method: 'POST',
            body: {token}
          })
      
      if(response.valid){
        if (to.name == 'signin'|| to.name == 'signup' || to.name == 'reset-password' || to.name == 'update-password-token') {
          return navigateTo('/dashboard/tickets')
        }
      }else{        
        store.token=""
        localStorage.removeItem('token')

        if (to.name !== 'signin' && to.name !== 'signup' && to.name !== 'reset-password' && to.name !== 'update-password-token'){          
          return navigateTo('/signin')
        }        
      }

  }
  else{
    if (to.name !== 'signin' && to.name !== 'signup' && to.name !== 'reset-password' && to.name !== 'update-password-token'){
        if(to.name == 'event-id-buy-ticket'){
          storeG.url =  to.path
        }      
      return navigateTo('/signin')
    }  
  }
  })