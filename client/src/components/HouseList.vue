<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import { useHouseAd } from '../stores/HouseStore'
import { useRouter } from "vue-router";
import type House from '../types/House'
import type Order from '../types/Order'

export default defineComponent({
  props: {
    houses: {
      type: Array as PropType<House[]>,
      required: true
    },
    order: {
      type: String as PropType<Order>,
      required: true
    }
  },
  emit: ['fetchNew'],
  setup(props, context) {
    const houseStore = useHouseAd()
	const router = useRouter();
    const deleteAd = (id: String) => {
      houseStore.deleteHouse(id)
      context.emit('fetchNew')
    }
	const editAd = (id: number) => {
		router.push({ name: 'edit', params:{id:id} })
    }
    const orderedhouse = computed(() => {
      return [...props.houses].sort((a: House, b: House) => {
        return a[props.order] > b[props.order] ? 1 : -1
      })
    })
    return { orderedhouse, deleteAd, editAd }
  }
})
</script>

<template>
  <div class="hous-list">
    <h3>
      Currently order by <span style="color: #8e1313">{{ order }}</span>
    </h3>
    <ul>
      <li v-for="ho in houses" :key="ho.id">
        <div class="delete" @click="deleteAd(ho.id)">
          <i class="material-icons"> delete </i>
        </div>
        <div class="edit" @click="editAd(ho.id)">
			<i class="material-icons"> edit </i>
		</div>
        <h2>
          {{ ho.name }} in {{ ho.region }} region. Square meters:
          {{ ho.sqare }}
        </h2>
        <div class="price">
          <p>Price: $ {{ ho.price }}</p>
        </div>
        <div class="description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nihil quasi, quidem placeat
            quis veniam, vel et consectetur tempore porro impedit non ea, quisquam voluptatem.
            Blanditiis tenetur quo cupiditate ut.
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hous-list {
  max-width: 960px;
  margin: 40px auto;
}
.hous-list ul {
  padding: 0;
}
.hous-list li {
  list-style-type: none;
  background: white;
  padding: 16px;
  margin: 16px 0;
  border-radius: 4px;
}
.hous-list h2 {
  margin: 0 0 10px;
  text-transform: capitalize;
}
.price {
  display: flex;
}
.price img {
  width: 30px;
}
.price p {
  color: #17bf66;
  font-weight: bold;
  margin: 10px 4px;
}
.delete {
  color: red;
  float: right;
  cursor: pointer;
}
.edit {
	color: green;
  	float: right;
  	cursor: pointer;
}
</style>
