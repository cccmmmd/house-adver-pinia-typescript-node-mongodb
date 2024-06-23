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
		<HouseList :houses="houses" :order="order"/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HouseList from '../components/HouseList.vue';
import Order from '../types/Order';
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
  
    
    const clickHandler = (term: Order) => {
      order.value = term
      houses.value = houseStore.orderBy(term)
    }
    return {  clickHandler, order, houses }
  },
})
</script>

<style scoped>
    header {
    text-align: center;
    }
    header .order {
        margin-top: 20px;
    }
    header h1 {
        font-size: 50px;
        color: #8e1313;
    }
    .createBtn {
        max-width: 960px; 
        margin: 20px auto;
        display: flex; 
        justify-content: end
    }
    button, a {
        text-decoration: none;
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