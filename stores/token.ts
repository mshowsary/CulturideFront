import { defineStore } from 'pinia'

 const useStore = defineStore('token', {
  state: () => ({
    token: localStorage.getItem('token'),
  }),
})

const useGoTo = defineStore('url', {
  state: () => ({
    url: '/dashboard/tickets',
  }),
  persist: true,
})

const useAccount = defineStore('name', {
  state: () => ({
    name: 'Mon Compte',
  }),
  persist: true,
})

export {useStore, useGoTo, useAccount}