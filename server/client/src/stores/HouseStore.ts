import { defineStore } from "pinia"
import type House from '../types/House'
import type Order from "../types/Order";

type hState = {
    houses: House[],
    house: House
}
const baseUrl = 'http://localhost:3001'
export const useHouseAd = defineStore('houseStore', {
    state: (): hState=> ({
        houses: [],
        house: {} as House
    }),
    actions: {
        async fetchHouses(){
            const res = await fetch(`${baseUrl}/api/houses`)
            const data:House[] = await res.json()
            this.houses = data 
        },
        async fetchOneHouses(id:string){
            const res = await fetch(`${baseUrl}/api/houses/${id}`)
            const data:House = await res.json()
            this.house = data
        },
        orderBy(order:Order):House[]{
            
            return [...this.houses].sort((a: House, b: House) => {
				return a[order] > b[order]? 1: -1
			})
        },
        async addHouse(house:House){
            this.houses.unshift(house)
            const res = await fetch(`${baseUrl}/api/houses`,{
                method: 'POST',
                body: JSON.stringify(house),
                headers: {'Content-Type': 'application/json'}
            })
            if(res.error){
                console.log(res.error)
            }
        },
        async saveHouse(house:House){
            const res = await fetch(`${baseUrl}/api/houses/${house.id}`,{
                method: 'PATCH',
                body: JSON.stringify(house),
                headers: {'Content-Type': 'application/json'}
            })
            if(res.error){
                console.log(res.error)
            }
        },
        async deleteHouse(id:string){
            this.houses = this.houses.filter( p => {
                return p.id !== id
            })
            const res = await fetch(`${baseUrl}/api/houses/${id}`,{
                method: 'DELETE',
            })
            if (res.error) {
                console.log(res.error)
            }

        }
    }
})