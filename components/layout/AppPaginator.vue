<template>  
    <div class="flex justify-center mt-12"  v-if="parseInt(props.links.length -2) > 1">
      <nav class="items-center">
        <ul class="flex items-center -space-x-px h-12 text-sm">
          <li>
            <template v-if="parseInt(props.currentPage)-1 > 0">
                <NuxtLink @click="$emit('change',(parseInt(props.currentPage)-1))" :href="`${props.path}page=${parseInt(props.currentPage)-1}`" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Previous</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </NuxtLink>
            </template>
            <template v-else>
              <span class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Previous</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </span>
            </template>
          </li>
          <li v-for="link in props.links" >
            <template v-if="link.label > 0">
              <NuxtLink :class="{'!bg-orange-500 !text-white': props.currentPage==link.label}" @click="$emit('change', link.label)" :href="props.path+'page='+link.label" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ link.label }}</NuxtLink>
            </template>
          </li>                
          <li>      
            <template v-if="parseInt(props.currentPage)+1 > parseInt(props.links.length)-2">
              <span class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">Next</span>
              <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
            </span>                    
            </template>
            <template v-else>
              <NuxtLink @click="$emit('change', (parseInt(props.currentPage)+1))" :href="`${props.path}page=${parseInt(props.currentPage)+1}`" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">Next</span>
              <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
            </NuxtLink>
            </template>
          </li>
        </ul>
      </nav>
    </div>
</template>
<script setup>
const route = useRoute()
const props = defineProps({
  links: { type: Array, required: true },
  path:String,
  currentPage:Number
})
console.log('Props : ', props.links)
defineEmits(['change'])
</script>