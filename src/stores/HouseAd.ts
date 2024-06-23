import { defineStore } from "pinia"
import type House from '../types/House'

type hState = {
    houses: House[],
}
export const useHouseAd = defineStore('houseStore', {
    state: (): hState=> ({
        houses: []
    }),
    getters: {
        orderBy(order){
            return [...this.houses].sort((a: House, b: House) => {
				return a[order] > b[order]? 1: -1
			})
        }
    },
    actions: {
        async fetchHouses(){
            const res = await fetch("http://localhost:3000/houses")
            const data = await res.json()
            this.houses = data 
        }
    }
})