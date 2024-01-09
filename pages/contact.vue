<template>
<!-- Common hero -->
<section class="page-hero pt-16 pb-6">
  <div class="container">
    <div class="text-center">
      <ul
        class="breadcrumb inline-flex h-8 items-center justify-center space-x-2 rounded-3xl bg-theme-light px-4 py-2"
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
          <span class="text-sm leading-none">/ CONTACT</span>
        </li>
      </ul>
    </div>
    <div class="page-hero-content mx-auto max-w-[768px] text-center">
      <h1 class="mb-5 mt-8">
        Contactez-nous        
      </h1>
    </div>
  </div>
</section>
<!-- end Common hero -->

<section class="section pt-0">
  <div class="container">
    <div class="row">
      <div class="mb-10 text-center md:col-6 md:order-2 md:mb-0 md:pt-9">
        <div class="contact-img relative inline-flex pl-5 pb-5">
          <img src="/contact-img.png" alt="" />
        </div>
      </div>
      <div class="md:col-6 md:order-1">
        <div class="p-8">
            <span v-if="error.show" class="text-red-600">{{ error.msg }}</span>            
          </div>
        <form class="lg:max-w-[484px]" @submit.prevent="contactForm">
          <div class="form-group mb-5">
            <label class="form-label" for="name">Nom et prénom</label>
            <input
              class="form-control"
              type="text"
              id="name"
              placeholder="Nom et prénom"
              v-model="form.name"
            />
          </div>
          <div class="form-group mb-5">
            <label class="form-label" for="eamil">Adresse e-mail</label>
            <input
              class="form-control"
              type="text"
              id="email"
              placeholder="Adresse e-mail"
              v-model="form.email"
            />
          </div>
          <div class="form-group mb-5">
            <label class="form-label" for="phone">Tél</label>
            <input
              class="form-control"
              type="text"
              id="phone"
              placeholder="phone"
              v-model="form.phone"
            />
          </div>          
          <div class="form-group mb-5">
            <label class="form-label" for="reason">Sujet</label>
            <select name="reason" id="reason" class="form-select" required  v-model="form.subject">
              <option value="0">Select sujet</option>
              <option value="sujet1">Sujet 1</option>
              <option value="sujet2">Sujet 2</option>
              <option value="sujet3">Sujet 3</option>
            </select>
          </div>
          <div class="form-group mb-5">
            <label class="form-label" for="message">Message</label>
            <textarea
              class="form-control h-[150px]"
              id="message"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <input
            class="btn btn-primary block w-full"
            type="submit"
            value="Message"
          />
        </form>
      </div>
    </div>
  </div>
</section>
  </template>
<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
useHead({
    title: 'CULTURIDE - CONTACT'
  })
const error = reactive({show:false, msg:''});
const form = reactive({
  name: null,
  email: null,
  phone: null,
  subject: 0,  
  message: null,
})
function contactForm() {  
    $fetch('http://127.0.0.1:8000/api/v1/contact', {
      method: 'POST',
      body: form
    }).then(res => {
    if(res.success)
    {
      Swal.fire({
        title: "Contact",
        text: res.msg,
        confirmButtonColor: "#F97316",       
      });
      
      form.name = null
      form.phone = null
      form.email = null
      form.subject = 0
      form.message = null

      error.show = false
      error.msg = ''
    }
  }).catch(er => {
    error.show = true
    error.msg = er.data.msg
  })
}
</script>