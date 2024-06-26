<template>
  <div>
    <header>
      <h1>Create a House Ad</h1>
    </header>
    <a @click="goBack"> < 上一頁 </a>
    <form @submit.prevent="addAd">
      <div class="form-item">
        <label for="name">House Name</label><br />
        <input v-model="newHouse.name" name="name" type="text" id="name" />
      </div>
      <div class="form-item">
        <label for="sqare">Sqare size</label><br />
        <input v-model="newHouse.sqare" name="sqare" type="number" id="sqare" />
      </div>
      <div class="form-item">
        <label for="region">Region</label><br />
        <select v-model="newHouse.region" name="region" id="region">
          <option value="">--Please choose a region--</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>
      <div class="form-item">
        <label for="price">House Price</label><br />
        <input v-model="newHouse.price" name="price" type="number" />
      </div>
      <button
        :disabled="
          !(isValidHousetName && isValidSqare && isValidHousetRegion && isValidHousetPrice)
        "
        type="submit"
      >
        Add it
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import type House from '../types/House'
import { useHouseAd } from '../stores/HouseStore'

export default defineComponent({
  name: 'App',
  setup() {
    const newHouse = reactive<House>({
      name: '',
      sqare: null,
      id: '',
      region: '',
      price: null
    })
    const router = useRouter()
    const houseStore = useHouseAd()
    const isValidHousetName = computed(() => newHouse.name.length > 0)
    const isValidSqare = computed(() => !!newHouse.sqare)
    const isValidHousetRegion = computed(() => newHouse.region.length > 0)
    const isValidHousetPrice = computed(() => !!newHouse.price)

    const addAd = async () => {
      newHouse.id = `${Math.floor(Math.random() * 100)}`
      await houseStore.addHouse(newHouse)
      router.push({ name: 'home' })
    }
    const goBack = () => {
      router.go(-1)
    }
    return {
      newHouse,
      addAd,
      isValidHousetName,
      isValidSqare,
      isValidHousetRegion,
      isValidHousetPrice,
      goBack
    }
  }
})
</script>

<style scoped>
form {
  max-width: 660px;
  margin: 20px auto;
}
form .form-item {
  margin: 10px 0;
}
input,
select {
  width: 100%;
  height: 30px;
  border: 2px #1195c9 solid;
  border-radius: 3px;
}
label {
  color: #555;
  display: inline-block;
  margin-bottom: 10px;
}
</style>
