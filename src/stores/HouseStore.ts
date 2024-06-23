import { defineStore } from "pinia"
import type House from '../types/House'
import type Order from "../types/Order";

type hState = {
    houses: House[],
}
export const useHouseAd = defineStore('houseStore', {
    state: (): hState=> ({
        houses: []
    }),
    actions: {
        async fetchHouses(){
            const res = await fetch("http://localhost:3000/houses")
            const data = await res.json()
            this.houses = data 
        },
        orderBy(order:Order){
            return [...this.houses].sort((a: House, b: House) => {
				return a[order] > b[order]? 1: -1
			})
        }
    }
})