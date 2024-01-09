<template>
  <section class=" pt-16 pb-0">
    <div class="container">
      <div class="text-center">
        <ul
          class="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4"
        >
          <li class="leading-none text-dark">
            <NuxtLink class="inline-flex items-center text-primary" href="/">
              <svg
                class="mr-1.5"
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1769 15.0588H10.3533V9.41178H5.64744V15.0588H2.82391V6.58825H1.88274V16H14.118V6.58825H13.1769V15.0588ZM6.58862 15.0588V10.353H9.41215V15.0588H6.58862ZM15.8084 6.09225L15.2512 6.85178L8.00038 1.52472L0.749559 6.8499L0.192383 6.09131L8.00038 0.357666L15.8084 6.09225Z"
                  fill="black"
                />
              </svg>
              <span class="text-sm leading-none">ACCUEIL</span>
            </NuxtLink>
          </li>
          <li class="leading-none text-dark">
            <span class="text-sm leading-none">/ ÉVÉNEMENT</span>
          </li>
        </ul>
      </div>
      <div class="page-hero-content mx-auto max-w-[768px] text-center">
        <h1 class="mb-5 mt-8">
          {{ event.name }}     
        </h1>
      </div>
    </div>
  </section>

<section class="section pt-0">
  <div class="container">    
    <div class="featured-posts row">
      <div class="mb-8 md:col-12">
        <div class="card">
          <img
            class="card-img"
            width="235"
            height="304"
            :src="event.cover"
            alt=""
          />
          <div class="card-content w-full">
            <div class="card-tags">
              <NuxtLink class="tag" :href="`/listing/type/${event.type.slug}`">{{ event.type.name }}</NuxtLink>
            </div>
            <h3 class="h4 card-title">
              <span>{{ event.name }} </span>
            </h3>
            <p v-html="event.description"></p>
            <div class="flex justify-between flex-wrap">
              <div class="card-footer mt-6 flex flex-wrap space-x-4">
                <span class="inline-flex items-center text-sm text-[#666]">
                 <Icon name="mdi:calendar-month" class="text-orange-500" size="20px"/>                  
                  {{ event.date }}
                </span>
                <span class="inline-flex items-center text-sm text-[#666]">
                  <Icon name="material-symbols:nest-clock-farsight-analog-outline-rounded" class="text-orange-500" size="20px"/>
                  {{ event.time }}
                </span>
                <span class="inline-flex items-center text-sm text-[#666]">
                  <Icon name="material-symbols:location-on-outline" class="text-orange-500" size="20px"/>
                  {{ event.city }}
                </span>  
                <span class="inline-flex items-center text-sm text-[#666]">
                    <Icon name="maki:theatre-11" class="text-orange-500 mr-2" size="20px"/>
                    {{ event.artist }}
                  </span>                              
              </div>   
              <div class=" mt-6 flex space-x-4">
                <NuxtLink :href="`/event/${event.id}/buy/ticket`" class="p-4 bg-theme-light text-white" style="background: #ff3933;">Acheter un billet</NuxtLink>
              </div>                
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>

  </template>
<script setup>
  const route = useRoute()

  const {event} = await $fetch(`http://127.0.0.1:8000/api/v1/event/${route.params.id}/details`)
  useHead({
    title: `CULTURIDE - EVENT ${event.name ?? ''} DETAIL`
    })
</script>