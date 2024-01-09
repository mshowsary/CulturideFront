<template>
  <head>  
    <link rel="shortcut icon" href="/favicon.png" />
    <!-- title -->
    <title>Culturide</title>

    <!-- noindex robots -->
    <meta name="robots" content="" />

    <!-- meta-description -->
    <meta name="description" content="meta description" />    
  </head>
  <body>
    <LayoutAppHeader />   
        <slot />    
    <LayoutAppFooter />
    </body>
</template>
<script setup>
import {ref, computed} from 'vue'

</script>
<style>
  @import url("~/assets/styles/main.css");
</style>