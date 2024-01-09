import {useGoTo} from '~/stores/token'
export default defineNuxtRouteMiddleware(async(to, from) => {
  
  const storeG = useGoTo() 
    if (to.name !== 'signin' && to.name != 'event-id-buy-ticket'){  
        storeG.url =  '/dashboard/tickets'
    }  
  })