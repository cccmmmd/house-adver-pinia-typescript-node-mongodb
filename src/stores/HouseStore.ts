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
            const data:House[] = await res.json()
            this.houses = data 
        },
        orderBy(order:Order):House[]{
            return [...this.houses].sort((a: House, b: House) => {
				return a[order] > b[order]? 1: -1
			})
        },
        async addHouse(house:House){
            this.houses.unshift(house)
            const res = await fetch("http://localhost:3000/houses",{
                method: 'POST',
                body: JSON.stringify(house),
                headers: {'Content-Type': 'application/json'}
            })
            if(res.error){
                console.log(res.error)
            }
        },
        async deleteHouse(id:String){
            this.houses = this.houses.filter( p => {
                return p.id !== id
            })
            const res = await fetch("http://localhost:3000/houses/" + id,{
                method: 'DELETE',
            })
            if (res.error) {
                console.log(res.error)
            }

        }
    }
})