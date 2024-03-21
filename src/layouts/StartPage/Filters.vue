<template>
  <wrapper>
    <v-text-field
        id="input"
        label="Введите название"
        :model-value="searchName"
        @update:modelValue="onInputName($event)"
        clearable
    />
    <v-select
        clearable
        :model-value="searchType"
        @update:modelValue="onInputType($event)"
        :items="namesSearchTypes()"
        density="compact"
        label="Сортировка"
    />
  </wrapper>
</template>

<script>
import Wrapper from "../../helpers/Wrapper.vue";
import {enumSortBy, enumTypeSort, searchTypes} from "../../helpers/sort.js";
export default {
  name: "Filters",
  data(){
    return{
      typeSort: enumTypeSort.nothing,
      sortBy: enumSortBy.nothing
    }
  },
  props:{
    searchType: String,
    searchName: String
  },
  emits:  ['update:searchType', 'update:searchName'],
  components: {Wrapper},
  mounted: function () {
    if (localStorage.getItem('searchType') !== null) {
      this.$emit('update:searchType', localStorage.getItem('searchType'))
    }
    if (localStorage.getItem('searchName') !== null) {
      this.$emit('update:searchName', localStorage.getItem('searchName'))
    }
  },
  methods: {
    onInputName(value){
      if(value === null){
        localStorage.removeItem('searchName')
        value = ""
      }
      else{
        localStorage.setItem('searchName', value)
      }
      this.$emit('update:searchName', value)
    },
    onInputType(value){
      if(value === null){
        localStorage.removeItem('searchType')
        value = ""
      }
      else{
        localStorage.setItem('searchType', value)
      }
      this.$emit('update:searchType', value)
    },
    namesSearchTypes() {
      return searchTypes.map((item) => item.name)
    }
  },
}
</script>

<style scoped>
.wrapper{
  margin-top: 80px;
  max-width: 600px;
  width: 100%;
}
</style>
