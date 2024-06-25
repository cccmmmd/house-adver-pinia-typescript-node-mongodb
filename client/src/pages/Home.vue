<template>
    <div class="app">
    <header>
      <h1>House Advertising</h1>
      <div class="order">
        <button @click="clickHandler('price')">Order by price</button>
		    <button @click="clickHandler('sqare')">Order by sqare</button>
		    <button @click="clickHandler('region')">Order by region</button>
      </div>
    </header>
    <div class="createBtn">
        <router-link
        :to="{ name: 'create' }"
        >Create an Ad
        </router-link>       
    </div>
		<HouseList :houses="houses" :order="order" @fetchNew="fetchNew"/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HouseList from '../components/HouseList.vue';
import type Order from '../types/Order';
import type House from '../types/House';
import { useHouseAd } from '../stores/HouseStore'


export default defineComponent({
  name: 'App',
  components:{ HouseList },
  setup() {
    const houses = ref<House[]>([])
    const houseStore = useHouseAd()
    const order = ref<Order>('price')
    

    const fetchData = async () => {
      await houseStore.fetchHouses()
      houses.value = houseStore.orderBy('price')
    }
   
    fetchData() //fetch data
  
    const fetchNew = () =>{
      houses.value = houseStore.orderBy(order.value)
    }
    const clickHandler = (term: Order) => {
      order.value = term
      houses.value = houseStore.orderBy(term)
    }
    return {  clickHandler, order, houses, fetchNew }
  },
})
</script>

<style scoped>
   
    .createBtn {
        max-width: 960px; 
        margin: 20px auto;
        display: flex; 
        justify-content: end
    }
</style>