<script lang="ts">
import { defineComponent, ref } from 'vue';
import HouseList from './components/HouseList.vue';
import Order from './types/Order';
import { useHouseAd } from './stores/HouseAd'


export default defineComponent({
  name: 'App',
  components:{ HouseList },
  setup() {
    const houses = ref<House[]>([])
    const houseStore = useHouseAd()
    

    houseStore.fetchHouses() //fetch data
  
    houses.value = houseStore.houses
    const order = ref<Order>('price')
    const clickHandler = (term: Order) => {
      order.value = term
    }
    return {  clickHandler, order, houses }
  },
})
</script>

<template>
	<div class="app">
    <header>
      <div class="order">
        <button @click="clickHandler('price')">Order by price</button>
		    <button @click="clickHandler('sqare')">Order by sqare</button>
		    <button @click="clickHandler('region')">Order by region</button>
      </div>
    </header>
				<HouseList :houses="houses" :order="order" />
	</div>
</template>

<style scoped>
 header {
    text-align: center;
  }
  header .order {
    margin-top: 20px;
  }
  button {
    margin: 0 10px;
    color: #1195c9;
    border: 3px solid #1195c9;
    background: #d5f0ff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
</style>
