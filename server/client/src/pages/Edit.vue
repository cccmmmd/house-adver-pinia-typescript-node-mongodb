<template>
  <div>
    <header>
      <h1>Create a House Ad</h1>
    </header>
    <a @click="goBack"> < 取消 </a>
    <form @submit.prevent="saveAd">
      <div class="form-item">
        <label for="name">House Name</label><br />
        <input v-if="newHouse.name" v-model="newHouse.name" name="name" type="text" id="name" />
      </div>
      <div class="form-item">
        <label for="sqare">Sqare size</label><br />
        <input
          v-if="newHouse.sqare"
          v-model="newHouse.sqare"
          name="sqare"
          type="number"
          id="sqare"
        />
      </div>
      <div class="form-item">
        <label for="region">Region</label><br />
        <select v-if="newHouse.region" v-model="newHouse.region" name="region" id="region">
          <option value="">--Please choose a region--</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>
      <div class="form-item">
        <label for="price">House Price</label><br />
        <input v-if="newHouse.price" v-model="newHouse.price" name="price" type="number" />
      </div>
      <button
        :disabled="
          !(isValidHousetName && isValidSqare && isValidHousetRegion && isValidHousetPrice)
        "
        type="submit"
      >
        Update
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type House from '../types/House'
import { useHouseAd } from '../stores/HouseStore'

export default defineComponent({
  name: 'App',
  setup() {
    const newHouse = reactive<House>({})
    const router = useRouter()
    const route = useRoute()
    const houseStore = useHouseAd()
    const pid: string = route.params.id

    const fetchData = async () => {
      await houseStore.fetchOneHouses(pid)
      for (const prop in houseStore.house) {
        newHouse[prop] = houseStore.house[prop]
      }
    }
    fetchData()

    const isValidHousetName = computed(() => newHouse.name.length > 0)
    const isValidSqare = computed(() => !!newHouse.sqare)
    const isValidHousetRegion = computed(() => newHouse.region.length > 0)
    const isValidHousetPrice = computed(() => !!newHouse.price)
    const saveAd = async () => {
      await houseStore.saveHouse(newHouse)
      router.push({ name: 'home' })
    }
    const goBack = () => {
      router.go(-1)
    }
    return {
      newHouse,
      saveAd,
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
