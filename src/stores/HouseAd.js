import { defineStore } from "pinia"
import House from '../types/House'

export const useHouseAd = defineStore('houseStore', {
    state: () => ({
        houses: <House[]>[]
    }),
    getters: {

    },
    actions: {
        async fetchHouses(){
            const res = await fetch("http://localhost:3000/houses")
            const data = await res.json()
            this.houses = data 
        }
    }
})