// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@nuxt/image',
    'nuxt-icon',
    '@pinia/nuxt',    
    '@pinia-plugin-persistedstate/nuxt',
   ],
   swiper: {   
     // Swiper options   
      //----------------------    
     // prefix: 'Swiper',    
     // styleLang: 'css',    
     // modules: ['navigation', 'pagination'],
      // all modules are imported by default 
    },
   ssr:false,
})
