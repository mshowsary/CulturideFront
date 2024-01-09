<template>
<header class="header">  
  <nav class="navbar container">
    <!-- logo -->
    <div class="order-0">
      <NuxtLink href="/">
        <img src="/logo.svg" height="30" width="147" alt="logo" />
      </NuxtLink>
    </div>
    <!-- navbar toggler -->
    <input id="nav-toggle" type="checkbox" class="hidden" />
    <label
      id="show-button"
      for="nav-toggle"
      class="order-1 flex cursor-pointer items-center lg:order-1 lg:hidden"
    >
      <svg class="h-6 fill-current" viewBox="0 0 20 20">
        <title>Menu Open</title>
        <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
      </svg>
    </label>
    <label
      id="hide-button"
      for="nav-toggle"
      class="order-2 hidden cursor-pointer items-center lg:order-1"
    >
      <svg class="h-6 fill-current" viewBox="0 0 20 20">
        <title>Menu Close</title>
        <polygon
          points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
          transform="rotate(45 10 10)"
        ></polygon>
      </svg>
    </label>
    <!-- /navbar toggler -->
    <ul
      id="nav-menu"
      class="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5"
    >
    <li class="nav-item nav-dropdown group relative" v-for="mn in menu">
      <span class="nav-link inline-flex items-center">
        {{ mn.name }}
      </span>
      <template v-if="mn.types.length > 0">
        <ul
          class="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100"
        >
          <li class="nav-dropdown-item" v-for="type in mn.types">            
            <NuxtLink :to="`/listing/type/${type.slug}`" class="nav-dropdown-link">{{ type.name }}</NuxtLink>
          </li>
        </ul>
      </template>
      </li>
      <li class="nav-item">
        <NuxtLink href="/artists" class="nav-link" :class="($route.path == '/artists')? 'active':''">Artistes</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink href="/contact" class="nav-link" :class="($route.path == '/contact')? 'active':''">Contact</NuxtLink>
      </li>
      <template v-if="token">
        <li class="nav-item mt-3.5 lg:hidden">
          <NuxtLink class="btn btn-white btn-sm border-border" :class="($route.name == 'dashboard-account' || $route.name == 'dashboard-update-profile' || $route.name == 'dashboard-update-password')? '!bg-orange-400 text-white':''" href="/dashboard/account"
            ><Icon name="material-symbols:manage-accounts-outline" class="mr-2" size="25px"/>{{ storeA.name }}</NuxtLink>            
        </li>
        <li class="nav-item mt-3.5 lg:hidden">
          <NuxtLink class="btn btn-white btn-sm border-border" :class="($route.name == 'dashboard-tickets' || $route.name == 'dashboard-carpooling-requests' || $route.name == 'dashboard-carpooling-ticket-id')? '!bg-orange-400 text-white':''" href="/dashboard/tickets"
            >Tableau de Bord</NuxtLink>            
        </li>
        <li class="nav-item mt-3.5 lg:hidden">       
            <button class="btn btn-white btn-sm" @click="logout">Se déconnecter</button>
        </li>
      </template>
      <template v-else>
        <li class="nav-item mt-3.5 lg:hidden">
          <NuxtLink class="btn btn-white btn-sm border-border" :class="($route.path == '/signin')? '!bg-orange-400 text-white':''" href="/signin"
            >se connecter</NuxtLink>
        </li>
        <li class="nav-item mt-3.5 lg:hidden">
          <NuxtLink class="btn btn-white btn-sm border-border" :class="($route.path == '/signup')? '!bg-orange-400 text-white':''" href="/signup"
            >s'inscrire</NuxtLink>
        </li>
      </template>
    </ul>    
    <div class="order-1 ml-auto hidden items-center md:order-2 md:ml-0 lg:flex">
      <template v-if="!token">
        <NuxtLink class="btn btn-white btn-sm" href="/signin">se connecter</NuxtLink>        
      </template>
    </div>    
  </nav>
</header>
  
    <div class="mt-8 p-8 bg-gray-100 ml-auto hidden justify-center md:order-2 md:ml-0 lg:flex" v-if="token">
        <NuxtLink class="btn btn-white btn-sm mr-2" :class="($route.name == 'dashboard-account' || $route.name == 'dashboard-account-update-profile' || $route.name == 'dashboard-account-update-password')? '!bg-orange-400 text-white':''" href="/dashboard/account"><Icon name="material-symbols:manage-accounts-outline" class="mr-2" size="25px"/>{{ storeA.name }}</NuxtLink>
        <NuxtLink class="btn btn-white btn-sm mr-2" :class="($route.name == 'dashboard-tickets' || $route.name == 'dashboard-carpooling-requests' || $route.name == 'dashboard-carpooling-ticket-id')? '!bg-orange-400 text-white':''" href="/dashboard/tickets">Tableau de Bord</NuxtLink>
        <template v-if="token">        
          <button class="btn btn-white btn-sm" @click="logout">Se déconnecter</button>
        </template>
    </div>
  
</template>
<script setup>
  import {ref, computed} from 'vue'
  const {menu, user} = await $fetch(`http://127.0.0.1:8000/api/v1/menu`)

  import {useStore, useGoTo , useAccount} from '~/stores/token'
  
  const store = useStore();
  const storeG = useGoTo();
  const storeA = useAccount()

  const token = computed(() => {
    return store.token? true:false
  })
  
 async function logout(){
    if(token != ''){
      await $fetch('http://127.0.0.1:8000/api/v1/logout', {
        headers: {'Authorization': `Bearer ${store.token}` },
        method:'POST'
      })

      store.token = ""
      storeG.url = "/dashboard/tickets"

      localStorage.removeItem('token')      
      await navigateTo('/')
    }
  }
</script>
