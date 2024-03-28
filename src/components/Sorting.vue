<template>
  <div class="sorting">
    <select
        name="sort"
        :value="sortType"
        @change="onSelect($event.target.value)"
    >
      <option id="option" v-for="item in sortTypes" :value="item">
        {{item}}
      </option>
    </select>
  </div>
</template>

<script>
import {sortTypes} from "../helpers/sort.js";

export default {
  name: "Sorting",
  data(){
    return{
      sortTypes: sortTypes
    }
  },
  props:{
    sortType: String
  },
  emits:  ['update:sortType'],
  methods:{
    onSelect(value){
      this.$emit('update:sortType', value)
    }
  }
}
</script>

<style lang="scss" scoped>
select{
  width: 100%;
  font-size: 14px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 5px 5px 5px 10px ;
  border: white 2px solid;
  #option{
    background-color: #212121;
  }
}
@media (max-width: 520px) {
  .sorting{
    width: 100%;
  }
  select{
    font-size: 12px;
    padding: 0 0 0 5px;
    height: 30px;
  }
}

</style>
