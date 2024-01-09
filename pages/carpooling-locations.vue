<template>
    <section class="">
    <div class="container max-w-full">
      <div class="row">
        <div class="min-h-[980px] bg-white py-8 lg:col-6 lg:py-[114px]">
         
          <div class="mx-auto w-full max-w-[580px]">
            <h3 class="mb-4 pb-6">Lieux des aires de covoiturage :</h3>
            <div class="">                
                <table class="border-separate border-spacing-2 border border-slate-400 w-[100%] p-2">
                  <thead>
                    <tr>
                      <th class="text-[#f97316] text-left">Ville</th>
                      <th class="text-[#f97316] text-left">Point du Rendez-vous</th>                      
                    </tr>
                  </thead>
                      <tbody>
                        <tr v-for="city in list" class="border border-t-[3px] border-black border-spacing-2">
                          <td><span class="font-bold text-black">{{ city.name }}</span></td>
                          <td><span>{{ city.carpooling_location }}</span></td>
                        </tr>
                    </tbody>
                </table>      
            </div>
            <div class="pt-8"> 
              <h5>Instructions :</h5>
              <ul class="pt-4 text-black list-disc">
                <li>Point de Rencontre pour le Covoiturage et Processus de Scan du QR Code</li>
                <li>Heure de Rendez-vous Fixée : Veuillez arriver au point de rencontre défini à l'heure de départ fixée. Cette ponctualité est essentielle pour le bon déroulement de notre covoiturage.</li>
                <li>Scanner de QR Code : À votre arrivée, recherchez le scanner de QR code que nous avons installé dans la zone de rencontre.</li>
                <li>Scan de votre Ticket : Avant de monter dans votre véhicule de covoiturage, scannez le QR code de votre ticket sur le scanner. Ceci permettra d'enregistrer votre présence et l'heure de votre arrivée.</li>
                <li>Confirmation de Présence : Une fois votre ticket scanné, vous recevrez une confirmation sur votre téléphone. Cela indique que vous êtes enregistré(e) et prêt(e) à partir.</li>
                <li>Départ : Après la confirmation de la présence de tous les participants, le covoiturage débutera à l'heure prévue.</li>
                <li>Remarque : Il est important de respecter l'heure de rendez-vous pour assurer une expérience de covoiturage agréable et efficace pour tous.</li>
              </ul>
            </div> 
          </div>
        </div>
  
        <div
          class="auth-banner flex flex-col items-center justify-center py-16 lg:col-6 bg-[#D9EAEF]"
        >
          <img
            class="top-0 left-0"
            src="/covoiturage.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
    </template>


<script setup>
  import {reactive} from 'vue'
  useHead({
    title: 'CULTURIDE - CARPOOLING'
  })
  const {cities} = await $fetch('http://127.0.0.1:8000/api/v1/carpooling/location'); 
  const list = reactive(cities) 
</script>
